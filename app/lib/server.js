import Meteor from 'react-native-meteor';

export default () => {
    // Meteor.connect('ws://127.0.0.1:3000/websocket');
    // const url = 'wss://www.zg18.com:13220/websocket';
    const url = 'ws://192.168.1.102:3000/websocket';
    
    Meteor.connect(url);
}
