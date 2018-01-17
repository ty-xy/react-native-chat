// FadeInView.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
  StatusBar
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class PreviewImg extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '',
        headerLeft: null,
        headerRight: null,
    }
    static propTypes = {
        _handleHidePhotoList: PropTypes.func,
    };
    constructor(props) {
       super(props);
       this.state = {
            comfirmImg: [],
            show: true,
            index: 1
       };
    }
    componentWillMount() {
        const { state = {} } = this.props.navigation;
        const selectedImg = state.params && state.params.selectedImg || [];
        const comfirmImg = [];
        selectedImg.forEach((uri) => {
            comfirmImg.push({ uri, seleted: true });
        });
        this.setState({ comfirmImg, footerSelect: comfirmImg[0].uri });
    }
    show = () => {
        this.setState({ show: !this.state.show });
    }
    // 选中切换
    _isSelectedImg = () => {
        const { footerSelect } = this.state;
        const { comfirmImg } = this.state;
        const newComfirmImg = [];
        comfirmImg.forEach((item) => {
            if (item.uri === footerSelect) {
                item.seleted = !item.seleted;
            }
            newComfirmImg.push(item);
        });
        // if (comfirmImg.indexOf(footerSelect) > -1) {
        //     comfirmImg.splice(comfirmImg.indexOf(footerSelect), 1)
        // } else {
        //     comfirmImg.push(footerSelect);
        // }
        this.setState({ comfirmImg: newComfirmImg });
    }
    // 选中提交
    _handleImgSelected = () => {
        console.log('_handleImgSelected')
    }
    // 滑动切换
    _onMomentumScrollEnd = (e, state) => {
        const { index } = state;
        const { comfirmImg } = this.state;
        this.setState({
            footerSelect: comfirmImg[index].uri,
            index
        });
    }
    // 图片选择返回聊天页面
    _goChatWindow = () => {
        // console.log('_goChatWindow', this.state.selectedImg);
        const { comfirmImg } = this.state;
        const { navigation } = this.props;
        const selectedImg = [];
        comfirmImg.forEach((item) => {
            if (item.seleted) {
                selectedImg.push(item.uri);
            }
        });
        navigation.navigate('ChatWindow', { selectedImg });
    }
    _goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        const { show, selected_, comfirmImg, footerSelect, index } = this.state;
        // console.log('propsImg', comfirmImg)
        let isSeleted = '';
        let seleteNum = 0;
        for(let i = 0; i < comfirmImg.length; i ++) {
            if (comfirmImg[i].uri === footerSelect) {
                isSeleted = comfirmImg[i].seleted;
            }
            if (comfirmImg[i].seleted) {
                seleteNum ++;
            }
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {show ? <View
                    activeOpacity={1}
                    style={styles.header}
                >
                    <Text style={[styles.arrow, { fontFamily: 'iconfont', fontSize: 18 }]} onPress={this._goBack}>&#xe63c;</Text>
                    <Text style={styles.arrow}>{index + 1} / {comfirmImg.length}</Text>
                    <Text onPress={this._handleImgSelected} style={styles.button} onPress={this._goChatWindow}>确定{seleteNum} / 9</Text>
                </View> : null}
                <Swiper
                    style={styles.wrapper}
                    showsButtons={true}
                    showsPagination={false}
                    nextButton={<View />}
                    prevButton={<View />}
                    onMomentumScrollEnd={(e, state, context) => this._onMomentumScrollEnd(e, state)}
                >
                    {
                        comfirmImg.map(item => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.slide1}
                                key={item.uri}
                                onPress={this.show}
                            >
                                <Image source={{uri: item.uri}} style={styles.image} />
                            </TouchableOpacity>
                        ))
                    }
                </Swiper>
                
                {show ? 
                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.footerChoose}
                        onPress={this._isSelectedImg}
                    >
                        <Text style={styles.text}>选择</Text>
                        {isSeleted ?
                            <View style={styles.selectedIconView}><Text style={styles.selectedIcon}>&#xe63f;</Text></View>
                            : <View style={styles.selectCircle} />}
                    </TouchableOpacity>
                </View> : null}
            </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: Dimensions.get('window').width,
        height: 260
    },
    header: {
        backgroundColor: '#282828',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 10,
        zIndex: 1,
        alignItems: 'center'
    },
    arrow: {
        fontSize: 18,
        color: '#ffffff',
    },
    button: {
        fontSize: 14,
        color: '#ffffff',
        backgroundColor: '#29B6F6',
        borderRadius: 4,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        
    },
    wrapper: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#282828',
    },
    footerChoose: {
        flexDirection: 'row-reverse',
        alignItems: 'center',

    },
    selectCircle: {
        borderColor: '#ffffff',
        borderWidth: 1,
        marginTop: 4,
        width: 22,
        height: 22,
        borderRadius: 11,
    },
    selectedIconView: {
        backgroundColor: 'transparent',
        height: 22, 
        width: 22,
        borderRadius: 11,
    },
    selectedIcon: {
        color: '#29B6F6',
        fontFamily: 'iconfont',
        fontSize: 22,
    },
    text: {
        fontSize: 20,
        color: '#ffffff',
        paddingRight: 20,
        paddingLeft: 10,
    },
});