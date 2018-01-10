
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  // TouchableHighlight,
  // TouchableOpacity,
  Button,
} from 'react-native';
import Book from '../Item';
import PassWord from './PassWord';


const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
  };

export default class Aboutus extends Component {
  constructor(props){
    super(props);
    this.state={
      data : [
        {key:'联系我们',num:'400-800-2046',icon:'&#xe640;'},
        {key:'关于e建联',icon:'&#xe63b;'},
       ]
  }
}
  static navigationOptions = {
    title: '账号设置',
    // tabBarLabel: '个人信息',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  }
  _renderFlatlist(item) {
    return (
      <View style={styles.flatlist}>
         <Text style={styles.keylist}>{item.key}</Text>
         <Text style={{fontFamily:'iconfont',fontSize:24}} >&#xe63b;</Text>
      </View>
    )
}
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.detail}>
             <Text style={styles.title}>意见反馈</Text>
             <PassWord/>
              <View style={styles.submit}>
                 <Text  style={styles.sub}>提交</Text>
                 <Text>取消</Text>
              </View>
          </View>
          <FlatList
        data={this.state.data}
        renderItem={({item}) => this._renderFlatlist(item)}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // alignItems:'center',
    position:'relative',
    padding:15,
    // backgroundColor: '#EBF8FD',
  },
  detail:{
    backgroundColor:"#fff",
    padding:10,
    minHeight:110,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  submit:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom:10,
  },
  title:{
    fontSize: 14,
    color: '#D1D1D1',
   letterSpacing: -0.34,
  },
 sub:{
    marginRight:10,
    fontSize: 14,
    color: '#29B6F6',
   letterSpacing: -0.34,
 },
 keylist:{
   height:67,
   width:'100%',
   backgroundColor:'#fff',
   marginTop:15,
 }
});