/**
 * 路由重置: 消除历史记录
 * navigation
 * routeName: 路由名称
 *
**/

import { NavigationActions } from 'react-navigation';

const reset = (navigation, routeName) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });
  navigation.dispatch(resetAction);
};

const back = (navigation, routeName) => {
    const resetAction = NavigationActions.back({
        key: routeName
    });
    navigation.dispatch(resetAction);
};


export default {
  reset,
  back
};
