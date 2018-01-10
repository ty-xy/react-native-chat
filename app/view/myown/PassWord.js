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
    console.log(this.props.texts)
    return (
      <TextInput
        style={{minHeight: 40, borderColor: 'transparent', borderWidth: 1,padding: 0,width:'100%'}}
        underlineColorAndroid="transparent"
        onChangeText={(text) => this.setState({text})}
        maxLength = {326}
        multiline = {true}
        // numberOfLines = {4}
        value={this.state.text}
        autoFocus={true}
      />
    );
  }
}