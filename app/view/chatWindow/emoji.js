import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
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
                {/* {
                    emojis.map(item => {
                        const uri = `../../image/emoji/${item}.png`;
                        const requireMethod = require;
                        return (
                            <TouchableHighlight
                                // onPress={() => this.props.showCamera(true)}
                                underlayColor="#ffffff"
                                key={item}
                            >
                                <View style={styles.fujian}>
                                    <Text>{uri}</Text>
                                    <Image source={require(uri)} style={{width: 44, height: 44}} />
                                </View>
                            </TouchableHighlight>  
                        );
                    })
                }    */}
                <TouchableHighlight
                    onPress={() => this.props.sendEmoji('呲牙')}
                    underlayColor="#ffffff"
                    // key={item}
                >
                    <View style={styles.fujian}>
                        <Image source={require('../../image/emoji/呲牙.png')} style={{width: 44, height: 44}} />
                    </View>
                </TouchableHighlight>
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
