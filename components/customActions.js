import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; //Library that gives access to select images and videos
import * as MediaLibrary from 'expo-media-library'; //library lets saves pictures taken in app

const CustomActions = () => {
  const [image, setImage] = useState(null);

  //function to choose image from library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync(); //get user permission

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
      //assets is the number of images selected, 0 means user can select just one file
      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  //function to take picture
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
        //if permission is granted, save captured image to device library
        if (mediaLibraryPermissions?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
        //assets is the number of images selected, 0 means user can select just one file
        setImage(result.assets[0]);
      } else setImage(null);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title='Pick an image from the library'
        onPress={pickImage}
      />
      <Button
        title='Take a photo'
        onPress={() => {
          takePhoto;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CustomActions;
