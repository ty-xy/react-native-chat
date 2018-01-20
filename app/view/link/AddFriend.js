
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
//   FlatList,
  View,
  TouchableOpacity,
  // Button,
} from 'react-native';
import Book from '../Item';
import PassWord from '../myown/PassWord';
import Contacts from 'react-native-contacts';
// Contacts.getAll((err, contacts) => {
//     if(err === 'denied'){
//       // error
//     } else {
//       // contacts returned in []
//     }
//   })

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
    flexDirection: 'row',
    alignItems:'center',
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
    fontSize: 24,
    color: "#29B6F6",
    letterSpacing: -0.39,
    fontFamily:'iconfont',
    marginRight:13,
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
  }
  _onpressButton=(id)=>{
      const { navigation} = this.props;
       navigation.navigate(id)
  }
  onPressLearnMore () {
    let num = 0
    console.log(num++)
  }
  _onpressB=()=>{
   Contacts.getAll((err, contacts) => {
    if(err === 'denied'){
     console.log(21,err)
    } else {
        const { navigation} = this.props;
        navigation.navigate('AddPhone',contacts)
    }
  })


}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Text style={{fontFamily:'iconfont',fontSize:16,color:'#29B6F6',marginRight:10}}>&#xe636;</Text>
            <PassWord texts={this.state.text} />
        </View>
        <TouchableOpacity onPress={()=>this._onpressButton('FriendApply')} style={{width:'100%'}}>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>&#xe637;</Text>
           <Text style={styles.keylist}>新的好友</Text>
         </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>this._onpressButton('wChat')} style={{width:'100%'}}>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>&#xe638;</Text>
           <Text style={styles.keylist}>扫一扫</Text>
         </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={this._onpressB} style={{width:'100%'}}>
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>&#xe639;</Text>
           <Text style={styles.keylist}>添加手机联系人</Text>
         </View>
         </TouchableOpacity>
      </View>
      
    );
  }
}

