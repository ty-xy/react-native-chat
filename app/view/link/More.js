
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
//   FlatList,
  View,
  TouchableOpacity,
//   Alert,
DeviceEventEmitter,
  Modal,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    padding:15,
    position:'relative'
  },
  suceessicon:{
    fontFamily:'iconfont',
    fontSize:39,
    color:'#fff',
    letterSpacing: -0.39,
  },
  suceesstext:{
    fontSize:16,
    color:'#fff'
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    width:'100%',
    height:67,
    marginTop:15,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  keylist:{
    fontSize: 16,
    color: "#4d4d4d",
    letterSpacing: -0.39,
  },
  namelist:{
    fontSize: 14,
    color: "#D1D1D1",
    letterSpacing: -0.34,
  },
  success:{
    height:100,
    width:100,
    backgroundColor: 'rgba(0,0,0,0.60)',
   borderRadius: 6,
   padding:15,
   alignItems:'center',
  }
});
const alertMessage = 'Credibly'
                
export default class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        text:'手机号查找',
        modalVisible: false,
  }
}
  static navigationOptions =({navigation})=>({
    title:'更多',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
    // _setModalVisible(visible){
    //     this.setState({modalVisible: visible});
    //   },
    headerRight:   (
        <TouchableOpacity onPress={()=> navigation.state.params.navigatePress()}>
            <Text  style={{fontFamily: 'iconfont', marginRight: 10, fontSize: 18, color: '#29B6F6'}}>完成</Text>
        </TouchableOpacity>
    ),
  })
  _onpressButton=(id)=>{
      const { navigation} = this.props;
       navigation.navigate(id)
  }
  _setModalVisible=()=>{
    this.setState({modalVisible: true});
  }
  componentDidMount(){  
    this.props.navigation.setParams({ navigatePress:this._setModalVisible }) ;
}  
  render() {
    const {name}=this.props.navigation.state.params
    console.log(this.props)
    return (
      <View style={styles.container}> 
         <View style={styles.flatlist}>
         <Text style={styles.namelist}>备注</Text>
           <Text style={styles.keylist}>{name}</Text>
         </View>
         <TouchableOpacity onPress={()=>this._onpressButton('wChat')} style={{width:'100%'}}>
         <View style={[styles.flatlist,{height:42}]}>
           <Text style={styles.keylist}>将此人名片发送给他人</Text>
         </View>
         </TouchableOpacity>
         <Modal
        animationType={"none"}
        transparent={true}
        style={{position:'relative'}}
         visible={this.state.modalVisible}
         onShow= {()=>setTimeout(() => {
            this.setState({modalVisible: false});
        }, 1000)}
         onRequestClose={() => {this._setModalVisible(false)}}
         >
         <View style={{flex:1,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}}>
           <View style={styles.success}>
                <Text style={styles.suceessicon}>&#xe72f;</Text>
                <Text style={styles.suceesstext}>保存成功</Text>
           </View>
        </View>
         </Modal>
      </View>
    );
  }
}

