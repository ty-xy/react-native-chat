import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
//   TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import { observer } from 'mobx-react/native';
import hostUser from '../store/mobx';
import Invite from './myown/Invite';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../component/MeteorContainer';

import UserUtil from '../util/user';
const navigationOptions =(navigation)=>({
    title: '我的',
    tabBarLabel: '我的',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe63a;</Text>),
  });
const subCollection = () => () => {
    Meteor.subscribe('users');
    const name = UserUtil.getName();
    const avatar = UserUtil.getAvatar();
    const users = Meteor.user();
    // const username=users.username||'';
    // const users = friendIds.map(_id => Meteor.collection('users').findOne({ _id }));
    // console.log(users)
    return {
        users,
        name,
        avatar
    }
};
class Book extends Component {  
  constructor(props) {
    super(props)
    this.state={
      animationType: 'none',
      isModalVisible: false,
      transparent: false,
      modalVisible: false
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onPressButton(id,name,username){
   this.props.navigation.navigate(id,{name:name,username:username})
  }
  render() {
    const { navigation,name,avatar,users } = this.props;
    const username =users? users.username: '';
    // console.log(this.props,username)
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
           <ImageBackground 
           source={require('../image/touxiang.png')} 
           style={{width:'100%', height: 160}}
           >
            <View style={styles.first}>
            <Image source={avatar?{uri:avatar}:require('../image/toufemail.png')} style={styles.img} />
            <Text style={styles.firstname} >{name}</Text>
            <Text style={styles.numbert}>账号:{username}</Text>
            </View>
           </ImageBackground>
           <View  style={styles.mybody}>
           <TouchableOpacity onPress={ () => this._onPressButton('Person',name,username) }>
             <View style={styles.mytext} >
               <Image source={require('../image/curriculum.png')} style={styles.imgicon} />
               <Text >个人资料</Text>
             </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this._onPressButton('System')}>
             <View style={styles.mytext}>
               <Image source={require('../image/repair.png')} style={styles.imgicon} />
               <Text>系统设置</Text>
             </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressButton('Account',name,username)}>
             <View style={[styles.mytext,{marginRight:0}] }>
               <Image source={require('../image/human-resources.png')} style={styles.imgicon} />
               <Text>账号管理</Text>
             </View>
             </TouchableOpacity>
             </View>
             <View  style={styles.mybody}>
             <TouchableOpacity 
            onPress={() => {
              this.setModalVisible(true)}
            }>
             <View style={styles.mytext}>
               <Image source={require('../image/networking.png')} style={styles.imgicon} />
               <Text>邀请朋友</Text>
             </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this._onPressButton('Aboutus')}>
             <View style={styles.mytext}>
               <Image source={require('../image/businessmen.png')} style={styles.imgicon} />
               <Text>关于我们</Text>
             </View>
             </TouchableOpacity>
             <View style={[styles.mytext,{backgroundColor:'transparent'}]}/>
           </View>
        </View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',position:'relative'}}>
          <Invite hide={this.setModalVisible.bind(this)}/>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
export default MeteorContainer(navigationOptions, subCollection())(Book);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  wrap: {
    justifyContent: 'flex-start',
    // flexDirection: 'row',
    alignItems: 'flex-start',
    padding:15
  },
  first:{
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingTop:8,
    paddingBottom:6,
  },
  img:{
    width: 80, 
    height: 80,
    borderRadius:40,
  },
  imgicon:{
    width:40,
    height:40,
    marginBottom:10,
  },
  firstname:{
    fontSize: 14,
    color: '#4D4D4D',
    letterSpacing: -0.34,
    // marginTop:15,
  },
  numbert :{
    fontSize: 12,
    color: '#4D4D4D',
    letterSpacing: -0.34,
    // marginTop:5,
  },
  mybody:{
  // paddingTop:10,
  flexDirection: 'row',
  flexWrap:'wrap',
  justifyContent:'space-between',
  width:'100%',
  },
  mytext:{
    height:108,
    width:108,
    backgroundColor: '#FFFFFF',
    shadowOpacity:0.02,
    borderRadius: 4,
    shadowColor:'rgba(41,182,246,0.02)',
    marginTop:10,
    // marginRight:10,
    alignItems:'center',
    justifyContent:'center',
  },
});