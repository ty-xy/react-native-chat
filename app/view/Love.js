import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import hostUser from '../store/mobx';
import PassWord from './myown/PassWord';

// 引用store mobx文件
@inject('mobx')
@inject('list')  
@observer
export default class Love extends Component {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码'
  }
  static navigationOptions = {
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
    headerRight: (<Text style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe637;</Text>),
    tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe635;</Text>),
  }
  render() {
    console.log('props', this.props.list);
    return (
      <View style={styles.container}>
        <View style={styles.search}>
        <PassWord texts={this.state.text}/>
        <Text style={{fontFamily:'iconfont',fontSize:16,color:'#29B6F6',marginRight:-24}}>&#xe636;</Text>
        </View>
        <View style={styles.body}>
           <View style={style.left}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:15,
    backgroundColor: '#F5FCFF',
  },
  search:{
   backgroundColor:'#fff',
   height:32,
   width:'100%',
   borderRadius:100,
   paddingLeft:12,
   paddingRight:30,
   flexDirection: 'row',
   alignItems: 'center',
  }
});