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

const tabBar = (tintColor) => (<Text style={{fontFamily:'iconfont', color: tintColor, fontSize: 24}}>&#xe635;</Text>);
const subCollection = () => () => {
    Meteor.subscribe('users');
    const friendIds = UserUtil.getFriends();
    console.log(friendIds);
    const users = friendIds.map(_id => Meteor.collection('users').findOne({ _id }));
    console.log(users)
    const pinyinData = users.map(user => ({
        user,
        pinyin: pinyin(user.profile && user.profile.name, {
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

 _onPressButton=(name, number)=>{
    const { navigation } = this.props;
    if (navigation.state.params && navigation.state.params.cardCase) {
        navigation.navigate('ChatWindow', { id: '323', name, number, cardCase: true, avatar: '../../image/beautiful.png' });
    } else {
        navigation.navigate('FriendDetail', { id: '323', name, number, area: '北京市-海淀区', company:'万达集团股份有限公司' });
    }
}
  render() {
    const data =this.props.pinyinData
    console.log(this.props.pinyinData)
    return (
        <Concat datalist={data}  _onPressButton={this._onPressButton}/>
    );
  }
}

export default MeteorContainer('联系人', '联系人', tabBar, subCollection())(Link);