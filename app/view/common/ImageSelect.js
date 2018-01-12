import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import FadeInView from './FadeInView';



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
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        const uris = navigation.state.params && navigation.state.params.uris || [];
        const photos = navigation.state.params && navigation.state.params.photos || [];
        this.setState({ uris, photos });
    }
    _handleSendMsg = () => {
        
    }
    render() {
        const { uris, photos } = this.state;
        const photosView = [];
        const photoCategory = [];
       
        for(var i = 0; i < uris.length ; i += 3){
            photosView.push(
                <View key={i} style={styles.row}>
                    <TouchableOpacity
                        style={styles.flex}
                        onPress={this._handleSendMsg}
                    >
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i]}}/>
                    </TouchableOpacity>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+1]}}/>
                    </View>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2]}}/>
                    </View>
                </View>
            )
        }
        for (let name in photos) {
            photoCategory.push({ name, detail: photos[name] })
        }
        console.log('render', photosView, photoCategory)
        return (
            <ScrollView>
                <View style={styles.container}>
                    {photosView}
                </View>
                {}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems:'center'
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
});
