import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Keyboard,
} from 'react-native';
// import { RkButton, RkCard } from 'react-native-ui-kitten';
// import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import Card from '../component/Card';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';

// @inject('home')
// @observer
class Homes extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor() {
        super();
    }
    componentWillReceiveProps() {
        console.log('componentWillReciveProps', this.props)
    }
    _goChatWindow = () => {
        const { navigation } = this.props;
        navigation.navigate('ChatWindow', { id: '323' });
    }
    _renderItem = ({item}) => {
        return (<Card {...item} key={item._id} _goChatWindow={this._goChatWindow} />);
    }
    _keyExtractor = (item, index) => item._id;
    render() {
        const { home, groups } = this.props;
        console.log('chat', this.props)
        const chatList = [
            {_id: 'sdghjdsk', name: '小明', lastMessage: 'jjjHi，很高心认识你，我是易永平 🙂'},
            {_id: 'sdg678sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
            {_id: 'sdghj12sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},   
            {_id: 'sd23ghjdsk', name: '小明', lastMessage: 'Hi，很高心认识你，我是易永平 🙂'},
            {_id: 'sd21g678sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
            {_id: '2sdghj12sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},     
            {_id: 'sdghcvjdsk', name: '小明', lastMessage: 'Hi，很高心认识你，我是易永平 🙂'},
            {_id: 'sdg673224f8sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
            {_id: 'sdghj152sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},
        ];
        return (
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <FlatList
                        style={{paddingTop: 15, paddingBottom: 30}}
                        data={groups}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ListFooterComponent={() => <View style={{height: 15}} />}
                    />
                </View>
            </View>
        );
    }
}

export default createContainer(params => {
    Meteor.subscribe('group');
    return {
        groups: Meteor.collection('group').find(),
    };
}, Homes)


const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    position: 'relative',
    // paddingTop: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    justifyContent: 'space-around',
    width: '43%',
    height: '43%',
    backgroundColor: '#FEFFFF',
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#29A4DE',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  text: {
    textAlign: 'center',
  }
});