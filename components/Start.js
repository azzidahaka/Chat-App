import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  //use state to set username and color selected
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  return (
    <View style={styles.container}>
      {/* using ImageBackground component from reactnative library to set background image */}
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.startContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your name'
            placeholderTextColor='#757083'
          />
          <Text style={styles.bgText}>Choose a Background Color:</Text>
          <View style={styles.colours}>
            {/* change state of color when each color is selected */}
            <TouchableOpacity
              style={styles.black}
              onPress={() => setColor('#090C08')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.magenta}
              onPress={() => setColor('#474056')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.gray}
              onPress={() => setColor('#8A95A5')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.teal}
              onPress={() => setColor('#B9C6AE')}></TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            // use navigation to go to next screen while passing variables to be used as props
            onPress={() => navigation.navigate('Chat', { name: name, color: color })}>
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
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    margin: 15,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.5,
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
  black: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#090C08',
    marginRight: 10,
  },
  magenta: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#474056',
    marginRight: 10,
  },
  gray: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8A95A5',
    marginRight: 10,
  },
  teal: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B9C6AE',
    marginRight: 10,
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
