
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import Book from '../Item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    position:'relative',
    // backgroundColor: '#EBF8FD',
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    width:345,
    height:42,
    padding:10,
    // marginTop:15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  keylist:{
    fontSize: 16,
    color: "#4D4d4d",
    letterSpacing: -0.39,
    // marginBottom:5,
    // height:18,
    // lineHeight:18,
  },
  namelist:{
    fontSize: 16,
    color: "#d1d1d1",
    letterSpacing: -0.39,
    fontFamily:'iconfont',
    fontSize:24
  },
button: {
        height: 48,
        width:345,
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        // marginTop:10,
        padding:10,
        top:144,
        position:'absolute',
    },
    buttonText: {
        textAlign: 'center',
        color: '#4d4d4d',
        // width: 200,
        // marginLeft:3,
      
    },
});
const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
  };
export default class Aboutus extends Component {
  constructor(props){
    super(props);
    this.state={
      data : [
              {key:'修改当前绑定账号',route:'FixNumber'},
              {key:'修改登录密码',route:'FixPassWord'},
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
  _onPressButton(id){
      this.props.navigation.navigate(id)
  }
  _renderFlatlist(item) {
      return (
        <TouchableHighlight 
        onPress={ () => this._onPressButton(item.route) } 
        underlayColor='transparent'
        style={{paddingTop:15}}
        >
        <View style={styles.flatlist}>
           <Text style={styles.keylist}>{item.key}</Text>
           <Text style={styles.namelist} >&#xe63b;</Text>
        </View>
        </TouchableHighlight>
      )
  }
  
  onPressLearnMore () {
    let num = 0
    console.log(num++)
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
           data={this.state.data}
           renderItem={({item}) => this._renderFlatlist(item)}
      />
       
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>退出保存</Text>  
       </TouchableOpacity>
      </View>
      
    );
  }
}

