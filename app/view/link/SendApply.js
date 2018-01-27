
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
//   FlatList,
  View,
  TouchableOpacity,
  // Button,
} from 'react-native';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../../component/MeteorContainer';


const  navigationOptions =({navigation}) =>({
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
        <TouchableOpacity onPress={() =>navigation.state.params.navigatePress()}>
            <Text  style={{ marginRight: 10, fontSize: 18, color: '#29B6F6'}}>发送</Text>
        </TouchableOpacity>
    ),
  })
  const subCollection = () => (navigation) => {
    Meteor.subscribe('users');
    const {_id}=navigation.state.params
    const chatUser = Meteor.collection('users').findOne({ _id}) || {};
    console.log(chatUser,navigation.state.params);
    return {
        chatUser,
    };
  }

 class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
  }
}
  _sendApply = () =>{
   console.log('你被调用了')
  const { profile = {} } = this.props.chatUser || {};
  const { verifyFriend = '0' } = profile;
  if (verifyFriend === '0') {
      Meteor.call('verifyFriend', this.props.friendId, this.$verifyMessage.value, (err) => {
          if (err) {
              console.error(err.reason);
          }
        //   feedback.dealSuccess('请求已发送,等待好友验证');
          this.props.handleFriendInfo();
      });
  } else if (verifyFriend === '1') {
      Meteor.call('addFriend', this.props.friendId, (err) => {
          if (err) {
              console.error(err.reason);
          }
        //   feedback.dealSuccess('添加好友成功');
          this.props.handleFriendInfo();
      });
  } else {
    //   feedback.dealWarning('该用户设置了不允许任何人添加他为好友');
  }
}
componentDidMount(){  
    //在static中使用this方法  
    this.props.navigation.setParams({ navigatePress:this._sendApply })  
} 
  render() {
    const {name}=this.props.navigation.state.params;
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

export default MeteorContainer(navigationOptions, subCollection())(Person);

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