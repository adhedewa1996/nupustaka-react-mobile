import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';

const CollapseMenu = props => {
  const {
    goToPress,
    goToCollapse,
    titleMenu,
    ...attributes
  } = props;
  return (
    <TouchableRipple
      onPress={goToPress}
      rippleColor="rgba(0, 0, 0, .32)" 
    >
      <View flexDirection="row" style={{justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
        <Text>{titleMenu}</Text>
        <View >
          <IconButton
            icon="chevron-down"
            size={22}
            onPress={goToCollapse}
          />
        </View>
      </View>
    </TouchableRipple>
  )
}


const styles = StyleSheet.create({
  
});

export default CollapseMenu;