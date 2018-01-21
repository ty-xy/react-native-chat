import { AsyncStorage } from 'react-native';

export default (key) => ({
  get() {
    return AsyncStorage
      .getItem(key)
      .then((jsonState) => {
        let res = '';
        if (jsonState) {
          res = JSON.parse(jsonState);
        }
        return res;
      });
  },
  set(state) {
    const jsonState = JSON.stringify(state);
    return AsyncStorage.setItem(key, jsonState);
  },
  remove() {
    return AsyncStorage.removeItem(key);
  },
});
