
import React, { Component } from 'react';
import toast from '../../util/util';
import  QRScannerView  from './Try';
import {
    StyleSheet,
    Text,
  //   FlatList,
    View,
    TouchableOpacity,
    // Button,
  } from 'react-native';

export default class wChat extends Component{
    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',fontSize:20,padding:12}}>Here is title bar</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >Here is bottom menu</Text>
        )
    }

    barcodeReceived(e) {
        Toast.toast('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
    }
    render() {
        return (
            <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />
            // <Text>13213213</Text>
        )
    }
}

