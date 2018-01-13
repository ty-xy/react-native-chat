// FadeInView.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

export default class PreviewImg extends React.Component {
    static propTypes = {
        photoCategory: PropTypes.array,
        _handleHidePhotoList: PropTypes.func,
    };
    constructor(props) {
       super(props);
       this.state = {
       };
    }
    render() {
        const { state = {} } = this.props.navigation;
        const selectedImg = state.params && state.params.selectedImg || [];
        console.log('Preview', selectedImg)
        return (
            <View style={styles.container}>
                {
                    selectedImg.map(item => (
                        <View
                            style={styles.list}
                            key={item}
                        >
                            <Image source={{uri: item}} style={styles.image} />
                        </View>
                    ))
                }
            </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000',
    },
    list:{
        flex: 1,
        // width: Dimensions.get('window').width,
    },
    phone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    text: {
        marginLeft: 20,
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 28,
    },
});