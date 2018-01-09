import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


export default class ChatWindow extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    _id: PropTypes.any,
    lastMessage: PropTypes.string,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { style = {}, lastMessage, _id, name } = this.props;

    return (
        <View style={styles.avatar}>
            <Image
                style={{width: 42, height: 42, borderRadius: 21}}
                source={require('../image/bg.png')}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    ChatWindow: {
        backgroundColor: '#ffffff',
        // paddingBottom: 14,
        marginTop: 15,
        marginRight: 15,
        marginLeft: 30,
        height: 71,
        borderColor: 'transparent',
        borderRadius: 4,
    },
    chatList: {
        height: 71,
        paddingRight: 10,
        paddingLeft: 21,
        flexDirection: 'column',
        justifyContent: 'center',
        position: "relative",
        zIndex: 0,
    },
    chatTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // position: "relative",
        // zIndex: 0,
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
        // position: "relative",
        // zIndex: 0,
    },
    avatar: {
        position: "absolute",
        top: 14,
        left: -21,
        zIndex: 1,
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
        overflow: 'hidden',
    }
});
