import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import Meteor from 'react-native-meteor';
import Toast from 'react-native-easy-toast';
import toast from '../util/util';
import _navigation from '../util/navigation';
import util from '../util/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    position:'relative',
    padding:15,
    // backgroundColor: '#EBF8FD',
  },
  wrap:{
    height:67,
    padding:10,
    backgroundColor:'#fff',
    width:'100%',
    marginBottom:15,
  },
  title:{
    fontSize: 14,
    color: '#D1D1D1',
    letterSpacing: -0.34,
    height:20,
  },
  button: {
    height: 40,
    width:206,
    borderRadius: 4,
    backgroundColor: '#22B1FF',
    justifyContent: 'center',
    padding:10,
    position:'absolute',
    top:358,
},
buttonText: {
    textAlign: 'center',
    color: '#FFF',
},
yanzheng:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
},
validateword:{
    fontSize:14,
    color:'#29B6F6',
    letterSpacing:-0.34,
},
textinput:{
    // backgroundColor:'red',
    marginTop:5,
    height:22,
}
});
const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
  };
export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'',
        name:'',
        number:'',
        password:'',
        countDownNum: 60,
        sendBtnStatus: 0,
        BizId: '',
  }
}
  static navigationOptions = {
    title: '新用户注册',
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

  sendMessage = async () => {
    // const form = this.props.form;
    const username = this.state.username;
    // console.log(Meteor.collection('groups').find({}));
    const re =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!re.test(username)) {
        util.alertOk('请输入正确的手机号');
        return false;
    }
    const _this=this;
    this.setState({
         sendBtnStatus: 1,
        });
        let countDownNum = _this.state.countDownNum;
        const countDownDate = setInterval(() => {
            countDownNum--;
            this.setState({
                countDownNum,
            });
            if (countDownNum <= 0) {
                this.setState({
                    sendBtnStatus: 2,
                    countDownNum: 60,
                });
                clearInterval(countDownDate);
            }
        }, 1000);
       await Meteor.call('sendRegisterSMS',username,(err,result)=>{
                console.log(err,result)
                if(err) {console.log(err,); return; }
                console.log(result)
                _this.setState({
                    BizId: result.BizId,
                });
        });
}
hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);
login = (userId) => {
    const { history } = this.props;
    if (history.location && history.location.search && history.location.state === 'invite') {
        const search = `${history.location.search}&userId=${userId}`;
        history.push({ pathname: '/login', search, state: history.location.state });
        feedback.dealSuccess('注册成功');
    } else {
        history.push('/login');
    }
}
handleRegister =async (e) => {
    e.preventDefault();
    // const form = this.props.form;
    if (this.state.countDownNum <= 0 && this.state.countDownNum >= 60) {
        return util.alertOk('请重新接受验证码');
    }
    if (!this.state.number) {
        return util.alertOk('请输入验证码');
    }
    
    await Meteor.call('queryDetail', this.state.username, this.state.BizId, Number(this.state.number),(err,queryResult)=>{
        if(err){
           return util.alertOk(err);
        }else if (!queryResult) {
           return util.alertOk('请输入正确的验证码');
       }else{
           console.log(this.state.username,this.state.password,this.state.name)
           Meteor.call('register',
         {
             username:this.state.username,
             password:this.state.password,
             name:this.state.name,
         },
         (error, userId) => {
            if (error) {
                util.alertOk(error.reason);
                return 
            }
            console.log(userId);
            toast.toast('登陆成功', this);
            _navigation.reset(this.props.navigation, 'Login')
            // Meteor.loginWithPassword(this.state.text,this.state.password);
        });
     }
  });
};
  render() {
    return (
      <View style={styles.container}>
           <View style={styles.wrap}>
                <Text style={styles.title}>手机号</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={(username) => this.setState({username})}
                    maxLength = {326}
                     multiline = {false}
                    placeholder="请输入手机号码"
                    style={styles.textinput}    
                    value={this.state.username}/>
                    
           </View>
           <View style={styles.wrap}>
                <Text style={styles.title}>用户昵称</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={(name) => this.setState({name})}
                    maxLength = {326}
                     multiline = {false}
                    placeholder="请输入用户昵称"
                    style={styles.textinput}
                    value={this.state.name}/>
           </View>
           <View style={styles.wrap}>
                <Text style={styles.title}>验证码</Text>
                <View style={styles.yanzheng}>
                    <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={(number) => this.setState({number})}
                    maxLength = {326}
                     multiline = {false}
                    placeholder="请输入验证码"
                    style={styles.textinput}
                    value={this.state.number}/>
                  {
                    this.state.sendBtnStatus === 0 ?
                         <TouchableOpacity onPress={this.sendMessage}>
                            <Text style={styles.validateword}>获取验证码</Text>
                         </TouchableOpacity>
                          :
                          null
                }
                {
                    this.state.sendBtnStatus === 1 ?
                        <TouchableOpacity>
                            <Text>
                                 剩余{this.state.countDownNum}秒 
                                    </Text>
                                    </TouchableOpacity>
                                     :
                                     null
                }
                {
                    this.state.sendBtnStatus === 2 ?
                        <TouchableOpacity onPress={this.sendMessage}>
                             <Text style={styles.validateword}>重新发送</Text>
                                 </TouchableOpacity>
                                     :
                                 null
                }

                </View>
           </View>
           <View style={styles.wrap}>
                <Text style={styles.title}>密码</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={(password) => this.setState({password})}
                    maxLength = {326}
                     multiline = {false}
                    placeholder="请输入密码"
                    style={styles.textinput}
                    value={this.state.password}/>
                    
           </View>
           <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
                <Text style={styles.buttonText}>完成</Text>  
          </TouchableOpacity>
          <Toast
                    style={{borderRadius: 20, paddingTop: 10, paddingBottom: 10}}
                    ref={i => this.toast = i}
                    position='bottom'
                    positionValue={300}
                    opacity={0.8}
                />
      </View>
    );
  }
}