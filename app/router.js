import { TabNavigator, StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
    Text,
  } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/AnimatedValueSubscription';
// import Icon from 'react-native-vector-icons/Ionicons';

import Chat from './view/chatList';
import ChatWindow from './view/chatWindow';
import LovePage from './view/Link';
import Personal from './view/Personal';
import DetailPage from './view/Detail';
import Panels from './view/Panel';
import Person from './view/myown/Person';
import System from './view/myown/System';
import Account from './view/myown/Account';
import FixNumber from './view/myown/FixNumber';
import FixPassWord from './view/myown/FixPassWord';
import Aboutus from  './view/myown/Aboutus';
import SelectImage from './view/common/ImageSelect';
import PreviewImg from './view/common/PreviewImg';
import Camera from './view/common/Camera';
import Geolocation from './view/common/Geolocation';
import Login from './view/Login';
import RTC from './view/common/rtc';
import Register from './view/Register';
import ForgetPassword from './view/ForgetPassword';


import AddFriend from './view/link/AddFriend';
import SendApply from './view/link/SendApply';
import AddPhone from './view/link/AddPhone'
import FriendDetail from './view/link/FriendDetail';
import FriendApply from './view/link/FriendApply';
import AddDetail from './view/link/AddDetail';
import wChat from './view/link/wChat';
import More from  './view/link/More';


// APP tab 配置: https://reactnavigation.org/docs/navigators/tab
const TabNavigation = TabNavigator({
  Home: {
    screen: Chat,
  },
  Link: {  
    screen: LovePage,
  },
  Personal: {
    screen:Personal
  },
}, {
  initialRouteName: 'Home',
  lazy: true, // 是否懒加载  
  order: ['Home', 'Link', 'Personal'],
  tabBarOptions: {
    inactiveTintColor: '#999A9B',
    activeTintColor: '#218DF4',
    fontSize: 10,
    color: '#29B6F6',
    letterSpacing: 0,
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {
      height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
    },
    labelStyle: {
      marginTop: 15,
      fontSize: 10,
    },
    iconStyle: {
      marginBottom: 0,
    },
    tabStyle: {
      padding: 0,
    },
    style: {
      height: 49,
      backgroundColor: '#fff',
    },
  },
  animationEnabled: false,
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false,
  backBehavior: 'none',
});

// 路由配置
const Navigation = StackNavigator({
    HomeScreen: {
        screen: TabNavigation,
    },
    Detail: {
        screen: Panels,
    },
    ChatWindow: {
        screen: ChatWindow,
    },
    // 相册列表
    SelectImage: {
        screen: SelectImage,
    },
    // 图片预览
    PreviewImg: {
        screen: PreviewImg,
    },
    Person: {
        screen: Person,
    },
    System:{
        screen: System,
    },
    Account:{
        screen: Account,
    },
    FixNumber:{
        screen:FixNumber,
    },
    FixPassWord:{
        screen:FixPassWord,
    },
    Aboutus: {
        screen:Aboutus,
    },
    AddFriend:{
        screen:AddFriend,   
    },
    FriendDetail:{
        screen:FriendDetail, 
    },
    FriendApply:{
        screen:FriendApply, 
    },
    Camera: {
        screen: Camera,
    },
    Geolocation: {
        screen: Geolocation,
    },
    wChat:{
        screen: wChat,
    },
    AddPhone:{
        screen: AddPhone,
    },
    SendApply:{
        screen: SendApply,
    },
    AddDetail:{  
        screen: AddDetail,
    },
    More:{
        screen:More,
    },
    Login:{
        screen: Login,
    },
    RTC: {
        screen: RTC,
    },
    Register:{
        screen:Register,
    },
    ForgetPassword:{
        screen:ForgetPassword
    }
});

export default Navigation;
