import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';

import PassWord from '../myown/PassWord';
import pinyin from 'pinyin'
export default class Concat extends Component {
  state = {
    text: '',
    showInput: false,
    text:'请输入姓名或电话号码',
    selectedChat:{},
    try:true,
  }
  _addPeople(item){
      if(item.name !=="淘淘" && this.props.status !==1){
           return (
           <TouchableOpacity onPress={this.props._onPressAdd}>
                 <Text style={{color:'#29B6F6'}}>添加</Text>
            </TouchableOpacity>
           )
      }else if(item.name !=="淘淘" &&this.props.status ===1 ){
         return(<Text>已发送</Text>)
      }else{
        return( <Text>已添加</Text>)
      }
  }
  _renderFlatlist(item) {
      const {profile={},username,_id}=item.user
      const {name,avatar}=profile
    return (
      <View style={styles.total} >
       {item.showType?
       <View style={styles.left}> 
            <Text ref={(i)=>this.text=i}>{item.pinyin.toUpperCase()}</Text>
       </View>
       :
       <Text style={styles.left}/>}
        <TouchableHighlight 
             onPress={ () => this.props._onPressButton(name,username,avatar,_id) } 
             underlayColor='transparent'
             style={{ flex:1 }}
        >
          <View style={styles.flatlist}>
             <View style={styles.flatleft} >
             <Image source={{uri : avatar}} style={styles.img} />
             <View style={styles.imgRight}>
               <Text style={styles.keylist}>{name}</Text>
               <Text style={styles.numlist}>{username}</Text>
            </View>
            </View>
            {this.props.add?
            <View >
               {this._addPeople(item)}
               </View>:null}
          </View>
      </TouchableHighlight>
      </View>
    )
}
_handleToggle = (value) => {
  this.setState({
      selectedChat: {
          [value]: true,
      },
  });
}
_renderRight(data){
   return (
     <View style={styles.right}>
       {data?data.map((value,index)=>{
          return(
            <TouchableOpacity key={index} onPress={()=>this._onChangeScrollToIndex(index)}>
              {value.showType?
                <View style={this.state.selectedChat[index]?[styles.circle,{backgroundColor:'#29B6F6'}]:styles.circle}  data-index={index}>
                <Text style={styles.wordlist}>{value.pinyin.toUpperCase()}</Text>
               </View>
               :null}
           </TouchableOpacity>
        )
       }):null}
     </View>
   )
}
_onChangeScrollToIndex = (text,e) => {
    this._listRef.scrollToIndex({viewPosition: 0, index: Number(text)});
}
_scrollPos = new Animated.Value(0)
_scrollSinkX = Animated.event(
     [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
     {useNativeDriver: true},
)
_onScrollIndex=(e)=>{
    const y=e.nativeEvent.contentOffset.y
    index=Math.floor(y/85)>-1?Math.floor(y/85):0
    showType=this._listRef.props.data[index].showType
    if(showType&&this.state.try){
        this._handleToggle(index)
    }
}
_captureRef = (ref) => { this._listRef = ref};

  render() {
    // const data =this.props.link.pinyinData
    console.log(this.props.navigation,this.props.datalist)
    return (
      <View style={styles.container}>
             <View style={styles.search}>
                 <PassWord texts={this.state.text}/>
                <Text style={{fontFamily:'iconfont',fontSize:16,color:'#29B6F6',marginRight:-24}}>&#xe636;</Text>
        </View>
        <View style={styles.body}>
            <FlatList
                data={this.props.datalist}
                renderItem={({item}) => this._renderFlatlist(item)}
                ref={this._captureRef}
                onScroll={this._onScrollIndex}
                keyExtractor={item => item.user._id}
            />
          {this._renderRight(this.props.datalist)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor:'#F6F6F6',
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
    // flexBasis:'auto',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between', 
    // alignSelf:'stretch',
    // backgroundColor: 'red',
  },
  flatleft:{
    flexDirection: 'row',
  },
  img:{
    width: 42, 
    height: 42,
    borderRadius:21
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
    },
    keylist:{
        fontSize: 14,
        color:'#4A4A4A',
        height:20,
        lineHeight:20,
    },
   total:{
      flexDirection: 'row',
    },
    numlist:{
        fontSize: 14,
        color: '#999999',
        letterSpacing: 0,
        height:20,
        lineHeight:20,
    },
  circle:{
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height:18,
    width:18,
    borderRadius:8,
    // backgroundColor:'pink',
    margin:4,
    padding:2,
  },
  wordlist:{
    fontSize: 12,
    color: '#999999',
    letterSpacing: 0,
    padding:-2,
  },
  imgRight:{
    marginLeft:10,
  }
});