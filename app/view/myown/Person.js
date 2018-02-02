
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Book from '../Item';
import Meteor from 'react-native-meteor';
import MeteorContainer from '../../component/MeteorContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    // backgroundColor: '#EBF8FD',
  },
  flatlist:{
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 8, height: 8},
    shadowColor:'rgba(41,182,246,0.02)',
    borderRadius: 4,
    width:345,
    height:67,
    marginTop:15,
    padding:10,
  },
  keylist:{
    fontSize: 14,
    color: "#D1D1D1",
    letterSpacing: -0.34,
    marginBottom:5,
    height:18,
    lineHeight:18,
  },
  namelist:{
    fontSize: 16,
    color: "#666",
    letterSpacing: -0.39,
    height:22,
    lineHeight:22,
  },
  bstyle:{
    height:40,
    width:206,
    backgroundColor:'#22B1FF',
    borderRadius:100,
    marginBottom:20,
  },
  button: {
    height: 48,
    width: 206,
    borderRadius: 100,
    backgroundColor: '#22B1FF',
    justifyContent: 'center',
    margin: 20,
},
buttonText: {
    textAlign: 'center',
    color: 'white',
    // height: 48,
    width: 200,
    marginLeft:3,
},
});

const subCollection = () => () => {
    Meteor.subscribe('users');
    return {
        user: Meteor.user() || {},
    }
};
const navigationOptions = (navigation)=>({
    title: '个人资料',
    tabBarLabel: '个人资料',
    alignSelf: 'center',
    headerStyle: {
      height: 49,
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  })
class Person extends Component {
  constructor(props){
    super(props);
    this.state={
        name:"",
        address:[],
        company:"",
  }
}
componentWillMount(){
    const { profile = {} } = this.props.user;
    const { name = '', signature = '', age = '', sex = 'male', address = [], company = [] } = profile;
    this.setState({
            name,
            address,
            company,
    })    
}
componentWillReceiveProps() {
    const { profile = {} } = this.props.user;
    const { name = '', signature = '', age = '', sex = 'male', address = [], company = [] } = profile;
    this.setState({
            name,
            address,
            company,
    })    
}
// renderCompany = (companyIds) => {
//     const companyList = companyIds.map(companyId => PopulateUtil.company(companyId));
//     return companyList.map(company => company && <p key={company._id}>{company.name}</p>);
// }
  _renderFlatlist=(name,item)=> {
      return (
        <View style={styles.flatlist}>
           <Text style={styles.keylist}>{name}</Text>
           <Text style={styles.namelist}>{item}</Text>
        </View>
      )
  }
  onPressLearnMore () {
    let num = 0
    console.log(num++)
  }
  handleChangeTry=(i, event) => {
    const newState = {};
    newState[i] = event.nativeEvent.value;
    this.setState(newState);
}
// updateText = (text) => {
//     this.setState((state) => {
//       return {
//         curText: text,
//       };
//     });
//   };
  render() {
    // const {name,username}=this.props.navigation.state.params
    const {  username = '' } = this.props.user;
    // console.log(this.props) 
    
    // const { name = '', signature = '', age = '', sex = 'male', address = [], company = [] } = profile;
    return (
      <View style={styles.container}>
        <View style={styles.flatlist}>
             <Text style={styles.keylist}>昵称</Text>
             <TextInput
                style={{minHeight: 32, borderColor: 'transparent', borderWidth: 1,padding: 0,width:'100%',color:'#666666'}}
                 underlineColorAndroid="transparent"
                  onChange={(name) => { 
                 this.setState({name});
                }}
                 maxLength = {326}
                 multiline = {true}
                value={this.state.name}
                />
        </View>
      <View style={styles.flatlist}>
           <Text style={styles.keylist}>手机号</Text>
           <Text style={[styles.namelist,{color:'#d1d1d1'}]}>{username}</Text>
        </View>
        <View style={styles.flatlist}>
             <Text style={styles.keylist}>地区</Text>
             <TextInput
                style={{minHeight: 32, borderColor: 'transparent', borderWidth: 1,padding: 0,width:'100%',color:'#666666'}}
                 underlineColorAndroid="transparent"
                  onChange={(address) => { 
                 this.setState({address});
                }}
                 maxLength = {326}
                 multiline = {true}
                value={this.state.address}
                />
        </View>
      {this._renderFlatlist('公司','万科企业股份有限公司')}
      {this._renderFlatlist('部门','商务部')}
      {this._renderFlatlist('职务','商务总监')}
      <TouchableOpacity
          style={styles.button}>
         <Text style={styles.buttonText}>保存</Text>  
       </TouchableOpacity>
      </View>
      
    );
  }
}

export default MeteorContainer(navigationOptions, subCollection())(Person);