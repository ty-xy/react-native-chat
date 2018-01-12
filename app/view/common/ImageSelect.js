import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import PhotoList from './PhotoList';



export default class SelectImage extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
    };
    static navigationOptions = ({navigation, screenProps}) => ({
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
    });

    constructor(props) {
        super(props);
        this.state = {
            uris: [],
            showOpacity: false,
            photos: {},
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        const uris = navigation.state.params && navigation.state.params.uris || [];
        const photos = navigation.state.params && navigation.state.params.photos || [];
        this.setState({ uris, photos });
    }
    _handleShowPhotoList= () => {
        this.setState({ showOpacity: true });
    }
    _handleHidePhotoList = (name) => {
        const { photos } = this.state;
        console.log('photos', photos)
        const uris = [];
        for (let item in photos) {
            if (item === name) {
                photos[item].forEach((item) => {
                    uris.push(item.image.uri);
                });
            }
        }
        this.setState({ showOpacity: false, uris });
    }
    // 选中
    _handleSelect = (uri) => {
        console.log('_handleSelect', uri, [`showSelected${uri}`])
        this.setState({ [`showSelected${uri}`]: !this.state[`showSelected${uri}`] });
    }
    render() {
        const { uris, photos, showOpacity } = this.state;
        const photosView = [];
        const photoCategory = [];
        console.log('uris', uris)
        for(var i = 0; i < uris.length ; i += 4){
            photosView.push(
                <View key={i} style={styles.row}>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i]}}/>
                        {uris[i] ? (this.state[`showSelected${uris[i]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+1])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+1]}}/>
                        {uris[i+1] ? (this.state[`showSelected${uris[i+1]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+2])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2]}}/>
                        {uris[i+2] ? (this.state[`showSelected${uris[i+2]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flex} onPress={this._handleSelect.bind(this, uris[i+3])}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+3]}}/>
                        {uris[i+3] ? (this.state[`showSelected${uris[i+3]}`] ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />) : null}
                    </TouchableOpacity>
                </View>
            )
        }
        for (let name in photos) {
            photoCategory.push({ name, detail: photos[name] })
        }
        return (
            <View style={styles.container}>
                <ScrollView >
                    {photosView}
                </ScrollView>
                <View style={styles.footer}>
                    <Text onPress={this._handleShowPhotoList} style={{color: '#666666'}}>所有相册</Text>
                    <Text style={{color: '#29B6F6'}}>预览</Text>
                </View>
                {showOpacity ? <PhotoList photoCategory={photoCategory} _handleHidePhotoList={this._handleHidePhotoList} /> : null}
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
        borderWidth: 1,
        borderColor: '#ddd'
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
