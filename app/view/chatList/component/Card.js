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

    this.state = {};
  }

  componentDidMount() {

  }
  _renderGroup = (_id, isDisturb, avatar, name, stickTop, lastMessage, time, type, unreadMessage) => {
    const isMyDisturb = isDisturb.includes(Meteor.userId());
    const selfStickTop = stickTop.find(x => x.userId && x.userId === Meteor.userId());
    const arr = this.props.location.pathname.split('/');
    return (<div
            onClick={() => {
                this.props.handleToggle(_id);
                this.handleChatWindow(_id, type);
            }}
            key={_id}
            className={classnames('chat-user-pannel', { 'chat-user-pannel-avtive': arr.indexOf(_id) > 0 })}
        >
            {
                selfStickTop && selfStickTop.userId === Meteor.userId() ?
                    <div className="triangle-topleft" />
                    :
                    null
            }
            <div className="icon-guanbi-close">
                <Icon icon="icon-guanbi" size={20} onClick={e => this.deleteChat(_id, type, unreadMessage, e)} />
            </div>
            <div className="user-avatar">
                <Avatar avatar={avatar || avatarUrl.avatarGroup} name="群聊" />
            </div>
            <div className="user-message">
                <p>{name}
                {/* <span className="message-createAt">{lastMessage ? formatDate.renderDate(lastMessage.createdAt) : formatDate.renderDate(time)} </span> */}
                <span className="message-createAt">{lastMessage && lastMessage.createdAt ? formatDate.renderDate(lastMessage.createdAt) : formatDate.renderDate(time)} </span>
                </p>
                <p className="last-message">
                    <span className="last-content">{lastMessage ? (lastMessage.type === 'file' ? '[文件]' : <Text content={lastMessage.content.replace(/<br\/>/g, ' ')} />) : '可以开始聊天了'}</span>
                    {
                        unreadMessage !== 0 ?
                            <span className={isMyDisturb ? 'notice-red-dot-no notice-red-dot' : 'notice-red-dot'}>
                                {isMyDisturb ? '' : unreadMessage}
                            </span>
                            :
                            null

                    }
                    {
                        isMyDisturb ?
                            <Icon icon="icon-icon-yxj-no-disturbing" size={8} iconColor="#b2b2b2" />
                            :
                            null
                    }
                </p>
            </div>
        </div>
        );
    }
    _renderNewFriend = (notice, friendFrom) => (
        <div
            className={classnames('chat-user-pannel', { 'chat-user-pannel-avtive': this.props.selectedChat && this.props.selectedChat[notice._id] })}
            key={notice._id}
            onClick={() => {
                this.props.handleToggle(notice._id);
                this.handleChatNewfriend();
            }}
        >
            <div className="user-avatar new-friend-notice">
                <Icon icon="icon-icon15 icon" />
            </div>
            <div className="user-message">
                <p>新的好友
                    {/* <span className="message-createAt">{formatDate.renderDate(notice.createdAt)}</span> */}
                    </p>
                <p className="last-message">{friendFrom.profile && friendFrom.profile.name}请求添加好友
                    <span className="notice-red-dot">
                        {this.props.newFriendNotice.length}
                    </span>
                </p>
            </div>
        </div>
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
  _renderUser = (user = { profile: {} }, lastMessage, time, type, unreadMessage, id) => {
      return (
        <TouchableOpacity
            key={id}
            style={styles.card}
            activeOpacity={1}
            onPress={() => {
                this.props._goChatWindow();
            }}
        >
            <View style={styles.avatar}>

             <Image
             style={styles.image}
             source={user&&user.profile.avatar&&user.profile.avatar.length>0?{uri: user.profile.avatar}:require('../../../image/toufemail.png')}
           />
            </View>
            <View style={styles.chatList}>
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
            <View style={styles.badge}><Text style={{fontSize: 12, color: '#fff'}}>{unreadMessage}</Text></View>
        </TouchableOpacity>
    );
  }
  _renderChatListItem = (item) => {
    if (item.type === 'user') {
        const mem = item.members ? item.members.filter(value => value !== Meteor.userId()) : [];
        const users = Meteor.collection('users').findOne({ _id: mem[0] }) || { profile: {} };
        return this._renderUser(users, item.lastMessage, item.time, item.type, item.unreadMessage, item._id, mem);
    }
    // } else if (item.type === 'team' || item.type === 'group') {
    //     return this._renderGroup(item._id, item.isDisturb || [], item.avatar, item.name, item.stickTop || [], item.lastMessage, item.time, item.type, item.unreadMessage);
    // } else if (item.notice) {
    //     return this._renderNewFriend(item.notice, item.friendFrom);
    // }
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
    }
});
