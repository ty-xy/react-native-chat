
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  // Button,
} from 'react-native';
import AddCard from './AddCard';

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

 
});
const friendList = [
    {_id: 'sdghjdsk', name: '林亦宣', lastMessage: '你好，我是Vanke林亦宣'},
    {_id: 'sdg678sk', name: '风四娘', lastMessage: '你好，我是Vanke风四娘'},
    {_id: 'sdghj12sk', name: '袁毅', lastMessage: '你好，我是weChat风四娘'},   
  
]
export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
  }
}
  static navigationOptions = {
    headerTitle:'好友申请',
    alignSelf: 'center',
    // headerBackTitle:null,
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  }

  _goChatWindow = () => {
    const { navigation } = this.props;
    navigation.navigate('ChatWindow', { id: '323' });
}
_renderItem = ({item}) => {
    return (<AddCard {...item} key={item._id} _goChatWindow={this._goChatWindow} />);
}
_keyExtractor = (item, index) => item._id;
render() {
    const { home } = this.props;
    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <FlatList
                    style={{paddingTop: 15, paddingBottom: 30}}
                    data={friendList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={() => <View style={{height: 15}} />}
                />
            </View>
        </View>
    );
}
}

