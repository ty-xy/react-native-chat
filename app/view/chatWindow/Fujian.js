import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

export default class Fujian extends Component {
    static propTypes = {
        showCamera: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // 地理位置
    _showGeolocation = () => {
        this.props.navigation.navigate('Geolocation');
    }
    // 发送名片
    _sendCardcase = () => {
        this.props.navigation.navigate('Love', { cardCase: true });
    }
    _sendRtc = () => {
        this.props.navigation.navigate('RTC', { callId: this.props.to, send: false });
    }
    render() {
        // console.log('fujian', this.props)
        return (
            <View style={styles.files}>
                <View style={styles.row}>
                    <TouchableHighlight
                        onPress={() => this.props.showCamera(true)}
                        underlayColor="#ffffff"
                    >
                        <View style={styles.fujian}>
                            <Image resizeMode='contain' source={require('../../image/photo.png')} style={{width: 44, height: 44}} />
                            <Text style={styles.text}>照片</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this._showGeolocation}
                        underlayColor="#ffffff"
                    >
                        <View style={styles.fujian}>
                            <Image resizeMode='contain' source={require('../../image/location.png')} style={{width: 44, height: 44}} />
                            <Text style={styles.text}>位置</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this._sendCardcase}
                        underlayColor="#ffffff"
                    >
                        <View style={styles.fujian}>
                            <Image resizeMode='contain' source={require('../../image/cardcase.png')} style={{width: 44, height: 44}} />
                            <Text style={styles.text}>名片</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.fujian}>
                        <Image resizeMode='contain' source={require('../../image/file.png')} style={{width: 44, height: 44}} />
                        <Text style={styles.text}>文件</Text>
                    </View>  
                </View>     
                <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                    <TouchableHighlight
                        onPress={this._sendRtc}
                        underlayColor="#ffffff"
                    >
                        <View style={styles.fujian}>
                            <Image resizeMode='contain' source={require('../../image/videoChat.png')} style={{ width: 44, height: 44,  }} />
                            <Text style={styles.text}>视频</Text>
                        </View>
                    </TouchableHighlight>
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    files: {
        justifyContent: 'space-around',
        // width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        flexDirection: 'column',
        height: 200,
    },
    row: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    fujian: {
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#666',
        marginTop: 5
    }
});
