# 壹建联手机App，用React Native创建

## 开发模式启动

### 安卓启动
    `npm run android`

### ios启动
    `npm run ios`



## mock服务器启动 (未配置，后面看技术需求)
    命令： `npm run mock`
    
    
## 1.react-navigation设置navigationOptions中Static中使用this的方法
static navigationOptions = ({navigation, screenProps}) => ({    
        headerLeft:(  
            <Text onPress={()=>navigation.state.params.navigatePress()} style={{marginLeft:5, width:30, textAlign:"center">  
                <Icon  name='ios-arrow-back'size={24} color='white' />  
            </Text>  
        )  
    });  
  
    _onBackAndroid=()=>{  
        alert('点击headerLeft');  
    }  
      
    componentDidMount(){  
        //在static中使用this方法  
        this.props.navigation.setParams({ navigatePress:this._onBackAndroid })  
    } 
## 2.路由 React Navigation 网址 https://reactnavigation.org/docs/intro/headers
## 3.与后台连接   react-native-meteor 网址 https://github.com/inProgress-team/react-native-meteor 
## 4.Modal  onShow方法在组件显示以后调用

