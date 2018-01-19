import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
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
  _renderUser = (user, lastMessage, time, type, unreadMessage, id) => {
      return (
        <TouchableHighlight
            key={id}
            style={styles.card}
            underlayColor={'rgba(100,100,100,0.2)'}
            onPress={() => {
                this.props._goChatWindow();
            }}
        >
            <View style={styles.chatList}>
                <View style={styles.avatar}>
                    <Image
                        style={styles.image}
                        source={{uri: user.profile.avatar || ''}}
                    />
                </View>
                <View style={styles.chatlistContent}>
                    <View style={styles.chatTitle}>
                        <Text style={styles.chatContent}>{user.profile.name}</Text>
                        <Text style={styles.chatDate}>{formatDate.renderDate(time)}</Text>
                    </View>
                    <Text style={styles.lastMessage}>{lastMessage.content}</Text>
                </View>
                <View style={styles.badge}><Text style={{fontSize: 12, color: '#fff'}}>{unreadMessage}</Text></View>
                <View style={styles.mark} />
            </View>
        </TouchableHighlight>
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
        // backgroundColor: '#ffffff',
        // paddingBottom: 14,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        height: 71,
        borderColor: 'transparent',
        borderRadius: 4,
    },
    chatList: {
        height: 71,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        position: "relative",
        zIndex: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mark: {
        flex: 1,
        position: "absolute",
        backgroundColor: '#fff',
        left: 15,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
        borderRadius: 4,
    },
    chatlistContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    chatTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    chatContent: {
        fontSize: 14,
        color: '#4A4A4A',
        // zIndex: 2,
        
    },
    chatDate: {
        fontSize: 12,
        color: '#999999',
        // position: "relative",
    },
    lastMessage: {
        marginTop: 5,
        fontSize: 14,
        color: '#999999',
        paddingLeft: 10,
        // position: "relative",
        // zIndex: 0,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#29B6F6',
        shadowOpacity: 0.2,
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
        top: -8,
        right: -8,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#EF5350',
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#EF5350',
        shadowOpacity: 0.4,
    }
});
