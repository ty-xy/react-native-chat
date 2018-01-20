/*
 * @Author: toringo 
 * @Date: 2018-01-18 14:28:40 
 * @Last Modified by: tori
 * @Last Modified time: 2018-01-20 13:44:36
 */
import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { Text } from 'react-native';

  
/*
    * navigationOptions: 导航、路由配置 
    * subCollection: 监听数据库,
*/
const Create = (navigationOptions, subCollection) => WrappedComponent =>
    class Wrapper extends Component{
        static navigationOptions = ({navigation}) => navigationOptions(navigation)
        render () {
            const Container = createContainer(params => {
                return subCollection();
            }, WrappedComponent);
            return <Container {...this.props} />;
        }
    }


export default Create;
