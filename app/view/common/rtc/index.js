'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ListView,
  Platform,
  Dimensions,
  Image
} from 'react-native';

import io from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';
import Connected from './component/Connected';
import Call from './component/Call'

const socket = io.connect('https://creek.xin:13229', {transports: ['websocket']});
console.ignoredYellowBox = ['Setting a timer'];
const window = Dimensions.get('window');

// const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const configuration = {"iceServers": [
    { url: 'stun:creek.xin:3478' },
    { url: 'stun:stun.l.google.com:19302'},
    { url: 'turn:creek.xin:3478', 'username':'zg','credential':'hp@817'}
]};

const pcPeers = {};
let localStream;
let container;


function getLocalStream(isFront, callback) {

    let videoSourceId;

    // on android, you don't have to specify sourceId manually, just use facingMode
    // uncomment it if you want to specify
    if (Platform.OS === 'ios') {
        MediaStreamTrack.getSources(sourceInfos => {
            console.log("sourceInfos: ", sourceInfos);

            for (const i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
                    videoSourceId = sourceInfo.id;
                }
            }
        });
    }
    getUserMedia({
        audio: true,
        video: {
        mandatory: {
            minWidth: 640, // Provide your own width, height and frame rate here
            minHeight: 360,
            minFrameRate: 30,
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
        }
    }, function (stream) {
        console.log('getUserMedia success', stream);
        callback(stream);
    }, logError);
}

function join(roomID) {
    socket.emit('connect', roomID);
    socket.emit('join', roomID, function(socketIds){
        console.log('join', socketIds);
        for (const i in socketIds) {
            const socketId = socketIds[i];
            createPC(socketId, true);
        }
    });
}

function createPC(socketId, isOffer) {
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

    pc.oniceconnectionstatechange = function(event) {
        console.log('oniceconnectionstatechange', event.target.iceConnectionState);
        if (event.target.iceConnectionState === 'completed') {
            setTimeout(() => {
                    getStats();
            }, 1000);
        }
        if (event.target.iceConnectionState === 'connected') {
            createDataChannel();
        }
    };
    pc.onsignalingstatechange = function(event) {
        console.log('onsignalingstatechange', event.target.signalingState);
    };

    pc.onaddstream = function (event) {
        console.log('onaddstream', event.stream);
        container.setState({info: 'One peer join!'});

        const remoteList = container.state.remoteList;
        remoteList[socketId] = event.stream.toURL();
        container.setState({ remoteList: remoteList });
    };
    pc.onremovestream = function (event) {
        console.log('onremovestream', event.stream);
    };

    pc.addStream(localStream);
    function createDataChannel() {
        if (pc.textDataChannel) {
            return;
        }
        const dataChannel = pc.createDataChannel("text");

        dataChannel.onerror = function (error) {
         console.log("dataChannel.onerror", error);
        };

        dataChannel.onmessage = function (event) {
            console.log("dataChannel.onmessage:", event.data);
            container.receiveTextData({user: socketId, message: event.data});
        };

        dataChannel.onopen = function () {
            console.log('dataChannel.onopen');
            container.setState({textRoomConnected: true});
        };

        dataChannel.onclose = function () {
            console.log("dataChannel.onclose");
        };

        pc.textDataChannel = dataChannel;
    }
    return pc;
}

function exchange(data) {
    const fromId = data.from;
    let pc;
    if (fromId in pcPeers) {
        pc = pcPeers[fromId];
    } else {
        pc = createPC(fromId, false);
    }

    if (data.sdp) {
        console.log('exchange sdp', data);
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
        if (pc.remoteDescription.type == "offer")
            pc.createAnswer(function(desc) {
                console.log('createAnswer', desc);
                pc.setLocalDescription(desc, function () {
                    console.log('setLocalDescription', pc.localDescription);
                    socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
                }, logError);
            }, logError);
        }, logError);
    } else {
        console.log('exchange candidate', data);
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
}

function leave(socketId) {
    console.log('leave', socketId);
    const pc = pcPeers[socketId];
    const viewIndex = pc.viewIndex;
    pc.close();
    delete pcPeers[socketId];

    const remoteList = container.state.remoteList;
    delete remoteList[socketId]
    container.setState({ remoteList: remoteList });
    container.setState({info: 'One peer leave!'});
}

function logError(error) {
    console.log("logError", error);
}

function mapHash(hash, func) {
    const array = [];
    for (const key in hash) {
        const obj = hash[key];
        array.push(func(obj, key));
    }
    return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}




