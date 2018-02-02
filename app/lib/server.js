import Meteor from 'react-native-meteor';

export default () => {
    // const url = 'wss://www.zg18.com:13220/websocket';
    const url = 'ws://192.168.1.142:3000/websocket';
    // const url = 'ws://192.168.1.193:3000/websocket';
    
    Meteor.connect(url);
}
