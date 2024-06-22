import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, wrapperStyle, TouchableOpacity, iconTextStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; //Library that gives access to select images and videos
import * as MediaLibrary from 'expo-media-library'; //library lets saves pictures taken in app
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
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

  const actionSheet = useActionSheet();
  //display ActionSheet with four options
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
