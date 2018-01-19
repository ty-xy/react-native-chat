import React, { Component } from 'react';
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

const tabBar = (tintColor) => (<Text style={{fontFamily:'iconfont', color: tintColor, fontSize: 24}}>&#xe63d;</Text>);
const subCollection = () => () => {
    Meteor.subscribe('group');
    return {
        groups: Meteor.collection('group').find(),
    };
};

 
@inject('link')
@observer
 class Link extends Component {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码',
    selectedChat:{},
    try:true,
  }
//   static navigationOptions = ({ navigation, screenProps })=>({
//     title: '联系人',
//     tabBarLabel: '联系人',
//     alignSelf: 'center',
//     headerStyle: {
//       height: 49,
//       backgroundColor: '#fff',
//     },
//     headerTitleStyle: {
//       alignSelf: 'center',
//     },
//     headerRight: (
//         <TouchableOpacity onPress={() =>navigation.navigate('AddFriend')}>
//             <Text  style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe637;</Text>
//         </TouchableOpacity>
//     ),
//     tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe635;</Text>),
//   })
 _onPressButton=(name, number)=>{
    const { navigation } = this.props;
    if (navigation.state.params && navigation.state.params.cardCase) {
        navigation.navigate('ChatWindow', { id: '323', name, number, cardCase: true, avatar: '../../image/beautiful.png' });
    } else {
        navigation.navigate('FriendDetail', { id: '323', name, number, area: '北京市-海淀区', company:'万达集团股份有限公司' });
    }
}
  render() {
    const data =this.props.link.pinyinData
    return (
        <Concat datalist={data}  _onPressButton={this._onPressButton}/>
    );
  }
}

export default MeteorContainer('联系人', '联系人', tabBar, subCollection())(Link);