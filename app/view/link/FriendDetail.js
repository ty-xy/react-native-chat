
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
//   FlatList,
ImageBackground ,
ScrollView,
  View,
  TouchableOpacity,

  Image
} from 'react-native';
import Book from '../Item';
import PassWord from '../myown/PassWord';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../../component/MeteorContainer';

const navigationOptions=(navigation)=>({
    title:'详细资料',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    headerRight: (
        <TouchableOpacity onPress={() =>navigation.navigate('More',{name:navigation.state.params.name})}>
    <Text  style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>更多</Text>
      </TouchableOpacity>
    ),
  })
  const subCollection = () => (navigation) => {
    Meteor.subscribe('users');
    Meteor.subscribe('group');
    const {id}=navigation.state.params
    console.log(id)
    const user = Meteor.user() || {};
    const group = Meteor.collection('group').findOne({ $and: [{ type: 'user', members: { $all: [Meteor.userId(), id] } }] }) || {};
    const groupId = group._id || '';
    // const chatUser = Meteor.users.findOne({ _id: friendId }) || {};
    // console.log(chatUser);
    console.log(groupId,group)
    return {
        // user,
        // chatUser,
        // friendId,
       groupId,
    };
  }
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
    // borderRadius: 4,
     width:'100%',
    // width:345,
    // flex:1,
    height:67,
    marginTop:15,
    padding:10,
    flexDirection: 'column',
    justifyContent:'space-between',
    // alignItems:'center',

  },
  keylist:{
    fontSize: 16,
    color: "#4d4d4d",
    letterSpacing: -0.39,
    // marginBottom:5,
    // height:18,
    // lineHeight:18,
  },
  namelist:{
    fontSize: 14,
    color: "#d1d1d1",
    letterSpacing: -0.39,
    fontFamily:'iconfont',
    marginRight:13,
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
  buttonList:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    width:'100%',
    marginTop:30,
  },
  button:{
    width:135,
    height:40,
    // backgroundColor:'#22B1FF',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    shadowColor:'rgba(41,182,246,0.10)',
    shadowOffset: {width: 8,height:8},
    // shadowOpacity
    shadowRadius:100,
    borderRadius:100,
  },
  buttonText:{
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0,
  }
});

 class FriendDetail extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
        modalVisible: false,
  }
}
  

  onPressLearnMore () {
    let num = 0
    console.log(num++)
  }
  _onPressSend =(groupId)=>{
      const {navigation}=this.props
      navigation.navigate('ChatWindow', { to:groupId });
  }
  render() {
    const {name,number,avatar,area,company,id}=this.props.navigation.state.params
    console.log(this.props)
    return (
      <ScrollView>
         <View style={styles.container}>
        <ImageBackground 
        source={require('../../image/touxiang.png')} 
        style={{width:'100%', height: 160}}
        >
         <View style={styles.first}>
            <Image source={{uri:avatar}} style={styles.img} />
         </View>
        </ImageBackground>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>用户昵称</Text>
           <Text style={styles.keylist}>{name}</Text>
         </View>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>账号信息</Text>
           <Text style={styles.keylist}>{number}</Text>
         </View>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>地区</Text>
           <Text style={styles.keylist}>{area}</Text>
         </View>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>公司</Text>
           <Text style={styles.keylist}>{company}</Text>
         </View>
         <View style={styles.buttonList}>
             <TouchableOpacity
              onPress={()=>this._onPressSend(this.props.groupId)}
              style={[styles.button,{backgroundColor:'#22B1FF'}]}>
              <Text style={styles.buttonText}>发送消息</Text>  
             </TouchableOpacity>
             <TouchableOpacity
              style={[styles.button,{backgroundColor:'#F74144'}]}>
              <Text style={styles.buttonText}>删除好友</Text>  
             </TouchableOpacity>
         </View>
         </View>
      </ScrollView >
    );
  }
}

export default MeteorContainer(navigationOptions, subCollection())(FriendDetail);