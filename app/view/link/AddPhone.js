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
   _renderConcat=()=>{
    
   
   }
  render() {
    const data = this.props.navigation.state.params;
    const datalist = data.map((v)=>{
        num=v.phoneNumbers[0].number,
        key=v.familyName+v.middleName+v.givenName
         reg=new RegExp("null","g"); //创建正则RegExp对象      
         newstr=key.replace(reg,"");
         str=newstr[0]==="0"?newstr.substr(1):newstr
            return  {
                num:v.phoneNumbers[0].number,
                 key:str
            }
    });
    pinyinData = datalist.map(han => ({
        key: han.key,
        url:'../image/oval.png',
        num:han.num,
        pinyin:  pinyin(han.key, {
                style: pinyin.STYLE_FIRST_LETTER,
            },
            )[0][0], // 可以自行选择不同的生成拼音方案和风格。
      }));
     sortedData =pinyinData.sort((a, b) => {
        return a.pinyin.localeCompare(b.pinyin);
      }).map((d) =>d.pinyin)
      console.log(pinyinData,sortedData)
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
    <Concat datalist={pinyinData} />   
   )
  }
}

