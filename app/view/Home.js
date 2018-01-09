import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
// import { RkButton, RkCard } from 'react-native-ui-kitten';
// import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import Card from '../component/Card';


@observer
@inject('home')
export default class Home extends PureComponent {
    
    static navigationOptions = {
        title: '消息(14)',
        tabBarLabel: '消息',
        alignSelf: 'center',
        headerStyle: {
            height: 49,
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'normal'
        },
        tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont', color: tintColor}}>&#xe63d;</Text>),
    }
    constructor() {
        super();
    }
    _renderItem = ({item}) => {
        return (<Card {...item} key={item._id} />);
    }
    _keyExtractor = (item, index) => item._id;
    render() {
        const { navigation, home } = this.props;
        console.ignoredYellowBox = ['Remote debugger'];
        return (
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <FlatList
                        data={home.chatList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>
            </View>
        );
    }
}

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
    position: 'relative'
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