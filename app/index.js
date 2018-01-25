import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import Meteor from 'react-native-meteor';

import stores from './store';
import Router from './router';

import server from './lib/server.js';

// 获取到所有的 stores 并注入到对应的组件中
class App extends Component {
    componentWillMount() {
        server();
    }
    // componentDidMount() {
    //     Meteor.loginWithPassword('18685046518', 'xyty1314', (error) => {
    //         if (error) {
    //             console.log('Home', error.reason)
    //         }
    //     });
    // }
    render() {
        return (
            // <Provider {...stores}>
                <Router />
            // </Provider>
        );
    }
}

export default App;
