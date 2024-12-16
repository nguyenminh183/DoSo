/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CameraPage from './src/CameraPage/CameraPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListPage from './src/List/ListPage';
import DoTayPage from './src/DoTay/DoTayPage';
import LichSu from './src/LichSu/LichSu';
import BangKq from './src/BangKq/BangKq';
import GoiY from './src/GoiY/GoiY';
import Login from './src/Login/Login';
import auth from '@react-native-firebase/auth';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={ListPage}
            />

            <Stack.Screen
              options={{
                title: 'DÒ NHANH',
                headerTitleStyle: styles.headerTitle,
              }}
              name="Camera"
              component={CameraPage}
            />
            <Stack.Screen
              options={{
                title: 'DÒ THỦ CÔNG',
                headerTitleStyle: styles.headerTitle,
              }}
              name="DoTay"
              component={DoTayPage}
            />
            <Stack.Screen
              options={{
                title: 'BẢNG KẾT QUẢ XỔ SỐ',
                headerTitleStyle: styles.headerTitle,
              }}
              name="BangKq"
              component={BangKq}
            />
            <Stack.Screen
              options={{
                title: 'LỊCH SỬ DÒ VÉ',
                headerTitleStyle: styles.headerTitle,
              }}
              name="LichSu"
              component={LichSu}
            />
            <Stack.Screen
              options={{
                title: 'GỢI Ý SỐ',
                headerTitleStyle: styles.headerTitle,
              }}
              name="GoiY"
              component={GoiY}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{title: '', headerTitleStyle: styles.headerTitle}}
              name="Login"
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerTitle: {
    color: '#0099FF',
    fontSize: 24,
  },
});

export default App;
