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

import pinyin from 'pinyin';
import Concat from './Concat';
 
// @inject('link')
// @observer
export default class Love extends Component {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码',
    selectedChat:{},
    try:true,
    status:2
  }
  static navigationOptions = ({ navigation, screenProps })=>({
    title: '联系人',
    tabBarLabel: '联系人',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  
    tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe635;</Text>),
  })
  _onPressButtonAdd=(id,name)=>{
    const { navigation } = this.props;
    navigation.navigate('SendApply', { id, name});
    this.setState({
             status:1
      })
  }
  _onPressButton=(name,number,avatar,_id,status)=>{
    const { navigation } = this.props;
    if (status===1) {
        navigation.navigate('AddDetail', { name,number, avatar,_id });
    } else {
        navigation.navigate('FriendDetail', { name,number, avatar,_id, area: '北京市-海淀区', company:'万达集团股份有限公司' });
    }
}
  render() {
    const data = this.props.navigation.state.params;
    console.log(data)
    const datalist = data.map((v)=>{
        num=v.phoneNumbers[0].number,
        key=v.familyName+v.middleName+v.givenName,
        company=v.company;
         reg=new RegExp("null","g"); //创建正则RegExp对象      
         newstr=key.replace(reg,"");
         str=newstr[0]==="0"?newstr.substr(1):newstr
            return  {
                num:v.phoneNumbers[0].number,
                 key:str.length>0?str:company.length>0?company:num,
                 _id:v.recordID,
            }
    });
    console.log(datalist)
    pinyinData = datalist.map(han => ({
        user:{ _id: han._id,
              profile:{name:han.key,avatar:'http://cdn.zg18.com/avatar_363yzuQ252jgG4yCJ_1514857959722.png'},
              username:han.num.replace(/\s/g, "")
         },
        pinyin:pinyin(han.key[0], {
                style: pinyin.STYLE_FIRST_LETTER,
            },
            )[0][0], // 可以自行选择不同的生成拼音方案和风格。
      }));
      console.log(pinyinData)
     sortedData =pinyinData.sort((a, b) => {
        return a.pinyin.localeCompare(b.pinyin);
      }).map((d) =>d.pinyin)
      console.log(sortedData)
      pinyinData.forEach((d, i, data) => {
        d.showType = false;
        reg=/[^a-zA-Z]+/;
        result=d.pinyin.match(reg)
        if(result !==null){  
            d.pinyin="#"
            if (i) {
                const prev = data[i - 1];
                d.showType = d.pinyin !== prev.pinyin;
            } else {
                d.showType = true;
            }
        }else{
            if (i) {
                const prev = data[i - 1];
                d.showType = d.pinyin !== prev.pinyin;
            } else {
                d.showType = true;
            }
        }
       
      });
   return (
    <Concat 
    datalist={pinyinData} 
    add={true}
    status={this.state.status}
      _onPressAdd={this._onPressButtonAdd} 
      _onPressButton={this._onPressButton}
      />   
   )
  }
}

