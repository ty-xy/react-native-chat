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
        // backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    actions: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: 160,
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
    },
    avatarDiv: {
        marginTop: 30,
        marginLeft: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    status: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Accept = ({ _handleHangUp, _handleAccept, _handleTabAudio, name, company, avatar }) => (
    <View style={styles.call}>
        <View style={styles.avatarDiv}>
            <Image source={require('../../../../image/Andy.png')} style={styles.avatar} />
            <Text style={{ fontSize: 16, color: '#fff', marginTop: 10 }}>{name || '山东黄金'}</Text>
            {/* <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 16, color: '#fff' }}>{name || '山东黄金'}</Text>
                <Text style={{ fontSize: 14, color: '#fff' }}>{company || '中医小黄打多久'}</Text>
            </View> */}
        </View>
        <View style={styles.status}><Text style={{ color: '#fff', fontSize: 20 }}>{name}周工邀请您进行视频聊天...</Text></View>
        <View style={styles.tab}>
            <TouchableOpacity
                onPress={_handleTabAudio}
            >
                <Text style={[styles.callIcon, {textAlign: 'center', fontSize: 40}]}>&#xe658;</Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>切换为电话聊天...</Text>                
            </TouchableOpacity>
        </View>
        <View style={styles.actions}>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    onPress={_handleHangUp}
                    style={[styles.iconDiv, { backgroundColor: '#EF5350', borderWidth: 0, borderColor: '#EF5350' }]}
                >
                    <Text style={[styles.callIcon, { transform: [{rotateZ: '135deg'}] }]}>&#xe640;</Text>
                </TouchableOpacity>
                <Text style={styles.callText}>取消</Text>
            </View>
            <View style={styles.actionDiv}>
                <TouchableOpacity
                    onPress={_handleAccept}
                    style={[styles.iconDiv, { backgroundColor: '#7CB342' }]}
                >
                    <Text style={styles.callIcon}>&#xe640;</Text>                   
                </TouchableOpacity>
                <Text style={styles.callText}>接听</Text> 
            </View>
        </View>
    </View>
);

export default Accept;