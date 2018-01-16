import React, { Component } from 'react';
import { TextInput} from 'react-native';

export default class PassWord extends Component {
  constructor(props) {
    super(props);
    this.state = { text: ''
   }
  }
  componentWillMount(){
    this.setState({
         text:this.props.texts
    })
  }
  render() {
    return (
      <TextInput
        style={{minHeight: 32, borderColor: 'transparent', borderWidth: 1,padding: 0,width:'100%',color:'#D1D1D1'}}
        underlineColorAndroid="transparent"
        onChangeText={(text) => this.setState({text})}
        maxLength = {326}
        multiline = {true}
        // numberOfLines = {4}
        value={this.state.text}
        // autoFocus={true}
      />
    );
  }
}