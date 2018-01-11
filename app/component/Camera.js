import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Camera from 'react-native-camera';



export default class MyCamera extends PureComponent {
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
    switchCamera() {
        var state = this.state;
        if(state.cameraType === Camera.constants.Type.back) {
            state.cameraType = Camera.constants.Type.front;
        }else{
            state.cameraType = Camera.constants.Type.back;
        }
        this.setState(state);
    }

    //拍摄照片
    takePicture() {
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
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <Text style={styles.button} onPress={this.switchCamera.bind(this)}>[切换摄像头]</Text>
                    <Text style={styles.button} onPress={this.takePicture.bind(this)}>[拍照]</Text>
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
