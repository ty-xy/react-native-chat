
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
        {link:'联系我们',key:'400-800-2046',icon:'&#xe640;'},
        {key:'关于e建联',icon:'&#xe63b;'},
       ],
       text: '创业就像走在一条长长的道路上，你看不见尽头，望不到边。有人忍受不了孤独而走上众人的通途，有人受不了困苦沿着脚印一步步退后，只有一种人可以看到豁然开朗的景色：他们从不畏孤独、险途，他们始终与梦想相伴，他们记得为什么出发，所以他们始终都能到达。',
      }
 }
  static navigationOptions = {
    title: '关于我们',
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
    console.log(item.icon)
    return (
        <View style={styles.flatlist}>
           <View style={item.link?styles.total:''}>
           {item.link?
           <Text style={styles.link}>{item.link}</Text>:null}
           <Text style={styles.keylist}>{item.key}</Text>
           </View>
           {item.link==="联系我们"?
           <Text style={[styles.namelist,{color:'#29B6F6'}]} >&#xe640;</Text>:
           <Text style={[styles.namelist,{color:'#D1D1D1'}]} >&#xe63b;</Text>}
        </View>
    )
}
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.detail}>
             <Text style={styles.title}>意见反馈</Text>
             <PassWord texts={this.state.text}/>
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
 flatlist:{
  backgroundColor: '#FFFFFF',
  shadowOffset: {width: 8, height: 8},
  shadowColor:'rgba(41,182,246,0.02)',
  borderRadius: 4,
  width:345,
  height:67,
  padding:10,
  marginTop:15,
  flexDirection: 'row',
  alignItems:'center',
  justifyContent: 'space-between',
},
keylist:{
  fontSize: 16,
  color: "#4D4d4d",
  letterSpacing: -0.39,
 
},
namelist:{
  fontSize: 16,
  letterSpacing: -0.39,
  fontFamily:'iconfont',
  fontSize:24,
  marginRight:10,
},
link:{
  fontSize: 14,
  color: "#d1d1d1",
  letterSpacing: -0.34,
},
total:{
  flexDirection: 'column',
  alignItems:'flex-start',
  justifyContent: 'space-between',
  height:47,
}
});