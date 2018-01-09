import { TabNavigator, StackNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';

import Chat from './view/Chat';
import ChatWindow from './view/ChatWindow';
import LovePage from './view/Love';
import BookPage from './view/Book';
import DetailPage from './view/Detail';
import Panels from './view/Panel';


// APP tab 配置: https://reactnavigation.org/docs/navigators/tab
const TabNavigation = TabNavigator({
  Home: {
    screen: Chat,
  },
  Love: {
    screen: LovePage,
  },
  Book: {
    screen: BookPage,
  },
}, {
  initialRouteName: 'Home',
  order: ['Home', 'Love', 'Book'],
  tabBarOptions: {
    inactiveTintColor: '#999A9B',
    activeTintColor: '#218DF4',
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {
      height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
    },
    labelStyle: {
      marginTop: 0,
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
  lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，
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
});

export default Navigation;
