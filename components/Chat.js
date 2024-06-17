import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Hello {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
