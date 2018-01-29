/*
 * @Author: toringo 
 * @Date: 2018-01-18 14:28:40 
 * @Last Modified by: tori
 * @Last Modified time: 2018-01-28 21:14:24
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
        componentWillReceiveProps(nextProps) {
            console.log('meteor', nextProps, this.props)
        }
        render () {
            const Container = createContainer(params => {
                
                // Meteor.subscribe('users');
                // console.log('subCollection', Meteor.collection('users').find());
                return subCollection(this.props.navigation);
            }, WrappedComponent);
            return <Container {...this.props} />;
        }
    }


export default Create;
