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
    NativeModules,
    Dimensions,
    BackHandler
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { observer, inject } from 'mobx-react/native';
import Meteor from 'react-native-meteor';

import Message from './Message';
import Fujian from './Fujian';
import toast from '../../util/util'
import _navigation from '../../util/navigation'
import Emoji from './emoji';
import AertSelecte from '../../component/AertSelecte';
import Modal from '../../component/Modal';
import MeteorContainer from '../../component/MeteorContainer';
import PopulateUtil from '../../util/populate';
import format from 'date-format';



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
const selectedArr = ["拍照", "图库"];

const navigationOptions = (navigation) => ({
    title: navigation.state.params.name,
    tabBarLabel: '联系人',
    headerStyle: {
        height: 49,
        backgroundColor: '#fff',
    },
    headerTitleStyle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'normal'
    },
    headerRight: (<Text style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe63a;</Text>)
});

const subCollection = () => (navigation) => {
    Meteor.subscribe('message');
    Meteor.subscribe('group');
    Meteor.subscribe('files');
    Meteor.subscribe('users');
    const { to } = navigation.state.params || {};
    const chatGroup = Meteor.collection('group').findOne({ _id: to }) || {};
    // console.log('subCollection', navigation, to)
    const files =  Meteor.collection('messages').find({ groupId: to, type: 'file' }, { sort: { createdAt: -1 } }).map(msg => PopulateUtil.file(msg.content));
    if (files[0]) {
        files.forEach((d, i, data) => {
            d.showYearMonth = false;
            d.fileFrom = PopulateUtil.user(d.from).profile.name;
            if (i) {
                const prev = data[i - 1];
                d.showYearMonth = format('yyyy-MM', d.createdAt) !== format('yyyy-MM', prev.createdAt);
            } else {
                d.showYearMonth = true;
            }
        });
    }
    const messages =  Meteor.collection('messages').find({ groupId: to }, { sort: { createdAt: -1 }, limit: 20 }).reverse();
    messages.forEach((d, i, data) => {
        d.readed = d.readedMembers && d.readedMembers.includes(Meteor.userId());
        d.showYearMonth = false;

        if (i) {
            const prev = data[i - 1];
            d.showYearMonth = (prev.createdAt.getTime() - d.createdAt.getTime()) > 2 * 60 * 1000;
        } else {
            d.showYearMonth = true;
        }
    });
    return {
        messages,
        to,
        chatUser:  Meteor.collection('users').findOne({ _id: Meteor.userId() }) || {},
        chatGroup,
        files,
        users: Meteor.collection('users').find(),
    };
}


