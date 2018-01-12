import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';



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
    render() {
        const { uris } = this.state;
        const photosView = [];
        const photoCategory = [];
        console.log('render', this.props, this.state)
        for(var i = 0; i < uris.length ; i += 3){
            photosView.push(
                <View key={i} style={styles.row}>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i]}}/>
                        {}
                    </View>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+1]}}/>
                    </View>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:uris[i+2]}}/>
                    </View>
                </View>
            )
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    {photosView}
                </View>
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
