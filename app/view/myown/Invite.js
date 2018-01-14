
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableHighlight
} from 'react-native';


export default class Invite extends Component {
  constructor(props){
    super(props);
    this.state={
 }
}

  render() {
    return (
      <View style={styles.container}>
          <Text>发送</Text>
          <View style={styles.sendlist}>
              <View style={styles.tu}>
                 <View style={styles.commonwe}>
                    <Text style={styles.weixin}>&#xe62e;</Text>
                 </View>
                 <Text>微信</Text>
              </View>
              <View style={styles.tu}>
                 <View style={styles.commonwe}>
                    <Text style={[styles.weixin,{color:'#29B6F6'}]}>&#xe62d;</Text>
                 </View>
                 <Text>朋友圈</Text>
              </View>
              <View style={styles.tu}>
                 <View style={styles.commonwe}>
                    <Text style={[styles.weixin,{color:'#66BB6A'}]}>&#xe634;</Text>
                 </View>
                 <Text>短信</Text>
              </View>
          </View>
              <View style={styles.bottom}>
              <TouchableHighlight onPress={() => {
              this.props.hide(false)
            }}>
              <Text >取消</Text>
              </TouchableHighlight>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   height:188,
    //  maxWidth:'100%',
   backgroundColor: '#F7F7F7',
   borderRadius: 25,
   alignItems:'center',
   paddingTop:10,
   position:'absolute',
   bottom:40,
   left:10,
   right:10,
  },
  sendlist:{
    flexDirection: 'row',
    alignItems:'center',
    width:'100%',
    justifyContent: 'space-around',
    marginTop:16,
  },
   weixin:{
       fontFamily:'iconfont',
       color:'#9CCC65',
       fontSize:26,
    },
    commonwe:{
        // textAlign:'center',
        // lineHeight:54,
        height:54,
        width:54,
        borderRadius:27,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginBottom:8,
    },
    tu:{
        flexDirection:  'column',
        alignItems:'center',
    },
    bottom:{
      width:'100%',
      height:48,
      backgroundColor:'#fff',
      borderTopColor:'#ccc',
    //   marginTop:22,
      borderStyle:'solid',
      borderBottomEndRadius:25,
      borderBottomRightRadius:25,
      borderBottomLeftRadius:25,
    //   borderRadius:20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    position:'absolute',
    bottom:0,
    }
});