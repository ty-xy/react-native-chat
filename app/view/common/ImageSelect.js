import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    CameraRoll,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PhotoList from './PhotoList';
import toast from '../../util/util'

export default class SelectImage extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
    };
    static navigationOptions = ({ navigation }) => ({
        //左侧标题
        // headerTitle: '图片选择',
        title: '图片选择',
        headerStyle: {
            height: 49,
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            // alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'normal'
        },
        headerRight: (navigation.state.params && navigation.state.params.selectedImg && navigation.state.params.selectedImg.length ?
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={() => {
                    navigation.state.params.seletedImgGoChat();
                }}
            >
                <Text style={{marginRight: 10, fontSize: 18, color: '#29B6F6'}}>确定</Text>
            </TouchableOpacity> : null
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            uris: [],
            isShowPhotoList: false,
            photos: {},
            selectedImg: [],
        };
    }
    componentWillMount() {
        this._showPhotoList()
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            seletedImgGoChat: this._goChatWindow,
            selectedImg: this.state.selectedImg,
        });
    }
    // 激活相册
    _showPhotoList = () => {
        const { navigation } = this.props;
        const _that = this;
        CameraRoll.getPhotos({
            first: 200, //参数 获取最近五张图片
            // groupTypes: 'All',
            // assetType: 'Photos'
        }).done( 
            (data) => { //成功的回调     
                const edges = data.edges;   
                const photos = [];  
                const uris = [];
                for (var i in edges) { 
                    photos.push(edges[i].node);  
                    uris.push(edges[i].node.image.uri);
                }
                const _photos = toast.photoCategory(photos);
                // navigation.navigate('SelectImage', { photos: _photos || {}, uris: uris.slice(0, 5) });
                this.setState({ uris: uris.slice(0, 5), photos: _photos });
            },         
            (error) => { //失败的回调
                console.log(error.message);
            }
        )
    }
    // 图片选择返回聊天页面
    _goChatWindow = () => {
        // console.log('_goChatWindow', this.state.selectedImg);
        const { selectedImg } = this.state;
        const { navigation } = this.props;
        navigation.navigate('ChatWindow', { id: '323', selectedImg });
    }
    // 显示相册
    _handleShowPhotoList= () => {
        this.setState({ isShowPhotoList: true });
    }
    // 隐藏相册
    _handleHidePhotoList = (name) => {
        const { photos } = this.state;
        const uris = [];
        if (name === 'all_photos') {
            for (let item in photos) {
                photos[item].forEach((item) => {
                    uris.push(item.image.uri);
                });
            }
        } else {
            for (let item in photos) {
                if (item === name) {
                    photos[item].forEach((item) => {
                        uris.push(item.image.uri);
                    });
                }
            }
        }
        this.setState({ isShowPhotoList: false, uris });
    }
    // 选中
    _handleSelect = (uri) => {
        const selectedImg = this.state.selectedImg;
        const { navigation } = this.props;
        if (selectedImg.indexOf(uri) > -1) {
            selectedImg.splice(selectedImg.indexOf(uri), 1);
        } else {
            selectedImg.push(uri);
        }
        navigation.setParams({
            selectedImg,
        });
        this.setState({ [`showSelected_${uri}`]: !this.state[`showSelected_${uri}`], selectedImg, isShowPhotoList: false });
    }
    // 预览
    _handlePreviewPhoto = (uri) => {
        const { navigation } = this.props;
        const { selectedImg } = this.state;
        console.log('预览', selectedImg)
        navigation.navigate('PreviewImg', { selectedImg });
    }
    render() {
        const { uris, photos, isShowPhotoList, selectedImg, navigation } = this.state;
        const { state = {} } = this.props.navigation;
        const photosView = [];
        const photoCategory = [];
        for(var i = 0; i < uris.length ; i += 4){
            photosView.push(
                <View key={i} style={styles.row}>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i]}}/>
                        {uris[i] ? (this.state[`showSelected_${uris[i]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+1])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+1]}}/>
                        {uris[i+1] ? (this.state[`showSelected_${uris[i+1]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+2])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2]}}/>
                        {uris[i+2] ? (this.state[`showSelected_${uris[i+2]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+3])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+3]}}/>
                        {uris[i+3] ? (this.state[`showSelected_${uris[i+3]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                </View>
            )
        }
        for (let name in photos) {
            photoCategory.push({ name, detail: photos[name] })
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    { photosView }
                </ScrollView>
                <View style={styles.footer}>
                    <Text onPress={this._handleShowPhotoList} style={{color: '#666666'}}>所有相册</Text>
                    <Text style={{color: selectedImg.length ? '#29B6F6': '#999999'}} onPress={this._handlePreviewPhoto}>预览 ({selectedImg.length})</Text>
                </View>
                {isShowPhotoList ? <PhotoList
                    photoCategory={photoCategory}
                    uris={uris}
                    _handleHidePhotoList={this._handleHidePhotoList}
                    allPhotos={state.params && state.params.uris || []}
                /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex:{
        flex:1,
        position: 'relative',
    },
    container: {
        flex:1,
        position: 'relative',
    },
    row:{
        flexDirection: 'row'
    },
    image:{
        height: 100,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        // borderWidth: 1,
        // borderColor: '#ddd'
    },
    selectCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderColor: '#ffffff',
        borderWidth: 1,
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 15,
    },
    selectedIcon: {
        color: '#29B6F6',
        fontFamily: 'iconfont',
        fontSize: 22,
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 15,
        backgroundColor: '#ffffff',
        borderRadius: 11,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
