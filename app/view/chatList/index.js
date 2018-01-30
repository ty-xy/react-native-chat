import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Meteor from 'react-native-meteor';
import Card from './component/Card';
import MeteorContainer from '../../component/MeteorContainer';
import IdUtil from '../../util/id';
import UserUtil from '../../util/user';
import localStorage from '../../util/storage';
import _navigation from '../../util/navigation';

import PopulateUtil from '../../util/populate';

const navigationOptions = (navigation) => ({
    title: '消息',
    tabBarLabel: '消息',
    alignSelf: 'center',
    headerStyle: {
        height: 49,
        backgroundColor: '#fff',
    },
    headerLeft: null,
    headerTitleStyle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'normal'
    },
    tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont', color: tintColor, fontSize: 24}}>&#xe63d;</Text>),
});

const subCollection = () => () => {
    Meteor.subscribe('users');
    Meteor.subscribe('group');
    Meteor.subscribe('notice');
    Meteor.subscribe('message');
    const chatList = UserUtil.getChatList();
    chatList.forEach((item, index) => {
        Object.assign(item, Meteor.collection('group').findOne({ _id: item.groupId }));
        const allNum = Meteor.collection('messages').find({ 'to.userId': Meteor.userId(), groupId: item.groupId }) || [];
        const isReadNum = Meteor.collection('messages').find({ to: { userId: Meteor.userId(), isRead: true }, groupId: chatList[index].groupId }) || [];
        item.unreadMessage = (allNum.length - isReadNum.length) || 0;
        item.lastMessage = allNum[allNum.length - 1] || { content: '' };
    });
    const selfGroup = UserUtil.getGroups();
    const selfFriend = UserUtil.getFriends();
    const friendMessage = selfFriend.map(i => IdUtil.merge(Meteor.userId(), i));
    const chatMessageId = [...selfGroup, ...friendMessage];
    // 应该过滤出所有与我有关的消息
    const allMessage = Meteor.collection('messages').find({ to: { $in: chatMessageId } });
    // 判断有未知消息的聊天是否存在用户的聊天列表中,如果没有,则创建
    let allUnRead = [];
    allUnRead = allMessage.filter(i => i.readedMembers && !i.readedMembers.includes(Meteor.userId()));
    // 找出别人向你发起的未处理的好友认证
    const newFriendNotice = Meteor.collection('notices').find({ type: 0, to: Meteor.userId(), dealResult: 0, show: true });
    newFriendNotice.forEach((x) => {
        x.notice = Meteor.collection('notices').findOne({ _id: x._id });
        x.friendFrom = PopulateUtil.user(x.notice && x.notice.from) || {};
        x.sortTime = x.createdAt;
    });
    return {
        user: Meteor.user() && Meteor.user().profile || {},
        chatList,
        allUnRead,
        newFriendNotice,
    };
};

