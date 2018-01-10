
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
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
    height:42,
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
    // marginBottom:5,
    // height:18,
    // lineHeight:18,
  },
  namelist:{
    fontSize: 16,
    color: "#d1d1d1",
    letterSpacing: -0.39,
  },
});

export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
      data : [
              {key:'清除缓存',space:'11.22MB'},
             ]
  }
}
  static navigationOptions = {
    title: '系统设置',
    // tabBarLabel: '个人信息',
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
           <Text style={styles.namelist}>{item.space}</Text>
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
      </View>
      
    );
  }
}