class RCTWebRTC extends Component {
    static navigationOptions = (navigation) => ({
        header: null,
    });
    
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});        
        this.state = {
            info: 'Initializing',
            status: 'init',
            roomID: 'abc',
            isFront: true,
            selfViewSrc: null,
            remoteList: {},
            textRoomConnected: false,
            textRoomData: [],
            textRoomValue: '',
            isVideo: false,
        };
    }
    componentWillMount() {
        console.log('componentWillMount')
    }
    componentDidMount() {
        console.log('componentDidMount', this)
        container = this;
        socket.on('exchange', function(data){
            exchange(data);
        });
        socket.on('leave', function(socketId){
            console.log('socketId', socketId)
            leave(socketId);
            
        });
        socket.on('connect', function(data) {
            console.log('connect', container);
            // getLocalStream(true, function(stream) {
            //     localStream = stream;
            //     container.setState({selfViewSrc: stream.toURL()});
            //     container.setState({status: 'ready', info: 'Please enter or create room ID'});
            // });
        });
        this._switchVideoType();
        setTimeout(() => {
            this._press();
        }, 500);
        // this._press();
    }
    _press = (event) => {
        // this.roomID.blur();
        this.setState({status: 'connect', info: 'Connecting'});
        join(this.state.roomID);
    }
    _switchVideoType = () => {
        const isFront = !this.state.isFront;
        this.setState({isFront});
        getLocalStream(isFront, function(stream) {
            if (localStream) {
                for (const id in pcPeers) {
                    const pc = pcPeers[id];
                    pc && pc.removeStream(localStream);
                }
                localStream.release();
            }
            localStream = stream;
            container.setState({selfViewSrc: stream.toURL(), isVideo: true });

            for (const id in pcPeers) {
                const pc = pcPeers[id];
                pc && pc.addStream(localStream);
            }
        });
    }
    receiveTextData = (data) => {
        const textRoomData = this.state.textRoomData.slice();
        textRoomData.push(data);
        this.setState({textRoomData, textRoomValue: ''});
    }
    _textRoomPress = () => {
        if (!this.state.textRoomValue) {
            return
        }
        const textRoomData = this.state.textRoomData.slice();
        textRoomData.push({user: 'Me', message: this.state.textRoomValue});
        for (const key in pcPeers) {
            const pc = pcPeers[key];
            pc.textDataChannel.send(this.state.textRoomValue);
        }
        this.setState({textRoomData, textRoomValue: ''});
    }
    _renderTextRoom = () => {
        return (
        <View style={styles.listViewContainer}>
            <ListView
                dataSource={this.ds.cloneWithRows(this.state.textRoomData)}
                renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
            />
            <TextInput
                style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
                onChangeText={value => this.setState({textRoomValue: value})}
                value={this.state.textRoomValue}
            />
            <TouchableOpacity
            onPress={this._textRoomPress}>
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
        );
    }
    // 免提
    _handleHandsFree = () => {
        console.log('免提')
    }
    // 挂断
    _handleHangUp = () => {
        console.log('挂断')
        socket.emit('leave', this.state.roomID);
        MediaStreamTrack.prototype.stop(this.state.roomID);
    }
    // 静音
    _handleMute = () => {
        console.log('静音')
    }
    _handleTabAudio = () => {
        console.log('切换语音')
    }
    render() {
        const { isVideo, selfViewSrc, status, remoteList } = this.state;
        console.log('state', this.state)
        return (
        <View style={styles.containerVideo}>
            {/* {this.state.textRoomConnected && this._renderTextRoom()} */}
            <View style={styles.listVideo}>
                {
                    mapHash(remoteList, function(remote, index) {
                        return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
                    })
                }
            </View>
            {
                isVideo ? 
                <RTCView streamURL={selfViewSrc} style={styles.selfView}/> :
                <Image source={require('../../../image/loginbg.jpg')} style={styles.image} resizeMode={"contain"} />
            }
            <Text style={{color: '#fff'}}>{this.state.info} --- {this.state.isFront ? "Use front camera" : "Use back camera"}</Text>
        
            {/* 拨打电话界面 */}
            {
                status === 'connect' ?
                <Connected
                    _handleHangUp={this._handleHangUp}
                    _handleTabAudio={this._handleTabAudio}
                    _handleTabCamera={this._switchVideoType}
                    {...this.state}
                    {...this.props}
                /> :
                <Call
                    _handleMute={this._handleMute}
                    _handleHangUp={this._handleHangUp}
                    _handleHandsFree={this._handleHandsFree}
                    _handleTabAudio={this._handleTabAudio}
                    {...this.state}
                    {...this.props}
                />
            }
         
        </View>
        );
    }
}

const styles = StyleSheet.create({
    containerVideo: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#1A1A1A',
        position: 'relative',
    },
    welcome: {
        margin: 10,
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
    },
    tabCamera: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    selfView: {
        position: 'absolute',
        width: window.width,
        height: window.height,
        backgroundColor: 'transparent'
    },
    image: {
        position: 'absolute',
        width: window.width,
        height: window.height,
    },
    listVideo: {
        position: 'absolute',
        bottom: 100,
        right: 0,
        // zIndex: 4,
        backgroundColor: 'red',
        width: window.windth,
        height: 180,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        transform: [{'translate':[0,0,1]}],
    },
    remoteView: {
        width: 160,
        height: 180,
        position: 'absolute',
        right: 0,
    },
    listViewContainer: {
        // height: 150,
    },
});

export default RCTWebRTC;

// import WebRTC from './rtc/App'
// export default WebRTC;