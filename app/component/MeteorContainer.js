/*
 * @Author: toringo 
 * @Date: 2018-01-18 14:28:40 
 * @Last Modified by: tori
 * @Last Modified time: 2018-01-18 14:46:38
 */
import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { Text } from 'react-native';

  
/*
    * title: 页面标题 
    * tabBarLabel: 导航栏名称
    * tabBar: 导航栏图标
    * subCollection: 监听数据库,
*/
const Create = (title, tabBarLabel, tabBar, subCollection) => WrappedComponent =>
    class Wrapper extends Component{
        static navigationOptions = {
            title,
            tabBarLabel,
            alignSelf: 'center',
            headerStyle: {
                height: 49,
                backgroundColor: '#fff',
            },
            headerLeft: null,
            headerTitleStyle: {
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: 'normal'
            },
            tabBarIcon: ({ tintColor }) => (tabBar(tintColor)),
        }
        render () {
            const Container = createContainer(params => {
                return subCollection();
            }, WrappedComponent);
            return <Container {...this.props} />;
        }
    }


export default Create;
