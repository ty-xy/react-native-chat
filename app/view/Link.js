import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import hostUser from '../store/mobx';
import PassWord from './myown/PassWord';
import pinyin from 'pinyin';
import Concat from './link/Concat';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../component/MeteorContainer';

import UserUtil from '../util/user';
const navigationOptions = (navigation) => ({
    title: '联系人',
    tabBarLabel: '联系人',
    headerStyle: {
        height: 49,
        backgroundColor: '#fff',
    },
    headerTitleStyle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'normal'
    },
     headerLeft:(<Text style={{color:'transparent'}}>111</Text>),
     tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe635;</Text>),
     headerRight:   (
        <TouchableOpacity onPress={() =>navigation.navigate('AddFriend')}>
            <Text  style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe637;</Text>
        </TouchableOpacity>
    ),
});

const subCollection = () => () => {
    Meteor.subscribe('users');
    const friendIds = UserUtil.getFriends();
    // console.log(friendIds);
    const users = [];
    friendIds.forEach((_id) => {
        const user_ = Meteor.collection('users').findOne({ _id });
        if (user_) {
            users.push(user_);
        }
    });
    // console.log(users)
    const pinyinData = users.map(user => ({
        user,
        pinyin: pinyin(user.profile && user.profile.name[0], {
            style: pinyin.STYLE_FIRST_LETTER,
        },
        )[0][0], // 可以自行选择不同的生成拼音方案和风格。
    }));
    pinyinData.sort((a, b) => a.pinyin.localeCompare(b.pinyin)).map(d => d.han);
    pinyinData.forEach((d, i, data) => {
        d.showType = false;
        if (i) {
            const prev = data[i - 1];
            d.showType = d.pinyin !== prev.pinyin;
        } else {
            d.showType = true;
        }
    });
    return {
         pinyinData,
    };
};
class Link extends PureComponent {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码',
    selectedChat:{},
    try:true,
  }

 _onPressButton=(name, number,avatar,id)=>{
    const { navigation } = this.props;
    if (navigation.state.params && navigation.state.params.cardCase) {
        navigation.navigate('ChatWindow', { id: '323', name, number, cardCase: true, avatar: '../../image/beautiful.png' });
    } else {
        navigation.navigate('FriendDetail', { id, name, number,avatar, area: '北京市-海淀区', company:'万达集团股份有限公司' });
    }
}
_linkConcat = (data) => {
    if(data.length>0){
        return   (<Concat datalist={data}  _onPressButton={this._onPressButton}/>)
    }else {
        return  (<View style={styles.emptymessage}>
            <Image source={require('../image/noFriend.png')} style={styles.imgicon}/>
            <Text style={styles.emptyText}>暂无好友，赶快去添加吧！</Text>
        </View>)
    }
}
  render() {
    const data =this.props.pinyinData
      return this._linkConcat(data)
  }
}

export default MeteorContainer(navigationOptions, subCollection())(Link);
const styles = StyleSheet.create({
    emptymessage:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#f6f6f6",
    },
    emptyText:{
      marginTop:24,
      fontSize: 16,
      color: '#666666',
      letterSpacing: 0.19,
    },
    imgicon:{
        width:244,
        height:196,
    }
});