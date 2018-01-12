
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
import PassWord from '../myown/PassWord';

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
    flexDirection: 'row',
    alignItems:'center',
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
    fontSize: 16,
    color: "#666",
    letterSpacing: -0.39,
    height:22,
    lineHeight:22,
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
      data : [
              {key:'新的好友',name:'林亦宣'},
              {key:'扫一扫',name:'176 0022 4466'},
              {key:'添加手机联系人',name:'北京市-朝阳区'}
             ]
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
        <View style={styles.search}>
          <Text style={{fontFamily:'iconfont',fontSize:16,color:'#29B6F6',marginRight:-24}}>&#xe636;</Text>
            <PassWord texts={this.state.text}/>
        </View>
     <FlatList
        data={this.state.data}
        renderItem={({item}) => this._renderFlatlist(item)}
      />
      </View>
      
    );
  }
}

