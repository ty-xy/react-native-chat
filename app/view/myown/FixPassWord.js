
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
import Fix from './Fix';

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
 

});
const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
  };
export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
      data : [
              {key:'手机号',num:'176 1158 7772'},
              {key:'验证码',common: '1158', num:'获取验证码'},
             ]
  }
}
  static navigationOptions = {
    title: '修改登录密码',
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

  onPressLearnMore () {
    let num = 0
    console.log(num++)
  }
  render() {
    return (
      <View style={styles.container}>
         <Fix data={this.state.data} height={67} top={165} title={'新密码'}/>
      </View>
      
    );
  }
}

