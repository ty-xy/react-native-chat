
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
    },
    // 照片分类
    photoCategory: (data) => {
        const res = {};
        for (let i = 0; i < data.length; i++) {
            const key = data[i].group_name;
            if (res[key] !== undefined) {
                res[key].push(data[i]);
            } else {
                res[key] = [data[i]]
            }
        }
        return res;
    }
};