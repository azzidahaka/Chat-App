import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo'; //used to get  network connection state
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();
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
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      //stop firebase from attempting to connect to db when offline
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
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
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
