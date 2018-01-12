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
        showCamera: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        console.log('fujian', this.props)
        return (
            <View style={styles.files}>
                <TouchableHighlight
                    onPress={() => this.props.showCamera(true)}
                    underlayColor="#ffffff"
                >
                    <View style={styles.fujian}>
                        <Image source={require('../../image/photo.png')} style={{width: 44, height: 44}} />
                        <Text>照片</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.fujian}>
                    <Image source={require('../../image/location.png')} style={{width: 44, height: 44}} />
                    <Text>位置</Text>
                </View>
                <View style={styles.fujian}>
                    <Image source={require('../../image/cardcase.png')} style={{width: 44, height: 44}} />
                    <Text>名片</Text>
                </View>
                <View style={styles.fujian}>
                    <Image source={require('../../image/file.png')} style={{width: 44, height: 44}} />
                    <Text>文件</Text>
                </View>        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    files: {
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        height: 60
    },
    fujian: {
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center'
    }
});