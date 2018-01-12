import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Keyboard,
    TextInput,
    Platform,
    ToastAndroid,
    platform,
    ImageBackground,
    CameraRoll,
    NativeModules
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { observer, inject } from 'mobx-react/native';

import Message from './Message';
import Fujian from './Fujian';
import toast from '../../util/util'
import Camera from '../../component/Camera';
import Emoji from './emoji';



const messageList = [
    {key: 'sdghjdsk', name: '小明', chatType: 'me'},
    {key: 'sdg678sk', name: '小刘', chatType: 'qme'},
    {key: 'sdghj12sk', name: '小白', chatType: 'me'},   
    {key: 'sd23ghjdsk', name: '小明', chatType: 'qme'},
    {key: 'sd21g678sk', name: '小刘', chatType: 'me'},
    {key: '2sdghj12sk', name: '小白', chatType: 'mqe'},     
    {key: 'sdghcvjdsk', name: '小明', chatType: 'me'},
    {key: 'sdg673224f8sk', name: '小刘', chatType: 'mee'},
    {key: 'sdghj152sk', name: '小白', chatType: 'me'},  
    {key: 'sd211g678sk', name: '小刘', chatType: 'me'},
    {key: '2sdghj12123sk', name: '小白', chatType: 'mqe'},     
    {key: 'sdg342hcvjdsk', name: '小明', chatType: 'me'},
    {key: 'sdg67322eds4f8sk', name: '小刘', chatType: 'mee'},
    {key: 'sdghj15sdfsd2sk', name: '小郭', chatType: 'me'},  
];
let dateInOut = 0;



