import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Meteor from 'react-native-meteor';
import Toast from 'react-native-easy-toast';
import toast from '../util/util';
import localStorage from '../util/storage';
import _navigation from '../util/navigation';
import util from '../util/util';

class Login extends Component {
    static navigationOptions = {
        title: null,
        headerBackTitle: null,
        header: null,
        tabBarVisible: false,
    };
    constructor(params) {
        super(params);
        this.state = {
            username: '',
            password: '',
            showpwd: true
        };
    }
    _clearInput = (name) => {
        this.setState({ [name]: '' });
    }
    _closeIcon = (state, password) => {
        if (state) {
            return (
                <TouchableOpacity style={[styles.close, styles[password]]} onPress={() => this._clearInput(password)}>
                    <Text style={styles.closeIcon}>&#xe67b;</Text>
                </TouchableOpacity>
            );
        }
        return <View />;
    }
    _handleShowPwd = () => {
        this.setState({ showpwd: !this.state.showpwd });
    }
    // 用户登录
    _handleSubmit = () => {
        const { username, password } = this.state;
        if (!username) {
            util.alertOk('用户名不能为空')
        } else if (!password) {
            util.alertOk('密码不能为空')
        } else {
            Meteor.loginWithPassword(username, password, (error) => {
                if (error) {
                    util.alertOk('用户名或密码错误')
                } else {
                    this.password.blur();
                    this.phone.blur();
                    toast.toast('登陆成功', this);
                    localStorage('login').set({ username, password });    
                    // this.props.navigation.goBack();                
                    _navigation.reset(this.props.navigation, 'HomeScreen');
                }
            });
        }
    }
    render() {
        const { showpwd } = this.state;
        return (
            <View style={styles.wrap}>
                <ImageBackground style={styles.bg} source={require('../image/loginbg.jpg')}>
                    <View style={styles.login}>
                        <Image style={styles.avatar} source={require('../image/oval.png')} />
                        <View style={styles.form}>
                            <View style={styles.formLable}>
                                <Text style={styles.label}>手机号码</Text>
                                <TextInput
                                    ref={i => this.phone = i}
                                    style={styles.input}
                                    placeholder="请输入手机号码!"
                                    value={this.state.username}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(username) => this.setState({ username })}
                                />
                                {this._closeIcon(this.state.username, 'username')}
                            </View>
                            <View style={[styles.formLable]}>
                                <Text style={styles.label}>密码</Text>
                                <TextInput
                                    ref={i => this.password = i}
                                    style={styles.input}
                                    value={this.state.password}
                                    placeholder="请输入密码!"
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={showpwd}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                {this._closeIcon(this.state.password, 'password')}
                                <TouchableOpacity style={styles.eye} onPress={this._handleShowPwd}>
                                    {!showpwd ? <Text style={styles.eyeIcon}>&#xe62c;</Text> : <Text style={styles.eyeIcon}>&#xe62b;</Text>}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ marginBottom: 20 }} onPress={this._handleSubmit}>
                                <LinearGradient
                                    colors={['#7BE4FF', '#538BFE']}
                                    end={{ x: 0, y: 1 }}
                                    start = {{ x: 1, y: 1 }}
                                    style={styles.bgLoginstyle}
                                >
                                    <Text style={styles.loginStyle}>登录</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={styles.regback}>
                               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <Text style={styles.register}>新用户注册</Text>
                                </TouchableOpacity>
                                <Text style={styles.register}>忘记密码</Text>
                            </View>
                            <View style={styles.other}>
                                <View style={styles.border} />
                                <Text style={[styles.register, { paddingLeft: 10, paddingRight: 10 }]}>第三方账号直接登录</Text>
                                <View style={styles.border} />
                            </View>
                            <View style={styles.qq}>
                                <TouchableOpacity style={styles.qqTouch}>
                                    <Text style={styles.qqIcon}>&#xe62d;</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.qqTouch}>
                                    <Text style={styles.qqIcon}>&#xe62e;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sevice}>
                            <Text style={styles.serviceText}>登录即同意知工应用服务条款</Text>
                        </View>
                    </View>
                </ImageBackground>
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
    wrap: {
        flex: 1,    
        backgroundColor: '#ffffff'
    },
    bg: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        height: 514,
        width: 310,
        alignItems: 'center',
        position: 'relative'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#ffffff',
        borderWidth: 2,
        position: 'absolute',
        zIndex: 1,
    },
    form: {
        position: 'absolute',
        zIndex: 0,
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 80,
        backgroundColor: '#ffffff',  
        borderRadius: 4,
    },
    formLable: {
        marginBottom: 30,
        position: 'relative'
    },
    eye: {
        position: 'absolute',
        right: 2,
        paddingLeft: 5,
        bottom: 5,
    },
    close: {
        position: 'absolute',
        right: 2,
        paddingLeft: 5,
        bottom: 5,
    },
    eyeIcon: {
        fontFamily: 'iconfont',
        fontSize: 14,
        color: '#B7D9F4'
    },
    closeIcon: {
        fontFamily: 'iconfont',
        fontSize: 14,
        color: '#B7D9F4',
        marginRight: 5
    },
    label: {
        fontSize: 12,
        color: '#29B6F6',
    },
    input: {
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#29B6F6',
        paddingBottom: 5,
        paddingTop: 8
    },
    bgLoginstyle: {
        width: 205,
        height: 35,
        backgroundColor: 'transparent',
        borderRadius: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginStyle: {
        color: '#ffffff',
        fontSize: 14
    },
    password: {
        right: 20,
    },
    regback: {
        width: 205,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    register: {
        color: '#B7D9F4',
        fontSize: 12,
    },
    other: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    border: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F4FF',
    },
    qq: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: 160
    },
    qqTouch: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    qqIcon: {
        fontSize: 20,
        fontFamily: 'iconfont',
        color: '#999999'
    },
    sevice: {
        position: 'absolute',
        bottom: -35,
        backgroundColor: 'transparent'
    },
    serviceText: {
        color: '#ffffff',
        fontSize: 12,
    }
});

export default Login;