// @inject('home')
// @observer
class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor() {
        super();
        this.state = {
            loginInfo: {},
            showNewFriends: true,
        }
        this.lastBackPressed = 0;
    }
    componentWillMount() {
        const loginstatus = this._getLoginStorage();
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
        loginstatus.then((res) => {
            console.log('loginstatus', res)
            if (!res) {
                _navigation.reset(this.props.navigation, 'Login');
            } else {
                this.setState({ loginInfo: res });
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        const { video } = this.props.user;
        const { user } = nextProps;
        console.log('video', video, user)
        if (video && video.videoId && (user.video.videoId !== video.videoId)) {
            console.log('RTCto')
            this.props.navigation.navigate('RTC', { callId: user.video.groupId, call: false, accept: true });
        }
    }
      
    componentUnWillMount(){  
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);  
    }  
      
    _onBackAndroid = () => {  
        let now = new Date().getTime();  
        if(now - this.lastBackPressed < 2500) {  
            return false;  
        }  
        this.lastBackPressed = now;  
        ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);  
        return true;  
    }  
    
    // 恢复聊天记录
    _getLoginStorage = async () => {
        const res = await localStorage('login').get();
        return res;
    }
    _goChatWindow = (to, name, type, unreadMessage) => {
        const { navigation } = this.props;
        if (unreadMessage > 0) {
            Meteor.call('readMessage', to, type, (err) => {
                if (err) {
                    return;
                }
            });
        }
        navigation.navigate('ChatWindow', { to, name });
    }
    _goNewFriends = () => {
        const { navigation } = this.props;
        navigation.navigate('FriendApply');
    }
    // 删除列表显示新增好友
    _handleRemoveNewFriendNotice = () => {
        console.log('_handleRemoveNewFriendNotice')
        Meteor.call('hideFriendNotice');
    }
    // 删除聊天列表
    _handleDeleteNotices = (userId, type, unreadMessage, groupId) => {
        if (unreadMessage > 0) {
            Meteor.call('readMessage', groupId, type, (err) => {
                if (err) {
                    return;
                }
                Meteor.call('deleteChat', groupId, type);
            });
        } else {
            Meteor.call('deleteChat', groupId, type);
        }
    }
    // 置顶
    _handleTopUp = (stickTop, groupId) => {
        console.log('_handleTopUp', stickTop, groupId)
        let isTop = false;
        stickTop.forEach((item) => {
            if (item.userId === Meteor.userId()) {
                isTop = true;
            }
        });
        if (!isTop) {
            Meteor.call('setGroupStickTop', groupId, (err, res) => {
                if (!err) {
                    this._handleCloseList()
                }
            });
        } else {
            Meteor.call('cancelGroupStickTop', groupId, (err, res) => {
                if (!err) {
                    this._handleCloseList()
                }
            });
        }
    }
    // rowMap[rowKey].closeRow() 左滑打开
    _handleOpenList = (rowKey, rowMap) => {
        this.setState({ rowKey, rowMap });
    }
    _handleCloseList = () => {
        const { rowKey, rowMap } = this.state;
        rowMap[rowKey].closeRow()
    }
    _renderItem = ({item}) => {
        return (<Card
            {...item}
            key={item._id}
            _goNewFriends={this._goNewFriends}
            _goChatWindow={() => this._goChatWindow(item.groupId, item.name, item.type, item.unreadMessage)}
        />);
    }
    _compare = property => (a, b) => b[property] - a[property];

    // 左滑显示的东西
    _moveLeft = (item) => {
        // console.log('_moveLeft', item)
        if (item.type !== 'newFreidsAccept') {
            return (
                <View style={styles.rowBack}>
                    <TouchableOpacity
                        style={[styles.opacityView, { backgroundColor: '#EF5350' }]}
                        onPress={() => this._handleDeleteNotices(item.id, item.type, item.unreadMessage, item.groupId)}
                    >
                        <Text style={styles.delete}>&#xe626;</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.opacityView, { backgroundColor: '#29B6F6', marginRight: 10 }]}
                        onPress={() => this._handleTopUp(item.stickTop, item.groupId)}
                    >
                        <Text style={styles.topUp}>&#xe644;</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.opacityView, { backgroundColor: '#EF5350' }]}
                    onPress={this._handleRemoveNewFriendNotice}
                >
                    <Text style={styles.delete}>&#xe626;</Text> 
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        const { newFriendNotice = [], chatList = [] } = this.props;
        // 设置置顶的聊天列表
        const stickTopChat = chatList.filter(x => x.stickTop && x.stickTop.find(s => s.userId && s.userId === Meteor.userId()));
        stickTopChat.forEach((x) => {
            x.stickTime = x.stickTop[0].createdAt;
        });
        const newStickTopChat = stickTopChat.sort(this._compare('stickTime'));
        // 剩下没有设置置顶的聊天列表
        const defaultTopChat = chatList.filter(x => x.stickTop && !x.stickTop.find(s => s.userId && s.userId === Meteor.userId()));
        
        // 找出最新的好友通知
        if (newFriendNotice.length > 0) {
            newStickTopChat.push({ type: 'newFreidsAccept', num: newFriendNotice.length, _id: 'fhsdfh778qwjb', time: newFriendNotice[0].createdAt })
        }
        const newDefaultTopChat = defaultTopChat.sort(this._compare('sortTime'));
        const sortedChatList = [...newStickTopChat, ...newDefaultTopChat];
        console.log('sortedChatList', sortedChatList, newStickTopChat, newDefaultTopChat, chatList, newFriendNotice);
        const newArr = [];
        const spliceNum = [];
        // 去重
        sortedChatList.forEach((item, index) => {
            if (newArr.indexOf(item.groupId) < 0) {
                newArr.push(item.groupId);
            } else {
                spliceNum.push(index);
            }
        });
        let res = [];
        if (spliceNum.length) {
            spliceNum.forEach((i, index) => {
                if (index === 0) {
                    res = res.concat(chatList.splice(0, i));
                } else {
                    res = res.concat(chatList.splice(i, chatList[index + 1] - 1 || 0));
                }
            });
        } else {
            res = sortedChatList;
        }
        console.log('res', res, Meteor.user())
        return (
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <SwipeListView
                        useFlatList
                        style={{paddingTop: 15, paddingBottom: 30}}
                        data={res}
                        keyExtractor={item => item._id}
                        renderItem={this._renderItem}
                        previewOpenValue={0}
                        renderHiddenItem={(data, rowMap) => this._moveLeft(data.item)}
                        ListFooterComponent={() => <View style={{height: 15}} />}
                        rightOpenValue={-80}
                        onRowOpen={(rowKey, rowMap) => this._handleOpenList(rowKey, rowMap)}
                    />
                </View>
            </View>
        );
    }
}

export default MeteorContainer(navigationOptions, subCollection())(Home);


const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    position: 'relative',
    // paddingTop: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    justifyContent: 'space-around',
    width: '43%',
    height: '43%',
    backgroundColor: '#FEFFFF',
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#29A4DE',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  text: {
    textAlign: 'center',
  },
  rowBack: {
      flex: 1,
      flexDirection: 'row-reverse',
      paddingLeft: 16,
      alignItems: 'center',
      marginTop: 10,
  },
  delete: {
      fontFamily: 'iconfont',
      fontSize: 22,
      color: '#fff',
      backgroundColor: 'transparent',
  },
  topUp: {
    fontFamily: 'iconfont',
    color: '#fff',
    fontSize: 22,
    backgroundColor: 'transparent',
  },
  opacityView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});