@inject('message')
@observer
export default class ChatWindow extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '李冰',
        headerStyle: {
            height: 49,
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            // alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'normal'
        },
        headerRight: (<Text style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe63a;</Text>)
    });
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            inputHeight: 36,
            keyboardHeight:0,
            sendButton: false, // 发送按钮显示
            showAudio: false, // 语音输入切换
            showEmoji: false, // 表情
            showFile: false, // 附件
            text: '',
        };
    }
    // componentWillMount () {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // }
    
    // componentWillUnmount () {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidShow = (e) => {
    //     this.setState({
    //         keyboardHeight: e.endCoordinates.height,
    //         sendButton: true,
    //     })
    // }

    // _keyboardDidHide = (e) => {
    //     if (this.state.keyboardHeight) {
    //         this.setState({
    //             keyboardHeight: 0,
    //             sendButton: false,
    //             inputHeight: 154
    //         })
    //     } else {
    //         this.setState({
    //             keyboardHeight: 0,
    //             sendButton: false
    //         })
    //     }
    // }
    _onContentSizeChange = (event) => {
        this.setState({inputHeight: event.nativeEvent.contentSize.height});
    }
    // 底部加载显示
    _renderPullBottom = () => {
        let el = null;
        return (<Text style={styles.pullUp}>~~我们是有底线的~~</Text>);
    }
    // 输入框获得焦点
    _onFocus = () => {
        console.log('_onFocus')
        this.setState({ sendButton: true });
    }
    _onBlur = () => {
        console.log('state', this.state)
        this.setState({ sendButton: false });
    }
    // 输入文字
    _inputChange = (text) => {
        this.setState({ text });
    }
    // 发送消息
    _handleSendMsg = () => {
        const { text } = this.state;
        if (text.length === 0) {
            toast.toast('输入内容为空', this);
        }
        console.log('_handleSendMsg', text)
    }
    // 发送语音
    _handleSendAudio = () => {
        console.log('obj_handleSendAudioect')
    }
    _handlePressIn = () => {
        dateInOut = new Date().valueOf();
    }
    _handlePressOut = () => {
        // dateInOut = new Date().valueOf();
        const date = (new Date().valueOf() - dateInOut) / 1000;
        if (date > 1) {
            this._handleSendAudio();
            console.log('发送录音')
        } else {
            toast.toast('时间太短', this);
        }
    }
    // 发送按钮
    _sendButton = () => {
        const { sendButton } = this.state;
        if (sendButton) {
            return (
                <TouchableOpacity
                    style={styles.sendbutton}
                    onPress={this._handleSendMsg}
                >
                    <Text style={{color: '#29B6F6', fontSize: 16}}>发送</Text>
                </TouchableOpacity>
            );
        }
        return <Text style={[styles.iconfont, {marginRight: 0, marginLeft: 0}]} onPress={this._handleFile}>&#xe62f;</Text>;
    }

    // 语音切换
    _auditTabInputIcon = () => {
        const { showAudio } = this.state;
        if (!showAudio) {
            return <Text style={styles.iconfont} onPress={this._handleTabAudio}>&#xe63e;</Text>;            
        }
        return <Text style={styles.iconfont} onPress={this._handleTabAudio}>&#xe632;</Text>;
    }
    // 语音切换点击
    _handleTabAudio = () => {
        this.setState({ showAudio: !this.state.showAudio, sendButton: false, showEmoji: false, showFile: false });
    }
    _auditTabInput = () => {
        const { showAudio, height, text } = this.state;
        if (showAudio) {
            return (
                <TouchableOpacity
                    style={styles.inputAudit}
                    // onPress={this._handleSendMsg}
                    onPressIn={this._handlePressIn}
                    onPressOut={this._handlePressOut}
                >
                    <Text style={{color: '#999999'}}>按住 说话</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TextInput
                multiline
                maxLength={255}
                placeholder='说点什么'
                placeholderTextColor='#D1D1D1'
                underlineColorAndroid='transparent'
                style={[styles.input, {height}]}
                onChangeText={this._inputChange}
                value={text}
                onContentSizeChange={this._onContentSizeChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                ref={i => this.content = i}
            />
        );
    }
    // 表情按钮
    _emojiButton = () => {
        const { showEmoji } = this.state;
        if (showEmoji) {
            return (<Text onPress={this._hideEmoji} style={[styles.iconfont, {marginLeft: 10}]}>&#xe632;</Text>);
        }
        return (<Text onPress={this._showEmoji} style={[styles.iconfont, {marginLeft: 10}]}>&#xe631;</Text>);
    }
    _showEmoji = () => {
        this.content.blur();
        this.setState({ showEmoji: true, showFile: false, inputHeight: 154 });
    }
    _hideEmoji = () => {
        this.content.focus();
        this.setState({ showEmoji: false, showFile: false, inputHeight: 36  });
    }
    // 表情列表
    _emojiList = () => {
        const { showEmoji } = this.state;
        if (showEmoji) {
            return (
                <View style={styles.emoji}>
                    <Emoji sendEmoji={this.sendEmoji} />
                </View>
            );
        }
        return null;
    }
    // 发送表情
    sendEmoji = (name) => {
        console.log('name', name)
    }
    // 添加附件
    _handleFile = () => {
        this.setState({ showFile: !this.state.showFile, showEmoji: false, inputHeight: this.state.showFile ? 36 : 154 });
    }
    
    _fileList = () => {
        const { showFile } = this.state;
        if (showFile) {
            return (
                <Fujian showCamera={this.showCamera} />
            );
        }
        return null;
    }
    // 激活相机
    showCamera = (bool) => {
        console.log('showCamera', bool)
        const { navigation } = this.props;
        // this.setState({ showCamera: bool });
        var _that = this;
        // NativeModules.HeadImageModule.callCamera();
        var rnToastAndroid = NativeModules.ToastByAndroid;
        CameraRoll.getPhotos({
            first: 200, //参数 获取最近五张图片
            // groupTypes: 'All',
            // assetType: 'Photos'
        }).done( 
            function (data) { //成功的回调     
                console.log(data);    
                const edges = data.edges;   
                const photos = [];  
                const uris = [];
                for (var i in edges) { 
                    photos.push(edges[i].node);  
                    uris.push(edges[i].node.image.uri);
                }
                const _photos = toast.photoCategory(photos);
                console.log('_photos', _photos, uris)
                navigation.navigate('SelectImage', { photos: _photos || {}, uris });
            },         
            function (error) { //失败的回调
                console.log(error.message);
            }
        )
    }
    // 点击其他地方关闭附件
    closeFujian = () => {
        console.log('closeFujian')
    }
    _keyExtractor = (item, index) => item.key;
    render() {
        const { inputHeight, inputFocus, sendButton, keyboardHeight, showCamera } = this.state;
        const height = inputHeight < 30 ? 36 : inputHeight;
        const focusFlatList = inputFocus ? ({marginBottom: 120}) : ({});
        return (
            <View style={styles.window}>
                <FlatList
                    style={[styles.chatWindow, focusFlatList]}
                    data={messageList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <Message {...item} />}
                    ListEmptyComponent={() => this._renderPullBottom()}
                    ListFooterComponent={() => <View style={{height: 15}} />}
                    ref={i => this._chatList = i}
                />
                <View style={[styles.enterCard, {height: height + 13}]}>
                    <View style={styles.enterInput}>
                        {this._auditTabInputIcon()}
                        {this._auditTabInput()}
                        {this._emojiButton()}
                        {this._sendButton()}
                    </View>
                    {this._emojiList()}
                    {this._fileList()}
                </View>
                <Toast
                    style={{borderRadius: 20, paddingTop: 10, paddingBottom: 10}}
                    ref={i => this.toast = i}
                    position='bottom'
                    positionValue={200}
                    opacity={0.8}
                />
                {/* 相机 */}
                {showCamera ? <Camera /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        position: 'relative',
        zIndex: 0,
    },
    chatWindow: {
        flex: 1,
        backgroundColor: '#F6F6F6',
    },
    pullUp: {
        flex: 1,
        justifyContent: 'center',
        color: '#ADADAD',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    enterCard: {
        maxHeight: 150,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        paddingTop: 2,
        paddingLeft: 15,
        paddingRight: 15,
        // paddingTop: 5,
        // paddingBottom: 5,
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    emoji: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    enterInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        maxHeight: 127,
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 4,
        paddingTop: Platform.OS === 'ios' ? 10 : 2,
        paddingBottom: Platform.OS === 'ios' ? 10 : 2,
        // alignSelf: 'center'
        alignItems: 'center',
        
    },
    inputAudit: {
        // height: 30,
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 4,
        paddingTop: Platform.OS === 'ios' ? 10 : 6,
        paddingBottom: Platform.OS === 'ios' ? 10 : 6,
        alignItems: 'center',
    },
    iconfont: {
        fontFamily: 'iconfont',
        color: '#29B6F6',
        fontSize: 24,
        marginRight: 15,
        alignSelf: 'flex-end',
        margin: 10,
    },
    sendbutton: {
        
    },
});
