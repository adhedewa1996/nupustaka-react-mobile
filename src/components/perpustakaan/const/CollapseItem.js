import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const CollapseItem = props => {
    const {
        titleItem,
        onPress,
        ...attributes
    } = props;
    return (
            <TouchableRipple
                onPress={onPress}
                rippleColor="rgba(0, 0, 0, .32)"
                style={{width: screenWidth/4}}
            >
                <View flexDirection="column" style={{justifyContent: "center", alignContent: 'center', paddingBottom: 10, paddingTop: 10}}>
                    <Image  
                        style={{flex:1, alignSelf: 'center'}} 
                        source={require('./../../../assets/iconKatalog/MI1.png')} 
                        resizeMode="contain"
                    />
                    <Text style={{textAlign: 'center', color: '#716f6f'}}>{titleItem}</Text>
                </View>
            </TouchableRipple>
    )
}


const styles = StyleSheet.create({
  
});

export default CollapseItem;