import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, BackAndroid, ToastAndroid, Platform } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import Thumbnails from "./components/Thumbnails.js";
import FullScreenVideo from "./components/FullScreenVideo.js";
import Commons from "./lib/commons.js";

import styles from "./style/app.js";

const sampleStreamURLs = [
  require("../image/sample-image-1.jpg"),
  require("../image/sample-image-2.jpg"),
  require("../image/sample-image-3.jpg")
]

const backgroundImage= require("../image/IMG_0187.jpg");

const FRONT_CAMERA = true;
const webRTCServices = require("./lib/services.js");
const VIDEO_CONFERENCE_ROOM = "video_conference";

const SELF_STREAM_ID = "self_stream_id";

export default class App extends Component {
    static navigationOptions = (navigation) => ({
        // title: '视频',
        header: null,
        // headerStyle: {
        //     height: 49,
        //     backgroundColor: '#fff',
        // },
        // headerTitleStyle: {
        //     alignSelf: 'center',
        //     fontSize: 16,
        //     fontWeight: 'normal'
        // },

    });
    constructor(props) {
        super(props);
        this.state = {
            activeStreamId: null,
            //streamURLs: sampleStreamURLs,
            streams: [], //list of (id, url: friend Stream URL). Id = socketId
            joinState: "ready", //joining, joined
            name: "test"
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }
    componentDidMount() {
        // 本地视频流获取
        webRTCServices.getLocalStream(true, (stream) => {
            console.log('stream', stream)
            this.setState({
                activeStreamId: stream.id,
                streams: [{
                    id: stream.id,
                    url: stream.toURL()
                }]
            })
        });
    }
    handleBackButton = () => {
        for (let i = this.handlers.length - 1; i >= 0; i--) {
            if (this.handlers[i]()) {
                return true;
            }
        }//指定页面特殊处理
        const routers = this.props.navigation.getCurrentRoutes();
        if (routers.length > 1) {
            this.navigator.pop();
            return true;
        }
        let now = new Date().getTime();
        if (now - lastClickTime < 2500) {
        //2.5秒内点击后退键两次推出应用程序
            return false;//控制权交给原生
        }
        lastClickTime = now;
        ToastAndroid.show('再按一次退出一个',ToastAndroid.SHORT);
        return true;
    }
    renderJoinContainer() {
        if(this.state.joinState != "joined") {
        return <View style={styles.joinContainer}>
            <Text style={styles.joinLabel}>Be the first to join this conversation</Text>
            <TextInput style={styles.joinName}
                placeholder={"Enter your name"} placeholderTextColor={"#888"}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
            />
            <TouchableHighlight style={styles.joinButton}
                onPress={this.handleJoinClick.bind(this)}
            >
                <Text style={styles.joinButtonText}>{this.state.joinState == "ready" ? "Join" : "Joining..."}</Text>
            </TouchableHighlight>
        </View>
        }
        return null;
    }

    handleSetActive(streamId) {
        this.setState({
            activeStreamId: streamId
        });
    }

    handleJoinClick() {
        if(this.state.name.length == 0 || this.state.joinState != "ready") {
            return;
        }
        //ELSE:
        this.setState({
            joinState: "joining"
        });
        let callbacks = {
            joined: this.handleJoined.bind(this),
            friendConnected: this.handleFriendConnected.bind(this),
            friendLeft: this.handleFriendLeft.bind(this),
            dataChannelMessage: this.handleDataChannelMessage.bind(this)
        }
        webRTCServices.join(VIDEO_CONFERENCE_ROOM, this.state.name, callbacks);
    }

    //----------------------------------------------------------------------------
    //  WebRTC service callbacks
    handleJoined() {
        console.log("Joined");
        this.setState({
            joinState: "joined"
        });
    }

    handleFriendLeft(socketId) {
        let newState = {
            streams: this.state.streams.filter(stream => stream.id != socketId)
        }
        if(this.state.activeStreamId == socketId) {
            newState.activeStreamId = newState.streams[0].id;
        }
        this.setState(newState);
    }

    handleFriendConnected(socketId, stream) {
        this.setState({
        streams: [
            ...this.state.streams,
            {
            id: socketId,
            url: stream.toURL()
            }
        ]
        })
    }

  handleDataChannelMessage(message) {

  }
  render() {
    let activeStreamResult = this.state.streams.filter(stream => stream.id == this.state.activeStreamId);
    console.log('activeStreamResult', this.props, activeStreamResult, this.state.streams, this.state.joinState)
    return (<View style={styles.container}>
                <Image source={backgroundImage} blurRadius={3} style={styles.backgroundImage}/>
                <View style={styles.backgroundOverlay} />
                {
                    this.state.joinState == "joined" ?
                    <FullScreenVideo streamURL={activeStreamResult.length > 0 ? activeStreamResult[0].url : null} />
                    :
                    null
                }
                {
                    this.state.joinState == "joined"?
                    <Thumbnails
                        streams={this.state.streams}
                        setActive={this.handleSetActive.bind(this)}
                        activeStreamId={this.state.activeStreamId}
                    />
                    :
                    null
                }
                {this.renderJoinContainer()}
        </View>
    );
  }
}
