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

export default class PhotoList extends React.Component {
    static propTypes = {
        photoCategory: PropTypes.array,
        uris: PropTypes.array,
        allPhotos: PropTypes.array,
        _handleHidePhotoList: PropTypes.func,
    };
    constructor(props) {
       super(props);
       this.state = {
       };
     }
    render() {
        const { photoCategory, _handleHidePhotoList, uris, allPhotos } = this.props;
        console.log('allPhotos', allPhotos)
        const allList = [];
        photoCategory.forEach((item) => {
            allList.push(
                <TouchableOpacity
                    style={styles.list}
                    key={item.name}
                    onPress={() => _handleHidePhotoList(item.name)}
                >
                    <View style={styles.phone}>
                        <Image source={{uri: item.detail[0].image.uri}} style={styles.image} />
                        <Text style={styles.text}>{item.name} ({item.detail.length})</Text>
                    </View>
                    <Text style={styles.arrow}>&#xe63b;</Text>
                </TouchableOpacity>
            );
        })
        allList.unshift(
            <TouchableOpacity
                style={styles.list}
                key='所有图片'
                onPress={() => _handleHidePhotoList('all_photos')}
            >
                <View style={styles.phone}>
                    <Image source={{uri: allPhotos[0]}} style={styles.image} />
                    <Text style={styles.text}>{'所有图片'} ({allPhotos.length})</Text>
                </View>
                <Text style={styles.arrow}>&#xe63b;</Text>
            </TouchableOpacity>
        );
        return (
            <ScrollView style={styles.container}>
                {allList}
            </ScrollView>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        // flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        backgroundColor: '#ffffff',
        bottom: 0,
        top: 150,
        left: 0,
        right: 0,
        elevation: 5,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5
    },
    list:{
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
    },
    phone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    text: {
        marginLeft: 20,
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 28,
    },
});