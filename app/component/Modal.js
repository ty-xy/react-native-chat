/*
 * @Author: toringo 
 * @Date: 2018-01-15 10:53:43 
 * @Last Modified by: tori
 * @Last Modified time: 2018-01-15 14:41:52
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
  } from 'react-native';
   
export default class MyModal extends Component {
    static propTypes = {
        children: PropTypes.element,
        cardcaseVisible: PropTypes.bool,
        footer: PropTypes.node,
        headerText: PropTypes.string,
        headerTextAlign: PropTypes.string,
        _handleSend: PropTypes.func,
        _setModalVisible: PropTypes.func
    };
    constructor(props){
      super(props);
      this.state = {
      };
    }
   
    render() {
        const colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        const { cardcaseVisible, footer, headerText, headerTextAlign, _handleSend, _setModalVisible } = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={cardcaseVisible}
                onRequestClose={() => {_setModalVisible(false)}}
            >
                <View style={[styles.container]}>
                    <View style={[styles.innerContainer]}>
                        <View style={[styles.modalHeader, {alignSelf: headerTextAlign}]}>
                            <Text style={styles.modalHeaderText}>{headerText}</Text>
                        </View>
                        <View style={styles.modalBody}>
                            {this.props.children}
                        </View>
                        {footer || (<View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.modalbtn}
                                onPress={() => {_setModalVisible(false)}}
                            >
                                <Text style={styles.modelfooterText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalbtn, { borderLeftColor: '#ccc', borderLeftWidth: 1 }]}
                                onPress={_handleSend}
                            >
                                <Text style={styles.modelfooterText}>发送</Text>
                            </TouchableOpacity>                            
                        </View>)}
                    </View>
                </View>
            </Modal>
      );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    innerContainer: {
        borderRadius: 10,
        paddingTop: 20,
        backgroundColor: '#f7f7f7',
    },
    modalHeader: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
    },
    modalHeaderText: {
        // textAlign: 'left',
    },
    modalBody: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    modalFooter: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    modalbtn: {
        padding: 15,
        alignItems: 'center',
        flex: 1,
    },
    modelfooterText: {
        textAlign: 'center',
        color: '#29B6F6',
    },
});
