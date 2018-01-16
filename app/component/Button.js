/*
 * @Author: toringo 
 * @Date: 2018-01-15 10:53:43 
 * @Last Modified by: tori
 * @Last Modified time: 2018-01-15 12:21:45
 */

import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal,
    Switch,
  } from 'react-native';
   
export default class Button extends Component {
    constructor(props){
      super(props);
      this.state = {
        active: false,
      };
      this._onHighlight = this.onHighlight.bind(this);
      this._onUnhighlight = this.onUnhighlight.bind(this);
    }
   
    onHighlight() {
      this.setState({active: true,});
    }
   
    onUnhighlight() {
      this.setState({active: false,});
    }
   
    render() {
      const colorStyle = {
        color: this.state.active ? '#fff' : '#000',
      };
      return (
        <TouchableHighlight
            onHideUnderlay={this._onUnhighlight}
            onPress={this.props.onPress}
            onShowUnderlay={this._onHighlight}
            style={[styles.button]}
            underlayColor="#a9d9d4"
        >
            <Text style={[styles.buttonText]}>{this.props.children}</Text>
        </TouchableHighlight>
      );
    }
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        flex: 1,
        // height: 44,
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    buttonText: {
        fontSize: 18,
        // paddingTop: 30,
        textAlign: 'center',
    }
});
