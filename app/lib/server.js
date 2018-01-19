import Meteor from 'react-native-meteor';

export default () => {
    // Meteor.connect('wss://www.zg18.com:13220/websocket');
    // Meteor.connect('ws://127.0.0.1:3000/websocket');
    // const url = 'wss://www.zg18.com:13220/websocket';
    const url = 'ws://127.0.0.1:3000/websocket';
    
    Meteor.connect(url);
}
