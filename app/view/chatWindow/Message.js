import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import userinfo, { userIdToInfo } from '../../util/user';
import Meteor from 'react-native-meteor';




export default class Message extends PureComponent {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {};
    }
    messageLeft = () => {
        const { from, content, chatType, users } = this.props;
        const uri = userIdToInfo.getAvatar(users, from);  
        
        return (
            <View style={styles.message}>
                <Image
                    style={styles.avatar}
                    source={uri ? { uri } : require('../../image/defaultAvatar.png') }                    
                />
                <View style={styles.content}>
                    {chatType !== 'user' && <View style={[styles.contentLeftName, { justifyContent: 'flex-start' }]}><Text style={styles.text}>{userIdToInfo.getName(users, from)}</Text></View>}
                    <View style={[styles.contentDiv, {marginTop: chatType === 'user' ? 21 : 0}]}>
                        <Text style={styles.text}>{content}</Text>
                    </View>
                </View>
            </View>
        );
    }
    messageRight = () => {
        const { from, content, chatType, users } = this.props;      
        const uri = userIdToInfo.getAvatar(users, from);  
        return (
            <View style={styles.messageRight}>
                <View style={styles.contentRight}>
                    {chatType !== 'user' && <View style={[styles.contentLeftName, { justifyContent: 'flex-end' }]}><Text style={styles.text}>{userIdToInfo.getName(users, from)}</Text></View>}
                    <View style={[styles.contentDivRight, {marginTop: chatType === 'user' ? 21 : 0}]}>
                        <Text style={styles.textRight}>{content}</Text>
                    </View>
                </View>
                <Image
                    style={styles.avatar}
                    source={uri ? { uri } : require('../../image/defaultAvatar.png') }
                />
            </View>
        );
    }
    render() {
        const { from } = this.props;
        return (from !== Meteor.userId() ? this.messageLeft() : this.messageRight());
    }
}

const styles = StyleSheet.create({
    message: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15
    },
    messageRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    content: {
        alignSelf: 'flex-end',
        maxWidth: '70%',
    },
    contentRight: {
        alignSelf: 'flex-start',
        maxWidth: '70%',
    },
    contentDiv: {
        // marginTop: 21,
        marginLeft: 15,
        paddingLeft: 10,
        paddingTop: 6,
        paddingRight: 10,
        paddingBottom: 6,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16,
    },
    contentLeftName: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 15,
        marginTop: 15,
        marginBottom: 5,
    },
    contentDivRight: {
        // marginTop: 21,
        marginRight: 15,
        paddingLeft: 10,
        paddingTop: 6,
        paddingRight: 10,
        paddingBottom: 6,
        backgroundColor: '#29B6F6',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 28,
        borderTopLeftRadius: 16,
    },
    text: {
        fontSize: 14,
        color: '#4D4D4D',
    },
    textRight: {
        fontSize: 14,
        color: '#ffffff',
    }
});
