# 壹建联手机App，用React Native创建

## 开发模式启动

### 安卓启动
    `npm run android`

### ios启动
    `npm run ios`



## mock服务器启动 (未配置，后面看技术需求)
    命令： `npm run mock`
    
    
## 1.react-navigation设置navigationOptions中Static中使用this的方法
static navigationOptions = ({navigation, screenProps}) => ({    
        headerLeft:(  
            <Text onPress={()=>navigation.state.params.navigatePress()} style={{marginLeft:5, width:30, textAlign:"center">  
                <Icon  name='ios-arrow-back'size={24} color='white' />  
            </Text>  
        )  
    });  
  
    _onBackAndroid=()=>{  
        alert('点击headerLeft');  
    }  
      
    componentDidMount(){  
        //在static中使用this方法  
        this.props.navigation.setParams({ navigatePress:this._onBackAndroid })  
    } 
## 2.路由 React Navigation 网址 https://reactnavigation.org/docs/intro/headers
## 3.与后台连接   react-native-meteor 网址 https://github.com/inProgress-team/react-native-meteor 
## 4.Modal  onShow方法在组件显示以后调用
## 5.请着手音视频的手机端开发。使用框架：react-native-webrtc, https://github.com/oney/react-native-webrtc
   demo: https://github.com/oney/RCTWebRTCDemo
   信令https://github.com/oney/react-native-webrtc-server，已经运行在creek.xin上面。
   我们的信令服务器：https://creek.xin:13229
   我们的STUN/TURN:
   var configuration = {"iceServers": [
   { url: 'stun:creek.xin:3478' },
  { url: 'stun:stun.l.google.com:19302'},
  { url: 'turn:creek.xin:3478', 'username':'zg','credential':'hp@817'}
   ] };
   //const socket = io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
const socket = io.connect('https://creek.xin:13229', {transports: ['websocket']});


 import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    getUserMedia,
} from 'react-native-webrtc';

var configuration = {"iceServers": [
   { url: 'stun:creek.xin:3478' },
   { url: 'stun:stun.l.google.com:19302'},
   { url: 'turn:creek.xin:3478', 'username':'zg','credential':'hp@817'}
] };
// const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
