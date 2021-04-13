import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Graph from '../AirInfo/Assets/screens/graph';
import Login from './Assets/screens/login';
import Register from './Assets/screens/register';
import {Provider} from 'react-redux';
import store from './Assets/Redux/store';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Graph" component={Graph} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
