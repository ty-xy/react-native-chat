import React, { Component } from 'react';
import { TextInput} from 'react-native';

export default class PassWord extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '创业就像走在一条长长的道路上，你看不见尽头，望不到边。有人忍受不了孤独而走上众人的通途，有人受不了困苦沿着脚印一步步退后，只有一种人可以看到豁然开朗的景色：他们从不畏孤独、险途，他们始终与梦想相伴，他们记得为什么出发，所以他们始终都能到达'
  }
  }
  render() {
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