import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    ActivityIndicator,
    FlatList,
    Keyboard,
    TextInput
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
            keyboardHeight:0
        };
    }
    // componentDidMount = () => {
    //     console.log('componentDidMount', this._chatList)
    // }
    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // componentWillMount() {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // }

    // _keyboardDidShow = (e) => {
    //     console.log('Keyboard', e)
    //     this.setState({
    //         keyboardHeight: e.height
    //     })

    // }

    // _keyboardDidHide = (e) => {
    //     this.setState({
    //         keyboardHeight:0
    //     })
    // }
    // componentWillMount() {
    //     // this.props.message.getMessageList();
    // }
    // _onContentSizeChange = (parmas) => {
    //     console.log('parmas', parmas)
    // }
    _onContentSizeChange = (event) => {
        console.log('_onContentSizeChange', event.nativeEvent.contentSize)
        this.setState({inputHeight: event.nativeEvent.contentSize.height});
    }
    // 底部加载显示
    _renderPullBottom = () => {
        let el = null;
        return (<Text style={styles.pullUp}>~~我们是有底线的~~</Text>);
    }
    // 输入框获得焦点
    _onFocus = () => {
        this.setState({inputFocus: true});
    }
    _keyExtractor = (item, index) => item.key;
    render() {
        const { inputHeight, inputFocus } = this.state;
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
                    ref={i => this._chatList = i}
                />
                <View style={[styles.enterCard, {height: height + 13}]}>
                    <Text style={styles.iconfont}>&#xe63e;</Text>
                    <TextInput
                        multiline
                        maxLength={255}
                        placeholder='说点什么'
                        underlineColorAndroid='transparent'
                        style={[styles.input, {height}]}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        onContentSizeChange={this._onContentSizeChange}
                        // onFocus={this._onFocus}
                    />
                    <Text style={[styles.iconfont, {marginLeft: 10}]}>&#xe631;</Text>
                    <Text style={[styles.iconfont, {marginRight: 0, marginLeft: 0}]}>&#xe62f;</Text>
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
        paddingLeft: 15,
        paddingRight: 15,
        // paddingTop: 5,
        // paddingBottom: 5,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        maxHeight: 127,
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 4,
        paddingTop: 2,
        paddingBottom: 2,
    },
    iconfont: {
        fontFamily: 'iconfont',
        color: '#29B6F6',
        fontSize: 24,
        marginRight: 15,
        alignSelf: 'flex-end',
        margin: 10,
    },
});
