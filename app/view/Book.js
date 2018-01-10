import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { observer } from 'mobx-react/native';
import hostUser from '../store/mobx';


export default class Book extends Component {
  static navigationOptions = {
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
  }
 
  render() {
    const { navigation } = this.props;
    console.log(navigation);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
           <ImageBackground 
           source={require('../image/touxiang.png')} 
           style={{width:'100%', height: 160}}
           >
            <View style={styles.first}>
            <Image source={require('../image/oval.png')} style={styles.img} />
            <Text style={styles.firstname} >林亦宣</Text>
            <Text style={styles.numbert}>账号:176 0022 4466</Text>
            </View>
           </ImageBackground>
           <View  style={styles.mybody}>
             <View style={styles.mytext} >
               <Image source={require('../image/curriculum.png')} style={styles.imgicon} />
               <Text onPress={ () => navigation.navigate('Person') }>个人资料</Text>
             </View>
             <View style={styles.mytext}>
               <Image source={require('../image/repair.png')} style={styles.imgicon} />
               <Text>系统设置</Text>
             </View>
             <View style={[styles.mytext,{marginRight:0}] }>
               <Image source={require('../image/human-resources.png')} style={styles.imgicon} />
               <Text>账号管理</Text>
             </View>
             <View style={styles.mytext}>
               <Image source={require('../image/networking.png')} style={styles.imgicon} />
               <Text>邀请朋友</Text>
             </View>
             <View style={styles.mytext}>
               <Image source={require('../image/businessmen.png')} style={styles.imgicon} />
               <Text>关于我们</Text>
             </View>
           </View>
        </View>
      </ScrollView>
    );
  }
}
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
  justifyContent: 'flex-start',
  },
  mytext:{
    height:108,
    width:108,
    backgroundColor: '#FFFFFF',
    shadowOpacity:0.02,
    borderRadius: 4,
    shadowColor:'rgba(41,182,246,0.02)',
    marginTop:10,
    marginRight:10,
    alignItems:'center',
    justifyContent:'center',
  },
});