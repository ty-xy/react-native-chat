import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import emojis from '../../util/emoji';

export default class Emoji extends Component {
    static propTypes = {
        sendEmoji: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.files}>
                <View style={styles.emojiRow}>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('呲牙')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/呲牙.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('呆')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/呆.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('倒彩')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/倒彩.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('调皮')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/调皮.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('鼓掌')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/鼓掌.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('害羞')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/害羞.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('禁止烟火')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/禁止烟火.png')} /></View>
                    </TouchableHighlight>
                </View>
                <View style={styles.emojiRow}>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('开心')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/开心.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('哭')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/哭.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('酷')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/酷.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('流汗')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/流汗.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('难过')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/难过.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('你强')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/你强.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('色')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/色.png')} /></View>
                    </TouchableHighlight>
                    
                </View>
                <View style={styles.emojiRow}>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('生气')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/生气.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('胜利')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/胜利.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('偷笑')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/偷笑.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('微笑')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/微笑.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('晕')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/晕.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('再见')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/再见.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('赞')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/赞.png')} /></View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.emojiRow, { justifyContent: 'flex-start' }]}>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('注意安全')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/注意安全.png')} /></View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._handleClickEmoji('ok')} underlayColor="#ffffff" style={styles.emoji}>
                        <View style={styles.fujian}><Image style={styles.image} source={require('../../image/emoji/ok.png')} /></View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    files: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 5,
    },
    emojiRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // paddingTop: 5,
    },
    fujian: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    emoji: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,        
    },
    image: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
    }
});
