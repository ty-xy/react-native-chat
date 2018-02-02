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
import toast from '../../util/util';
import _navigation from '../../util/navigation';
import util from '../..//util/util';
import localStorage from '../../util/storage';
// import { setTimeout } from 'timers';


const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
  };
export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
        username:'',
        name:'',
        number:'',
        password:'',
        countDownNum: 60,
        sendBtnStatus: 0,
        BizId: '',
  }
}
  static navigationOptions = {
    title: '修改当前绑定账号',
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
    const username=this.state.username;
    // console.log(Meteor.collection('groups').find({}));
    const re =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!re.test(username)) {
        util.alertOk('请输入正确的手机号');
        return false;
    }
    const _this=this;
    Meteor.call('makeSureRegister',username,(err,result)=>{
           if(err){
               return toast.toast(err.reason, this);
           }
           _this.setState({
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
        toast.toast(`已给您的 ${username} 手机号发送了一条验证短信`, this);
        Meteor.call('sendRegisterSMS',username,(err,result)=>{
                if(err) {console.log(err,); return; }
                _this.setState({
                    BizId: result.BizId,
                });
        });
    })
        
}


handleRegister = async (e) => {
    e.preventDefault();
    if (this.state.countDownNum <= 0 && this.state.countDownNum >= 60) {
        return util.alertOk('请重新接受验证码');
    }
   if (!this.state.number) {
        return toast.toast('请输入正确的验证码', this);
    }
        const _this = this;
    const username=this.state.username;
    const oldname=this.props.navigation.state.params.username;
    await Meteor.call('queryDetail', username, this.state.BizId, Number(this.state.number),(err,queryResult)=>{
             if(err){
                return util.alertOk(err);
             }else if (!queryResult) {
                return toast.toast('请输入正确的验证码', this);
            }else{
                console.log(oldname,_this.state.password)
                Meteor.loginWithPassword(oldname,_this.state.password, (error) => {
                    if (error) {
                        util.alertOk('当前密码错误')
                    } else {
                           Meteor.call('changeUserName',
                                username,
                            (error, result) => {
                            if (error) {
                                console.log(error)
                                // util.alertOk(error.reason || '未知错误');
                                return ;
                            }
                            toast.toast('修改成功', this);
                            _navigation.reset(this.props.navigation, 'Login')
                        });
                    }
                });
                // Meteor.call('changeUserName',
                //      username,
                //     (error, result) => {
                //     if (error) {
                //         console.log(error)
                //         util.alertOk(error.reason || '未知错误');
                //         return ;
                //     }
                //     toast.toast('修改成功', this);
                //     _navigation.reset(this.props.navigation, 'Login')
                // });
            }
        });
    };
  render() {
    const username=this.props.navigation.state.params.username;
    return (
      <View style={styles.container}>
           <View style={styles.wrap}>
                <Text style={styles.title}>手机号</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    maxLength = {326}
                     multiline = {false}
                    //  editable={false}
                    onChangeText={(username) => this.setState({username})}
                    style={[styles.textinput,{color:'#666666'}]}
                    value={this.state.username}/>
                    <View style={styles.nownumber}>
                        <Text>您当前的账号为:</Text>
                        <Text style={{marginLeft:5,color:'#12C5FF' }}>{username}</Text>
                    </View>
           </View>
           <View style={[styles.wrap,{height:67}]}>
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
                {/* {this.state.username?
                <Text style={styles.detail}>已给您的<Text style={styles.validateword}>{this.state.username}</Text>手机号发送了一条验证短信</Text>:null} */}
           </View>
           <View style={[styles.wrap,{height:67}]}>
                <Text style={styles.title}>密码</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={(password) => this.setState({password})}
                    maxLength = {326}
                     multiline = {false}
                    placeholder="请输入当前使用密码"
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
      height:92,
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
  },
  nownumber:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  detail:{
    fontSize:14,
    color: '#777777',
    letterSpacing: 0.17,
  }
  });