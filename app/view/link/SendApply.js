
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
//   FlatList,
  View,
  TouchableOpacity,
  // Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    padding:15,
    // backgroundColor: '#EBF8FD',
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    width:'100%',
    // width:345,
    // flex:1,
    height:67,
    marginTop:15,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignItems:'center',
  },
  keylist:{
    fontSize: 16,
    color: "#4d4d4d",
    letterSpacing: -0.34,
    // marginBottom:5,
    // height:18,
    // lineHeight:18,
  },
  namelist:{
    fontSize: 14,
    color: "#D1D1D1",
    letterSpacing: -0.39,
    // fontFamily:'iconfont',
    marginRight:13,
  },

});

export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
  }
}
  static navigationOptions = {
    title:'添加朋友',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    headerRight: (
        <TouchableOpacity onPress={() =>navigation.navigate('AddFriend')}>
            <Text  style={{ marginRight: 10, fontSize: 18, color: '#29B6F6'}}>发送</Text>
        </TouchableOpacity>
    ),
  }
  
  render() {
    const {name}=this.props.navigation.state.params
    return (
      <View style={styles.container}>
       {/* <TouchableOpacity onPress={()=>this._onpressButton('FriendApply')} style={{width:'100%'}}> */}
         <View style={styles.flatlist}>
           <Text style={styles.namelist}>你需要发送验证申请，等对方通过</Text>
           <Text style={styles.keylist}>你好，我是{name}</Text>
         </View>
         {/* </TouchableOpacity> */}
      </View>
    );
  }
}

