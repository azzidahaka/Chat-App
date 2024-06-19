import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']); //Dismiss async deprecated warning

export default function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDcy2h_2gWEz9-3vLmE2lDF2dCtTuLwFyk',
    authDomain: 'chatapp-a89b4.firebaseapp.com',
    projectId: 'chatapp-a89b4',
    storageBucket: 'chatapp-a89b4.appspot.com',
    messagingSenderId: '750788508120',
    appId: '1:750788508120:web:30d75caad942c84fc51aad',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
