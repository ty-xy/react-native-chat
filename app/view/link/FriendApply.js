
import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  // Button,
} from 'react-native';
import AddCard from './AddCard';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../../component/MeteorContainer';

import PopulateUtil from '../../util/populate';
import userInfo from '../../util/user';


const navigationOptions =(navigation)=>({
    headerTitle:'好友申请',
    title:'返回',
    alignSelf: 'center',
    headerTruncatedBackTitle:'返回',
    headerBackTitle:'返回',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  });
const subCollection = () => () => {
    Meteor.subscribe('notice');
    // 找出别人向你发起的好友认证
    let friendNotice = Meteor.collection('notices').find({ type: 0, to: Meteor.userId() },{ sort: { createdAt: -1 } });
    console.log(friendNotice);
    friendNotice.forEach((x,i,data) => {
        console.log(x.from)
        x.noticeFrom = PopulateUtil.user(x.from) || {};
        x.showType = false;
        if (i) {
            const prev = data[i - 1];
            x.showType = x.from !== prev.from;
        } else {
            x.showType = true;
        }
    });
   
    // 找出你向别人,然后别人拒绝你的好友认证
    const refuseFriend =  Meteor.collection('notices').find({ type: 0, from: Meteor.userId(), dealResult: 2 });
    refuseFriend.forEach((x) => {
       
        x.noticeTo = PopulateUtil.user(x.to) || {};
    });
    const newFriendNotice = [...friendNotice, ...refuseFriend];
    console.log(newFriendNotice, Meteor.userId());
    return {
        newFriendNotice,
    };
};
 class Person extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'手机号查找',
        }
    }

  _goChatWindow = (id,name,number,avatar,dealResult) => {
    const { navigation } = this.props;
    console.log(dealResult)
    if (dealResult===0) {
        navigation.navigate('AddDetail', { id, name, number, avatar });
    } else {
        navigation.navigate('FriendDetail', { id, name, number,avatar, area: '北京市-海淀区', company:'万达集团股份有限公司' });
    }
}
_onChangeStatus=(id)=>{
    this.setState({
        status:false,
        [`status${id}`]:false
    })
    console.log(1111)
}
_renderItem = ({item}) => {
    return (
        <AddCard
            {...item} 
            key={item._id} 
            _goChatWindow={this._goChatWindow}
            dealNotice={this.dealNotice}
        />)
}
dealNotice = async (noticeId, index, friendId, user) => {
    console.log(111);
    Meteor.call('dealFriendNotice', noticeId, index, (err) => {
        console.log(err);
    });
    if (index === 1) {
        Meteor.call('addFriend', friendId, (err) => {
            if (err) {
                console.error(err.reason);
            }
        });
        try {
            // 注意判断选中的人是否包含Meter.userId()
            const members = [Meteor.userId(), friendId];
            const name = Meteor.user() ? user : userInfo.getName();
            const result = await Meteor.callPromise('createGroup', {
                name,
                members,
                type: 'user',
            });
            console.log(result);
            // await this.props.changeTo(result, result, '', 'message');
            // await this.props.handleToggle(result);
            // await this.handleAddGroup();
            feedback.dealSuccess('成功创建群聊');
        } catch (err) {
            feedback.dealError(err);
        }
    }
}
deleteNotice = (noticeId,rowMap) => {  
    // rowMap[noticeId].closeRow()
    Meteor.call('deleteFriendNotice', noticeId, (err) => {
        console.log(err);
    });
    console.log(noticeId)
}
_keyExtractor = (item, index) => item._id;
render() {
    console.log(this.props.newFriendNotice)
    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
             {this.props.newFriendNotice.length!==0?
                <SwipeListView
                    useFlatList={true}
                    style={{paddingTop: 15, paddingBottom: 30}}
                    data={this.props.newFriendNotice}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={() => <View style={{height: 15}} />}
                    renderHiddenItem={ (data, rowMap) => {
                        // console.log(data)
                        return(
                            <View style={styles.rowBack}>
                            <TouchableOpacity
                              style={[styles.backRightBtn, styles.backRightBtnRight]}
                              onPress={_ => this.deleteNotice(data.item._id,rowMap)}>
                              <Text style={styles.backTextWhite}>&#xe626;</Text>
                            </TouchableOpacity>
                          </View>
                        )    
                    }}
                    disableRightSwipe={true}
                    rightOpenValue={-47}
                    onRowOpen={(rowKey, rowMap) => {
                       console.log(rowKey,rowMap[rowKey]) 
                        setTimeout(() => {
                            rowMap[rowKey]?rowMap[rowKey].closeRow():null
                        }, 2000)
                    }}
                />:null}
            </View>
        </View>
    );
}
}
export default MeteorContainer(navigationOptions, subCollection())(Person);

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
      backTextWhite: {
        color: '#FFF',
        fontFamily:'iconfont',
        fontSize:24,
        borderRadius:16,
        backgroundColor: 'transparent',
      },
 
      rowBack: {
        alignItems: 'flex-start',
        // backgroundColor: '#DDD',
        // flex: 1,
        height:71,
        flexDirection: 'column',
        justifyContent: 'center',
        // paddingLeft: 15,
        marginRight:15,
        position:'relative',
      },
      backRightBtn: {
        alignItems: 'center',
        // bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        // top: 0,
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor: '#EF5350',
        right: 0,
      },
      backRightBtnRight: {
    
      },
 
});