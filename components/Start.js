import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  //use state to set username and color selected
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const colorBtn = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const isSelected = (selected) => selected == color;
  //function to sign in anonymously
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', { userID: result.user.uid, name: name, color: color });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try later again.');
      });
  };

  return (
    <View style={styles.container}>
      {/* using ImageBackground component from reactnative library to set background image */}
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.startContainer}>
          <View style={styles.userContainer}>
            <Image
              style={styles.uIcon}
              source={require('../assets/icon.png')}
            />
            <TextInput
              style={[styles.textInput, { paddingLeft: 50 }]}
              value={name}
              onChangeText={setName}
              placeholder='Your name'
              placeholderTextColor='#757083'></TextInput>
          </View>
          <Text style={styles.bgText}>Choose a Background Color:</Text>
          <View style={styles.colours}>
            {/* change state of color when each color is selected */}
            {colorBtn.map((colorBtn, index) => (
              // used parent view to house background change button and edited style to create a round border around selected button
              <View
                key={index}
                style={[styles.btnBorder, { borderWidth: isSelected(colorBtn) ? 3 : 0 }]}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole='button'
                  accessibilityHint='Changes the background color for the chat room'
                  style={[styles.colorButton, { backgroundColor: colorBtn }]}
                  onPress={() => setColor(colorBtn)}></TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.startButton}
            accessible={true}
            accessibilityRole='button'
            accessibilityHint='navigates to the chat room'
            // use navigation to go to next screen while passing variables to be used as props
            onPress={signInUser}>
            <Text style={styles.startText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    marginTop: '15%',
    marginBottom: '55%',
  },
  startContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '88%',
    height: '44%',
    backgroundColor: 'white',
  },
  userContainer: {
    position: 'relative',
    width: '88%',
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.5,
  },
  uIcon: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
  bgText: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  colours: {
    width: '88%',
    flexDirection: 'row',
  },
  btnBorder: {
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: 'center',
    marginRight: 10,
    borderColor: '#757083',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 4,
    // padding: 15,
    // borderWidth: 2,
    borderColor: 'white',
  },
  startButton: {
    width: '88%',
    height: '15%',
    backgroundColor: '#757083',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Start;
