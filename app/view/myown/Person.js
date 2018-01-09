
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  // Button,
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
    // backgroundColor: '#EBF8FD',
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    width:345,
    height:67,
    marginTop:15,
    padding:10,
  },
  keylist:{
    fontSize: 14,
    color: "#D1D1D1",
    letterSpacing: -0.34,
    marginBottom:5,
    height:18,
    lineHeight:18,
  },
  namelist:{
    fontSize: 16,
    color: "#666",
    letterSpacing: -0.39,
    height:22,
    lineHeight:22,
  },
  bstyle:{
    height:40,
    width:206,
    backgroundColor:'#22B1FF',
    borderRadius:100,
    marginBottom:20,
  },
  button: {
    height: 48,
    width: 206,
    borderRadius: 100,
    backgroundColor: '#22B1FF',
    justifyContent: 'center',
    margin: 20,
},
buttonText: {
    textAlign: 'center',
    color: 'white',
    // height: 48,
    width: 200,
    marginLeft:3,
    // lineHeight:48,
    // borderBottomLeftRadius:100,
},
});

export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
      data : [
              {key:'昵称',name:'林亦宣'},
              {key:'手机号',name:'176 0022 4466'},
              {key:'地区',name:'北京市-朝阳区'},
              {key:'公司',name:'万科企业股份有限公司'},
              {key:'部门',name:'商务部'},
              {key:'职务',name:'商务总监'},
             ]
  }
}
  static navigationOptions = {
    title: '个人信息',
    tabBarLabel: '个人信息',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    // tabBarIcon: ({ tintColor }) => (<Icon name="ios-book" color={tintColor} size={22} />),
  }
  _renderFlatlist(item) {
      return (
        <View style={styles.flatlist}>
           <Text style={styles.keylist}>{item.key}</Text>
           <Text style={styles.namelist}>{item.name}</Text>
        </View>
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
      {/* <View style={styles.bstyle}>
      <Button
        onPress={this.onPressLearnMore}
        title="Learn More"
        color="#fff"
        style={{borderRadius:100}}
        />
      </View> */}
      <TouchableOpacity
          style={styles.button}>
         <Text style={styles.buttonText}>保存</Text>  
       </TouchableOpacity>
      </View>
      
    );
  }
}