// @inject('message')
// @observer
class ChatWindow extends Component {

    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            footerHeight: 70,
            keyboardHeight:0,
            sendButton: false, // 发送按钮显示
            showAudio: false, // 语音输入切换
            showEmoji: false, // 表情
            showFile: false, // 附件
            content: '',
            selectCamera: false,  // 相册选择
            cardcaseVisible: false,
            animationType: false,
            transparent: true,
        };
    }
    componentWillMount () {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        // if (Platform.OS === 'android') {
            // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }
    componentDidMount() {
        const { navigation } = this.props;
        // navigation.setParams({
        //     _goChat: () => this._goChat(),
        // });
        if (navigation.state.params && navigation.state.params.cardCase) {
            this.setState({ cardcaseVisible: true });
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        const nav = this.props.navigation;
        if (nav.state.routeName === "ChatWindow" && nav.state.params.index) {
            // console.log('nav', nav)
            _navigation.reset(nav, 'HomeScreen')
            return true;
        }
        return false;
    }
    // 返回首页
    _goChat =() => {
        const { navigation } = this.props;
        navigation.navigate('Home');
    }
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
    //             inputHeight: 300
    //         })
    //     } else {
    //         this.setState({
    //             keyboardHeight: 0,
    //             sendButton: false
    //         })
    //     }
    // }
    _onContentSizeChange = (event) => {
        this.setState({inputHeight: event.nativeEvent.contentSize.height + 146});
    }
    // 底部加载显示
    _renderPullBottom = () => {
        let el = null;
        return (<Text style={styles.pullUp}>~~我们是有底线的~~</Text>);
    }
    // 输入框获得焦点
    _onFocus = () => {
        this.setState({ sendButton: true });
    }
    _onBlur = () => {
        this.setState({ sendButton: false });
    }
    // 输入文字
    _inputChange = (content) => {
        this.setState({ content });
    }
    // 发送消息
    _handleSendMsg = () => {
        const { content } = this.state;
        if (content.length === 0) {
            toast.toast('输入内容为空', this);
        } else {
            const { chatGroup } = this.props;
            const { members = [], type } = chatGroup;
            const resMes = { content, chatType: type, type: 'text', to: [] };
            resMes.groupId = chatGroup._id;
            members.forEach((userId) => {
                const user = { userId };
                if (userId === Meteor.userId()) {
                    user.isRead = true;
                }
                resMes.to.push(user);
            });
            Meteor.call('addChatlist', chatGroup._id, members.filter(value => value !== Meteor.userId())[0], (err) => {
                // toast.toast(err, this);
            });
            Meteor.call(
                'insertMessage',
                {
                    ...resMes,
                },
                (err, res) => {
                    if (err) {
                        toast.toast(err, this);
                    } else {
                        this.setState({ content: '' });
                        this.content.focus();
                    }
                });
        }
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
        } else {
            toast.toast('时间太短', this);
        }
    }
    // 发送表情包
    _handleClickEmoji = (name) => {
        console.log('发送表情包')
    }
    // 发送按钮
    _sendButton = () => {
        const { sendButton } = this.state;
        const marginBottom = Platform.OS === 'ios' ? { marginBottom: 12 } : { marginBottom: 8 };
        if (sendButton) {
            return (
                <TouchableOpacity
                    style={styles.sendbutton}
                    onPress={this._handleSendMsg}
                >
                    <Text style={[marginBottom, {color: '#29B6F6', fontSize: 16 }]}>发送</Text>
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
        const { showAudio, height, content } = this.state;
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
                value={content}
                // onContentSizeChange={this._onContentSizeChange}
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
        this.setState({ showEmoji: true, showFile: false, footerHeight: 270 });
    }
    _hideEmoji = () => {
        this.content.focus();
        this.setState({ showEmoji: false, showFile: false, footerHeight: 70  });
    }
    // 表情列表
    _emojiList = () => {
        const { showEmoji } = this.state;
        if (showEmoji) {
            return (
                <Emoji sendEmoji={this.sendEmoji} _handleClickEmoji={this._handleClickEmoji} />
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
        this.setState({ showFile: !this.state.showFile, showEmoji: false, footerHeight: this.state.showFile ? 70 : 180 });
    }
    
    _fileList = () => {
        const { showFile } = this.state;
        if (showFile) {
            return (
                <Fujian showCamera={this._showAlertSelected} {...this.props} />
            );
        }
        return null;
    }
    // 选择相机还是相册select
    _handleSelectCamera = () => {
        this.setState({ selectCamera: true });
    }
    // 激活相册
    _showPhotoList = (bool) => {
        const { navigation } = this.props;
        navigation.navigate('SelectImage');
    }
    // 激活相机
    _showCamera = () => {
        this.props.navigation.navigate('Camera');
    }
    // 点击其他地方关闭附件
    _closeFujian = () => {
        console.log('closeFujian')
    }
    // 选择照相
    _showAlertSelected = () => {
        this.dialog.show("请选择照片", selectedArr, '#333333', this.callbackSelected);
    }
    // 选择相册后的回调
    callbackSelected = (i) => {
        switch (i){
            case 0: // 拍照
                this._showCamera();
                break;
            case 1: // 图库
                this._showPhotoList();
                break;
        }
    }

    // 名片发送
    _handleSendCardcase = () => {
        console.log('发送名片')
    }
    // model关闭
    _setModalVisible = (cardcaseVisible) => {
        this.props.navigation.setParams({
            cardCase: false,
        });
        this.setState({ cardcaseVisible });
    }
    _modalCardcase = () => {
        const { cardcaseVisible, animationType, transparent } = this.state;
        const { params } = this.props.navigation.state;
        // console.log('params.avatar', params.avatar)
        // cardcaseVisible, footer, headerText, headerTextAlign, _handleSend, _setModalVisible
        return (
            <Modal
                cardcaseVisible={cardcaseVisible}
                footer={null}
                headerText='发送该名片：'
                headerTextAlign='flex-start'
                _handleSend={this._handleSendCardcase}
                _setModalVisible={this._setModalVisible}
            >
                <View style={styles.modalBodyContent}>
                    <View style={styles.avatar}>
                        {params.avatar && <Image source={require('../../image/beautiful.png')} style={{ height: 42, width: 42 }} />}
                        <Text style={{ color: '#4a4a4a', paddingLeft: 10 }}>{params.name}</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        const { inputHeight, inputFocus, sendButton, keyboardHeight, showCamera, footerHeight } = this.state;
        const height = (inputHeight < 51) ? 50 : inputHeight;
        const flatListfooterStyle = { height: 10 };
        const { messages } = this.props;
        // console.log('chatwindow-props', this.props, this.content)
        return (
            <View style={styles.window}>
                <FlatList
                    style={[styles.chatWindow]}
                    data={messages}
                    keyExtractor={(item) => (item._id)}
                    renderItem={({item}) => <Message {...item} {...this.props} />}
                    ListEmptyComponent={() => this._renderPullBottom()}
                    ListFooterComponent={() => <View style={flatListfooterStyle} />}
                    ref={i => this._chatList = i}
                />
                <View style={[styles.enterCard]}>
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
                    positionValue={300}
                    opacity={0.8}
                />
                <AertSelecte ref={ i => this.dialog = i } />
                {this._modalCardcase()}
            </View>
        );
    }
}

export default MeteorContainer(navigationOptions, subCollection())(ChatWindow);


const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        position: 'relative',
        // zIndex: -1,
    },
    chatWindow: {
        flex: 1,
        backgroundColor: '#f6f6f6',
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
        // position: 'absolute',
        // bottom: 10,
        // left: 0,
        // right: 0,
        // zIndex: 0,
        // flex: 1,
        minHeight: 49,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        marginRight: 15,
        marginLeft: 15,
        marginTop: 1,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
        // alignItems: 'flex-start',
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 20 },
        shadowColor:'black',
        shadowOpacity: 0.8,
        shadowRadius: 30,
        // elevation: 2.5  // 导致zIndex错乱
    },
    enterInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    input: {
        maxHeight: 127,
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 4,
        paddingTop: Platform.OS === 'ios' ? 12 : 6,
        paddingBottom: Platform.OS === 'ios' ? 12 : 6,
        paddingLeft: 4,
        paddingRight: 4,
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
        marginRight: 10,
        alignSelf: 'flex-end',
        marginBottom: 7,
    },
    sendbutton: {
        alignSelf: 'flex-end',
    },
    selectPhoto: {
        flex: 1,
        backgroundColor: '#ECF7FC',
    },
    selectTouch: {

    },
    selectText: {
        textAlign: 'center',
        color: '#666666',
        fontSize: 18,
        borderTopColor: '#efefef',
        borderTopWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalBodyContent: {
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
