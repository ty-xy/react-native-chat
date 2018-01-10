import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator,StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import  PassWord from './PassWord';

export default class Fix extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    height:PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }
  _renderFlatlist(item,height) {
    return (
      <View style={[styles.flatlist,{height:height}]}>
         <Text style={styles.keylist}>{item.key}</Text>
         {item.num?
         <View style={item.detail||item.num.indexOf('获取验证码') !==-1?[styles.commn,{justifyContent:'space-between'}]:styles.commn}>
            <Text>{item.common}</Text>
            <Text style={styles.cnum}>{item.num}</Text>
         </View>:null}
        {item.detail? <View >
            <Text>{item.detail}</Text>
         </View>:null}
      </View>
    )
}
  render() {
    const { data,height,top,title} = this.props;
    return (
       <View  style={styles.container}>
        <FlatList
        data={data}
        renderItem={({item}) => this._renderFlatlist(item,height)}
      />
      <View style={[styles.flatlist,{height:67,position:'absolute',top:top}]}>
      <Text>{title}</Text>
      <PassWord/>
      </View>
      <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>完成</Text>  
       </TouchableOpacity>
       </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'stretch',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems:'center',
        position:'relative',
        // backgroundColor: '#EBF8FD',
      },
    flatlist:{
        backgroundColor: '#FFFFFF',
        shadowOffset: {width: 8, height: 8},
        shadowColor:'rgba(41,182,246,0.02)',
        borderRadius: 4,
        width:345,
        padding:10,
        marginTop:15,
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent: 'space-between',
      },
      keylist:{
        fontSize:14,
        color: "#d1d1d1",
        letterSpacing: -0.34,
      },
      commn:{
        flexDirection:'row', 
        // justifyContent: 'space-between',
        // alignContent: 'stretch',
        // alignItems:'center',
        width:'100%'
      },
      cnum:{
        color:'#22B1FF',
      },
    button: {
        height: 40,
        width:206,
        borderRadius: 4,
        backgroundColor: '#22B1FF',
        justifyContent: 'center',
        padding:10,
        position:'absolute',
        top:326,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
    },
    detail:{
        fontSize:14,
        color:"#000",
        letterSpacing:0.13, 
    },
    input:{
      position:'absolute',
    }
});
