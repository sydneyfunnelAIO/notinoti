import * as React from 'react';

import {Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Detail from './src/screens/Detail';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from './src/components/Logo';
import {MyContext} from './src/components/MyContext';
import {NavigationContainer} from '@react-navigation/native';
import Youtube from "./src/screens/Youtube"
import color from './assets/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/components/RootNavigation';

const Stack = createStackNavigator();
function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 10,

          flex: 1,
          color: color.secondary,
        },

        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: color.secondary,
        headerTitleAlign: 'center',
        animationTypeForReplace: 'pop',
        backgroundColor: color.secondary,
      }}>
      <Stack.Screen
        name="Twitchifier"
        options={{headerTitle: (props) => <Logo></Logo>}}
        component={Home}
      />
      <Stack.Screen
        name="Twitter"
        options={{headerTitle: (props) => <Logo></Logo>}}
        component={Detail}
      />
    </Stack.Navigator>
  );
}
const DetailStack = createStackNavigator();
function YoutubeNavigator(){
  return(
    <DetailStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 100,

          flex: 1,
          color: color.secondary,
        },

        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: color.secondary,
        headerTitleAlign: 'center',
        animationTypeForReplace: 'pop',
        backgroundColor: color.secondary,
      }}>
      <DetailStack.Screen
        name="Youtube"
        options={{headerTitle: (props) => <Logo></Logo>}}
        component={Youtube}
      />
    </DetailStack.Navigator>
  )
}
function DetailNavigator() {
  return (
    <DetailStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 100,

          flex: 1,
          color: color.secondary,
        },

        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: color.secondary,
        headerTitleAlign: 'center',
        animationTypeForReplace: 'pop',
        backgroundColor: color.secondary,
      }}>
      <DetailStack.Screen
        name="Twitter"
        options={{headerTitle: (props) => <Logo></Logo>}}
        component={Detail}
      />
    </DetailStack.Navigator>
  );
}
const Bottom = createBottomTabNavigator();

export default function App() {
  return (
    <MyContext>
      <NavigationContainer ref={navigationRef}>
        <Bottom.Navigator
          tabBarOptions={{
            activeTintColor: color.primary,
            inactiveTintColor: color.primary,
            activeBackgroundColor: color.dark,
            inactiveBackgroundColor: color.dark2,
            tabStyle: {
              alignSelf: 'center',
              justifyContent: 'center',
              padding: wp(0),
            },
            showLabel: false,
            labelStyle: {
              fontSize: hp(1),
            },
          }}
          screenOptions={({route}) => ({
            tabBarIcon: () => {
              if (route.name === 'Main') {
                return (
                  <View>
                    <Icon
                      name={'logo-twitch'}
                      size={30}
                      color={`${color.primary}`}
                    />
                  </View>
                );
              } else if (route.name === 'Twitter') {
                return (
                  <View>
                    <Icon
                      name={'logo-twitter'}
                      size={30}
                      color={`${color.primary}`}
                    />
                  </View>
                );
              } else if (route.name === 'Youtube') {
                return (
                  <View>
                    <Icon name={"logo-youtube"} size={30} color={color.primary} />
                  </View>
                );
              }
            },
          })}>
          <Bottom.Screen name="Main" component={MainNavigator} />
          <Bottom.Screen name="Twitter" component={DetailNavigator} />
          <Bottom.Screen name="Youtube" component={YoutubeNavigator} />

        </Bottom.Navigator>
      </NavigationContainer>
    </MyContext>
  );
}
