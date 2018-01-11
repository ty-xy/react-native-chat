import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import hostUser from '../store/mobx';
import PassWord from './myown/PassWord';
import pinyin from 'pinyin'

@observer
@inject('mobx')
@inject('list')  
@inject('link')
export default class Love extends Component {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码'
  }
  static navigationOptions = {
    title: '联系人',
    tabBarLabel: '联系人',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    headerRight: (<Text style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>&#xe637;</Text>),
    tabBarIcon: ({ tintColor }) => (<Text style={{fontFamily:'iconfont',color:tintColor,fontSize:24}} >&#xe635;</Text>),
  }
  _renderFlatlist(item) {
    return (
      <View style={styles.total}>
       {item.showType?
       <View style={styles.left}> 
          <Text>{item.pinyin.toUpperCase()}</Text>
       </View>
       :
       <Text style={styles.left}/>}
        <TouchableHighlight 
        onPress={ () => this._onPressButton(item.route) } 
        underlayColor='transparent'
        style={{ flex:1,}}
        >
          <View style={styles.flatlist}>
            <Image source={require('../image/beautiful.png')} style={styles.img} />
            <View>
              <Text style={styles.keylist}>{item.key}</Text>
              <Text style={styles.keylist}>{item.num}</Text>
            </View>
          </View>
      </TouchableHighlight>
      </View>
    )
}
_renderRight(data){
   return (
     <View style={styles.right}>
       {data?data.map((value,index)=>{
          return(
            <TouchableOpacity key={index} onPress={()=>this._onChangeScrollToIndex(index)}>
              {value.showType?
               <Text >{value.pinyin.toUpperCase()}</Text>:null}
           </TouchableOpacity>
        )
       }):null}
     </View>
   )
}
_onChangeScrollToIndex = (text) => {
  this._listRef.scrollToIndex({viewPosition: 0, index: Number(text)});
};
_captureRef = (ref) => { this._listRef = ref};
  render() {
    const data =this.props.link.pinyinData
    console.log(this.props.link.sortedData)
    const datalist = this.props.link.sortedData
    // datalist.forEach((d, i, data) => {
    //   d.showType = false;
    //   if (i) {
    //       const prev = data[i - 1];
    //       d.showType = d.pinyin !== prev.pinyin;
    //   } else {
    //       d.showType = true;
    //   }
    // });
    console.log(datalist);
    return (
      <View style={styles.container}>
        <View style={styles.search}>
            <PassWord texts={this.state.text}/>
           <Text style={{fontFamily:'iconfont',fontSize:16,color:'#29B6F6',marginRight:-24}}>&#xe636;</Text>
        </View>
        <View style={styles.body}>
           <FlatList
           data={this.props.link.pinyinData}
           renderItem={({item}) => this._renderFlatlist(item)}
           ref={this._captureRef}
      />
          {this._renderRight(data)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:15,
    backgroundColor: '#F5FCFF',
  },
  search:{
    backgroundColor:'#fff',
    height:32,
    width:'100%',
    borderRadius:100,
    paddingLeft:12,
    paddingRight:30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    height:70,
    padding:10,
    marginTop:15,
    flexBasis:'auto',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start', 
    alignSelf:'stretch',
  },
  img:{
    width: 42, 
    height: 42,
  },
  body:{
    width:'100%',
    flexDirection: 'row',
    // alignItems: 'center'
    justifyContent: 'space-between',
    flex:1,
  },
  left:{
  width:33,
  flexDirection: 'row',
  marginRight:10,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:15,
  // backgroundColor: '#FFFFFF',
  },
  right:{
    width:33,
    backgroundColor:'#fff',
    marginLeft:10,
    marginTop:15,
    borderRadius:100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:5,
    paddingTop:10,
    },
    total:{
      flexDirection: 'row',
    }
});