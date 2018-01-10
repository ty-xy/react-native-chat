import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Keyboard,
    TextInput,
    Platform
} from 'react-native';
import Message from './Message';

import { observer, inject } from 'mobx-react/native';


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
            text: '',
        };
    }


    _keyboardDidShow = (e) => {
        console.log('Keyboard', e)
        this.setState({
            keyboardHeight: e.height
        })
    }

    _keyboardDidHide = (e) => {
        this.setState({
            keyboardHeight:0
        })
    }
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
        // this.setState({inputFocus: true});
        this.setState({sendButton: true});
    }
    _onBlur = () => {
        this.setState({sendButton: false});
    }
    // 输入文字
    _inputChange = (text) => {
        this.setState({ text });
    }
    // 发送消息
    _handleSendMsg = () => {
        const { text } = this.state;
        console.log('_handleSendMsg', text)
    }
    // 发送按钮
    _sendButton = () => {
        const {sendButton} = this.state;
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
        return <Text style={[styles.iconfont, {marginRight: 0, marginLeft: 0}]}>&#xe62f;</Text>;
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
        this.setState({showAudio: !this.state.showAudio});
    }
    _auditTabInput = () => {
        const { showAudio, height, text } = this.state;
        if (showAudio) {
            return (
                <TouchableOpacity
                    style={styles.inputAudit}
                    onPress={this._handleSendMsg}
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
            />
        );
    }
    // 表情按钮
    _emojiButton = () => {
        return (<Text onPress={this._showEmoji} style={[styles.iconfont, {marginLeft: 10}]}>&#xe631;</Text>);
    }
    _showEmoji = () => {
        this.setState({ showEmoji: !this.state.showEmoji, inputHeight: this.state.inputHeight === 154 ? 36 : 154  });
    }
    // 表情列表
    _emojiList = () => {
        const { showEmoji } = this.state;
        if (showEmoji) {
            return (
                <View style={styles.emoji}>
                    <Text>合适的坊间还</Text>
                </View>
            );
        }
        return null;
    }



    _keyExtractor = (item, index) => item.key;
    render() {
        const { inputHeight, inputFocus, sendButton } = this.state;
        const height = inputHeight < 30 ? 36 : inputHeight;
        const focusFlatList = inputFocus ? ({marginBottom: 120}) : ({});
        console.log('chatwndow', height, height + 13, this.state)
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
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: '#F6F6F6',
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
