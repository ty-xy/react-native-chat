
import {
    Platform,
    ToastAndroid,
} from 'react-native';

export default {
    toast: (text, _this) => {
        if (Platform.OS === 'ios') {
            _this.toast.show(text);
        } else {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        }
    }
};