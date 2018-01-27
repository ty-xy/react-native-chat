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
        backgroundColor: 'transparent'
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
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    status: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AudioConnect = ({ _handleHangUp, _handleMute, _handleHandsFree, name, company, avatar }) => (
    <View style={styles.connected}>
        <View style={styles.avatarDiv}>
            <Image source={require('../../../../image/Andy.png')} style={styles.avatar} />
            <Text style={{ fontSize: 16, color: '#fff', marginTop: 10 }}>{name || '山东黄金'}</Text>
        </View>
        <View style={styles.status}><Text style={{ color: '#fff', fontSize: 20 }}>{name}00:00:04</Text></View>
        <View style={styles.actions}>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    onPress={_handleMute}
                    style={[styles.iconDiv]}
                >
                    <Text style={styles.callIcon}>&#xe60a;</Text>                 
                </TouchableOpacity>
                <Text style={styles.callText}>静音</Text>   
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
                    onPress={_handleHandsFree}
                >
                    <Text style={styles.callIcon}>&#xe628;</Text>                   
                </TouchableOpacity>
                <Text style={styles.callText}>免提</Text> 
            </View>
        </View>
    </View>
);

export default AudioConnect;