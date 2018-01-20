
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
    height:67,
    marginTop:15,
    padding:10,
    flexDirection: 'column',
    // alignItems:'center',
    justifyContent: 'space-around',
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
    color: "#D1D1D1",
    letterSpacing: -0.34,
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
    title:'更多',
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
  render() {
    return (
      <View style={styles.container}> 
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>备注</Text>
           <Text style={styles.keylist}>新的好友</Text>
         </View>
         <TouchableOpacity onPress={()=>this._onpressButton('wChat')} style={{width:'100%'}}>
         <View style={[styles.flatlist,{height:42}]}>
           <Text style={styles.keylist}>将此人名片发送给他人</Text>
         </View>
         </TouchableOpacity>
      </View>
      
    );
  }
}

