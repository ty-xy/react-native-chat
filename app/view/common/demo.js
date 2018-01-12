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
        console.log('_handleShowPhotoList')
        this.setState({ showOpacity: true });
    }
    hide = (name) => {
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
    render() {
        const { uris, photos, showOpacity } = this.state;
        const photosView = [];
        const photoCategory = [];
        console.log('uris', uris)
        for(var i = 0; i < uris.length ; i += 3){
            photosView.push(
                <View key={uris[i].uri} style={styles.row}>
                    {uris[i] ? <TouchableOpacity style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i].uri}}/>
                        {uris[i].seleted ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />}
                    </TouchableOpacity> : null}
                    {uris[i+1] ? <TouchableOpacity style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+1].uri}}/>
                        {uris[i+1].seleted ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />}
                    </TouchableOpacity> : null}
                    {uris[i+2] ? <TouchableOpacity style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2].uri}}/>
                        {uris[i+2].seleted ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />}
                    </TouchableOpacity> : null}
                    {uris[i+3] ? <TouchableOpacity style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2].uri}}/>
                        {uris[i+3].seleted ? <Text style={styles.selectedIcon}>&#xe63f;</Text> : <View style={styles.selectCircle} />}
                    </TouchableOpacity> : null}
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
                {showOpacity ? <PhotoList photoCategory={photoCategory} hide={this.hide} /> : null}
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
        flexDirection: 'row',
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
