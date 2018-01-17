import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Camera from 'react-native-camera';



export default class MyCamera extends PureComponent {
    static navigationOptions = {
        header: null,
        headerLeft: null,
    }
    static propTypes = {
        style: PropTypes.object,
        _id: PropTypes.any,
        lastMessage: PropTypes.string,
        name: PropTypes.string,
        _goChatWindow: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            cameraType: Camera.constants.Type.back,
        };
    }

    //切换前后摄像头
    switchCamera = () => {
        var cameraType = this.state.cameraType;
        if(cameraType === Camera.constants.Type.back) {
            cameraType = Camera.constants.Type.front;
        }else{
            cameraType = Camera.constants.Type.back;
        }  
        this.setState({ cameraType });
    }
    _goBack = () => {
        this.props.navigation.goBack()
    }
    //拍摄照片
    takePicture = () => {
        this.camera.capture()
            .then(function(data){
                alert("拍照成功！图片保存地址：\n"+data.path)
            })
            .catch(err => console.error(err));
    }
    render() {
        const { style = {}, lastMessage, _id, name } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Text style={styles.back} onPress={this.switchCamera}>&#xe642;</Text>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <Text style={[styles.goback]} onPress={this.takePicture} onPress={this._goBack}>&#xe63b;</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.button}
                        onPress={this.takePicture}

                    >
                        <View style={styles.button2}></View>
                    </TouchableOpacity>
                    <View />
                </Camera>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        flex: 1,
        flexDirection: 'row',
    },
    back: {
        fontFamily: 'iconfont',
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: 30,
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 3,
        padding: 10,
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        position: 'relative',
    },
    goback: {
        fontFamily: 'iconfont',
        color: '#fff',
        backgroundColor: 'transparent',
        transform: [{ rotateZ: '90deg' }],
        fontSize: 40,
        position: 'absolute',
        left: 50,
        bottom: 88,
        textAlign: 'center',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        height: 66,
        width: 66,
        borderRadius: 33,
        marginBottom: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2: {
        backgroundColor: '#fff',
        height: 46,
        width: 46,
        borderRadius: 23,
    }
});
