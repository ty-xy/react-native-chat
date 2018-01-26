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

const styles = StyleSheet.create({
    call: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    actions: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: 140,
        marginBottom: 40,
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
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff'
    },
    avatarDiv: {
        marginTop: 30,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    status: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 56,
        width: 56,
        borderRadius: 28,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Call = ({ _handleMute, _handleHangUp, _handleHandsFree, _handleTabAudio, name, company }) => (
    <View style={styles.call}>
        <View style={styles.avatarDiv}>
            <Image source={require('../../../../image/Andy.png')} style={styles.avatar} />
            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 16, color: '#fff' }}>{name || '山东黄金'}</Text>
                <Text style={{ fontSize: 14, color: '#999' }}>{company || '中医小黄打多久'}</Text>
            </View>
        </View>
        <View style={styles.status}><Text style={{ color: '#fff', fontSize: 20 }}>等待对方接听...</Text></View>
        <View style={styles.tab}>
            <TouchableOpacity
                onPress={_handleTabAudio}
            >
                <Text style={[styles.callIcon, {textAlign: 'center', fontSize: 40}]}>&#xe658;</Text>
                <Text style={{ color: '#999', fontSize: 14 }}>切换为电话聊天...</Text>                
            </TouchableOpacity>
        </View>
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
                    onPress={_handleHandsFree}
                    style={styles.iconDiv}
                >
                    <Text style={styles.callIcon}>&#xe628;</Text>                   
                </TouchableOpacity>
                <Text style={styles.callText}>免提</Text> 
            </View>
        </View>
    </View>
);

export default Call;