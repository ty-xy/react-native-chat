import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class Message extends PureComponent {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }
    messageLeft = () => {
        return (
            <View style={styles.message}>
                <Image
                    style={styles.avatar}
                    source={require('../../image/bg.png')}
                />
                <View style={styles.content}>
                    <View style={styles.contentDiv}>
                        <Text style={styles.text}>节食减肥建设大街, 节食减肥建设大</Text>
                    </View>
                </View>
            </View>
        );
    }
    messageRight = () => {
        return (
            <View style={styles.messageRight}>
                <View style={styles.contentRight}>
                    <View style={styles.contentDivRight}>
                        <Text style={styles.textRight}>节食减肥建设大街节食减肥建设大街, 节食减肥建设大街</Text>
                    </View>
                </View>
                <Image
                    style={styles.avatar}
                    source={require('../../image/bg.png')}
                />
            </View>
        );
    }
    render() {
        const { chatType } = this.props;
        return (chatType !== 'me' ? this.messageLeft() : this.messageRight());
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
        marginTop: 21,
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
    contentDivRight: {
        marginTop: 21,
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
