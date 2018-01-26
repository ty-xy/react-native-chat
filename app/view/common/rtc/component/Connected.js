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
import { RTCView } from 'react-native-webrtc';

const styles = StyleSheet.create({
    connected: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    actions: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: 140,
        paddingBottom: 40,
    },
    actionDiv: {
        justifyContent: 'center',
    },
    callIcon: {
        fontSize: 36,
        color: '#fff',
        fontFamily: 'iconfont',
    },
    callText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    },
    iconDiv: {
        width: 70,
        height: 70,
        borderRadius: 35,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff'
    },
    avatarDiv: {
        marginTop: 30,
        marginRight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const Connected = ({ _handleHangUp, _handleTabAudio, _handleTabCamera, name, company }) => (
    <View style={styles.connected}>
        <TouchableOpacity
            style={styles.avatarDiv}
            onPress={_handleTabCamera}
        >
            <Text style={styles.callIcon}>&#xe642;</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    onPress={_handleTabAudio}
                    style={[styles.iconDiv]}
                >
                    <Text style={styles.callIcon}>&#xe658;</Text>                 
                </TouchableOpacity>
                <Text style={styles.callText}>切换语音聊天</Text>   
            </View>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    onPress={_handleHangUp}
                    style={[styles.iconDiv, { backgroundColor: '#EF5350', borderWidth: 0, borderColor: '#EF5350' }]}
                >
                    <Text style={[styles.callIcon, { transform: [{rotateZ: '135deg'}] }]}>&#xe640;</Text>
                </TouchableOpacity>
                <Text style={styles.callText}>挂断</Text>
            </View>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    style={styles.iconDiv}
                >
                    <Text style={styles.callIcon}>&#xe615;</Text>                   
                </TouchableOpacity>
                <Text style={styles.callText}>收起视频</Text> 
            </View>
        </View>
    </View>
);

export default Connected;