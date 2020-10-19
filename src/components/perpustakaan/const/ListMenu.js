import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { TouchableRipple, withTheme } from 'react-native-paper';
const ListMenu = props => {
  const {
    name,
    defaulty,
    active,
    onChange,
    ...attributes
  } = props;
  const guru = require('./../../../assets/guru.png')
  const guru_active = require('./../../../assets/guru_active.png')
  return (
    <TouchableRipple 
      onPress={onChange}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View style={active ? styles.containerActive : styles.container}>
        <Image
            source={active ? guru_active : guru}
            style={styles.iconImage}
        />
        <Text style={active ? styles.dataTextActive : styles.dataText}>{name}</Text>
      </View>
    </TouchableRipple>
  )
}


const styles = StyleSheet.create({
    containerActive:{
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    container:{
      paddingVertical: 15,
      alignItems: 'center'
    },
    dataText:{
      textAlign: 'center',
    },
    dataTextActive: {
        textAlign: 'center',
        color: '#0F8B43'
    },
    iconImage:{
      width: 30,
      height: 30,
    },
});

export default ListMenu;