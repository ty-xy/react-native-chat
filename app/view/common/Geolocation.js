import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    StatusBar
} from 'react-native';

import Geolocation from 'Geolocation';

export default class Location extends PureComponent {
    static navigationOptions = {
        header: null,
        headerLeft: null,
    }
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    //获取位置
    getLocation() {
        console.log('getLocation')
        Geolocation.getCurrentPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                            "\n经度：" + location.coords.longitude +
                            "\n纬度：" + location.coords.latitude +
                            "\n准确度：" + location.coords.accuracy +
                            "\n行进方向：" + location.coords.heading +
                            "\n海拔：" + location.coords.altitude +
                            "\n海拔准确度：" + location.coords.altitudeAccuracy +
                            "\n时间戳：" + location.timestamp;
                console.log(result);
            },
            error => {
                console.log("获取位置失败："+ error)
            }
        );
    }
     /** 获取地理位置（经纬度） */
    getPosition = () => {
        /** 获取地理位置 */
        navigator.geolocation.getCurrentPosition(
        (position) => {
            // console.warn('成功：' + JSON.stringify(position));
            const positionData = position.coords;
            // 经度：positionData.longitude
            // 纬度：positionData.latitude

            // 最后一步 todo：高德 || 百度地图逆地理编码转~~具体就是调个接口把经纬度丢进去就行了
            console.log('getPosition', positionData);
        },
        (error) => {
            console.error('失败：' + JSON.stringify(error.message))
        }, {
            // 提高精确度，但是获取的速度会慢一点
            enableHighAccuracy: true,
            // 设置获取超时的时间20秒
            timeout: 20000,
            // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
            maximumAge: 1000
        }
        );
    }
    render() {
        const { style = {}, lastMessage, _id, name } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {/* <Text style={styles.cancel} onPress={this._goBack}>Geolocation</Text> */}
                <Text style={styles.cancel} onPress={this.getPosition}>获取位置</Text>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    cancel: {
        color: '#fff',
        fontSize: 20,
    },
    preview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    toolBar: {
        width: 200,
        margin: 40,
        backgroundColor: '#000000',
        justifyContent: 'space-between',
     
    },
    button: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
    },
});
