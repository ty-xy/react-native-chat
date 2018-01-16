
import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
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
      backTextWhite: {
        color: '#FFF',
        fontFamily:'iconfont',
        fontSize:24,
        borderRadius:16,
        backgroundColor: 'transparent',
      },
    //   rowFront: {
    //     alignItems: 'center',
    //     backgroundColor: '#CCC',
    //     borderBottomColor: 'black',
    //     borderBottomWidth: 1,
    //     justifyContent: 'center',
    //     height: 50,
    //   },
      rowBack: {
        alignItems: 'flex-start',
        // backgroundColor: '#DDD',
        // flex: 1,
        height:71,
        flexDirection: 'column',
        justifyContent: 'center',
        // paddingLeft: 15,
        marginRight:15,
        position:'relative',
      },
      backRightBtn: {
        alignItems: 'center',
        // bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        // top: 0,
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor: '#EF5350',
        right: 0,
      },
      backRightBtnRight: {
    
      },
 
});
const friendList = [
    {_id: 'sdghjdsk', name: '林亦宣', lastMessage: '你好，我是Vanke林亦宣',number:'188 0022 4466'},
    {_id: 'sdg678sk', name: '风四娘', lastMessage: '你好，我是Vanke风四娘',number:'188 0022 4466'},
    {_id: 'sdghj12sk', name: '袁毅', lastMessage: '你好，我是weChat风四娘',number:'188 0022 4466'},   
  
]
export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
        // status:true,
  }
}
  static navigationOptions = {
    headerTitle:'好友申请',
    title:'返回',
    alignSelf: 'center',
    headerTruncatedBackTitle:'返回',
    headerBackTitle:'返回',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  }

  _goChatWindow = (name,number) => {
    const { navigation } = this.props;
    navigation.navigate('AddDetail', {name,number });
}
_onChangeStatus=(id)=>{
    this.setState({
      status:false,
      [`status${id}`]:false
    })
    console.log(1111)
}
_renderItem = ({item}) => {
    return (<AddCard
         {...item} 
         key={item._id} 
         _goChatWindow={this._goChatWindow} 
         _onChangeStatus={()=>this._onChangeStatus(item._id)}
         status={this.state[`status${item._id}`]}
           />);
}
_keyExtractor = (item, index) => item._id;
render() {
    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <SwipeListView
                    useFlatList={true}
                    style={{paddingTop: 15, paddingBottom: 30}}
                    data={friendList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={() => <View style={{height: 15}} />}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                        <TouchableOpacity
                          style={[styles.backRightBtn, styles.backRightBtnRight]}
                          onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                          <Text style={styles.backTextWhite}>&#xe626;</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    disableRightSwipe={true}
                    rightOpenValue={-47}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            rowMap[rowKey].closeRow()
                        }, 2000)
                    }}
                    // previewRowKey={this._keyExtractor}
                />
            </View>
        </View>
    );
}
}

