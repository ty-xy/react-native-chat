import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Meteor from 'react-native-meteor';
import formatDate from '../../../util/formatDate';


export default class Card extends PureComponent {
    static propTypes = {
        style: PropTypes.object,
        _id: PropTypes.any,
        lastMessage: PropTypes.object,
        name: PropTypes.string,
        _goChatWindow: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            // showNewFriends: true,
        };
    }

    componentDidMount() {

    }
    _renderGroup = (avatar, name, lastMessage, time, type, unreadMessage, id, stickTop) => {
        let isTop = false;
        stickTop.forEach((item) => {
            if (item.userId === Meteor.userId()) {
                isTop = true;
            }
        });
        return (
            <TouchableOpacity
                onPress={this.props._goChatWindow}
                key={id}
                style={styles.card}
                activeOpacity={1}
            >
                <View style={styles.avatar}>
                    <Image
                        style={styles.image}
                        source={avatar ? {uri: avatar} : require('../../../image/toufemail.png')}
                    />
                </View>
                <View style={styles.chatList}>
                    {isTop ? <View style={styles.top} /> : null}
                    <View style={styles.chatlistContent}>
                        <View style={styles.chatTitle}>
                            <Text style={styles.chatContent}>{name}</Text>
                            <Text style={styles.chatDate}>{formatDate.renderDate(time)}</Text>
                        </View>
                        <View style={styles.contentNoBreak}>
                            <Text 
                                ref="text"
                                style={styles.lastMessage}
                                onLayout={this._textOnLayout}
                            >
                                {lastMessage.content}
                            </Text>
                            {this.state.tag === 1 && (<Text style={{ fontSize:15, lineHeight:20, color: '#999999' }}>...</Text>)}
                        </View>
                    </View>
                </View>
                {unreadMessage > 0 ? <View style={styles.badge}><Text style={{fontSize: 12, color: '#fff'}}>{unreadMessage}</Text></View> : null}                
            </TouchableOpacity>
        );
    }
    _renderNewFriend = (num, time, id) => (
        <TouchableOpacity
            key={id}
            style={styles.card}
            activeOpacity={1}
            onPress={this.props._goNewFriends()}
        >
            <View style={styles.avatar}>
                <Image
                    style={styles.image}
                    source={require('../../../image/toufemail.png')}
                />
            </View>
            <View style={styles.chatList}>
                <View style={styles.chatlistContent}>
                    <View style={styles.chatTitle}>
                        <Text style={styles.chatContent}>新的好友</Text>
                        <Text style={styles.chatDate}>{formatDate.renderDate(time)}</Text>
                    </View>
                    <View style={styles.contentNoBreak}>
                        <Text 
                            ref="text"
                            style={styles.lastMessage}
                            onLayout={this._textOnLayout}
                        >
                            您有新的好友申请，请处理
                        </Text>
                    </View>
                </View>
            </View>
            {num > 0 ? <View style={styles.badge}><Text style={{fontSize: 12, color: '#fff'}}>{num}</Text></View> : null}
        </TouchableOpacity>
    )
    _textOnLayout = (e) => {
        const layout = e.nativeEvent.layout;
        const devicesWidth = Dimensions.get('window').width;
        if(layout.height > 20){  //行高是20然后把text的高度设置为60就能保证行数控制在3行了
            this.refs.text.setNativeProps({  
                style:{  
                    height: 20,
                    width: devicesWidth - 100,
                }  
            });  
            this.setState({
                tag: 1,
            });
        }
    }
    _renderUser = (user = { profile: {} }, lastMessage, time, type, unreadMessage, id, stickTop) => {
        let isTop = false;
        stickTop.forEach((item) => {
            if (item.userId === Meteor.userId()) {
                isTop = true;
            }
        });
        return (
            <TouchableOpacity
                key={id}
                style={styles.card}
                activeOpacity={1}
                onPress={this.props._goChatWindow}
            >
                <View style={styles.avatar}>
                    <Image
                        style={styles.image}
                        source={user && user.profile.avatar && user.profile.avatar.length>0?{uri: user.profile.avatar}:require('../../../image/toufemail.png')}
                    />
                </View>
                <View style={styles.chatList}>
                    {isTop ? <View style={styles.top} /> : null}
                    <View style={styles.chatlistContent}>
                        <View style={styles.chatTitle}>
                            <Text style={styles.chatContent}>{user.profile.name}</Text>
                            <Text style={styles.chatDate}>{formatDate.renderDate(time)}</Text>
                        </View>
                        <View style={styles.contentNoBreak}>
                            <Text 
                                ref="text"
                                style={styles.lastMessage}
                                onLayout={this._textOnLayout}
                            >
                                {lastMessage.content}
                            </Text>
                            {this.state.tag === 1 && (<Text style={{ fontSize:15, lineHeight:20, color: '#999999' }}>...</Text>)}
                        </View>
                    </View>
                </View>
                {unreadMessage > 0 ? <View style={styles.badge}><Text style={{fontSize: 12, color: '#fff'}}>{unreadMessage}</Text></View> : null}
            </TouchableOpacity>
        );
    }
    _renderChatListItem = (item) => {
        if (item.type === 'user') {
            const mem = item.members ? item.members.filter(value => value !== Meteor.userId()) : [];
            const users = Meteor.collection('users').findOne({ _id: mem[0] }) || { profile: {} };
            return this._renderUser(users, item.lastMessage, item.time, item.type, item.unreadMessage, item._id, item.stickTop);
        }
        if (item.type === 'team' || item.type === 'group') {
            return this._renderGroup(item.avatar, item.name, item.lastMessage, item.time, item.type, item.unreadMessage, item._id, item.stickTop);
        }
        if (item.type === 'newFreidsAccept') {
            return this._renderNewFriend(item.num, item.time);
        }
        return null;
    }
    render() {
        const { style = {}, lastMessage, _id, name } = this.props;
        return this._renderChatListItem(this.props);
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        paddingBottom: 20,       
        marginLeft: 15,
        height: 80,
        borderColor: 'transparent',
        borderRadius: 4,
        position: "relative",
        zIndex: 0,
        marginBottom: 5,
    },
    chatList: {
        padding: 15,
        position: "absolute",
        zIndex: 1,
        backgroundColor: '#fff',
        left: 21,
        top: 11,
        right: 15,
        borderRadius: 4,
    },
    chatlistContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contentNoBreak: {
        // backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    chatTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    chatContent: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    chatDate: {
        fontSize: 12,
        color: '#999999',
    },
    lastMessage: {
        marginTop: 5,
        fontSize: 14,
        color: '#999999',
        paddingLeft: 10,
        lineHeight:20,
        height: 18,
        overflow: 'hidden',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#29B6F6',
        shadowOpacity: 0.2,
        position: 'absolute',
        zIndex: 3,
        left: 0,
        top: 25,
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    badge: {
        // display: 'flex',
        height: 22,
        width: 22,
        borderRadius: 11,
        position: "absolute",
        zIndex: 5,
        top: 0,
        right: 4,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#EF5350',
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#EF5350',
        shadowOpacity: 0.4,
    },
    top: {
        borderLeftWidth: 8,
        borderTopWidth: 8,
        borderColor: 'transparent',
        borderLeftColor: '#29B6F6',
        borderRightColor: '#29B6F6',        
        width: 0,
        height: 0,
        position: 'absolute',
        left: 1,
        top: 1,
        transform: [{rotateZ: '90deg'}]
    }
});
