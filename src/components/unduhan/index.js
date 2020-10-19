import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TextInput, CheckBox, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Drawer, TouchableRipple } from 'react-native-paper';

export default class Index extends Component{
  render() {
    return(
      <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{ flexDirection: 'row', flex:1, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 0, marginTop: 10, paddingHorizontal: 5}}>
            <TouchableRipple
                onPress={() => this.props.navigation.navigate('Baca')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.Container}
            >
                <View>
                    <Card style={styles.Box}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.CoverImage} />
                    </Card>
                    <View style={{paddingHorizontal:5}}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                            Buku Tentang Agama Islam
                        </Text>
                        <Text style={styles.Content}>128 Pages</Text>
                    </View>
                </View>
            </TouchableRipple>
            <TouchableRipple
                onPress={() => this.props.navigation.navigate('Baca')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.Container}
            >
                <View>
                    <Card style={styles.Box}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.CoverImage} />
                    </Card>
                    <View style={{paddingHorizontal:5}}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                            Buku Tentang Agama Islam
                        </Text>
                        <Text style={styles.Content}>128 Pages</Text>
                    </View>
                </View>
            </TouchableRipple>
            <TouchableRipple
                onPress={() => this.props.navigation.navigate('Baca')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.Container}
            >
                <View>
                    <Card style={styles.Box}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.CoverImage} />
                    </Card>
                    <View style={{paddingHorizontal:5}}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                            Buku Tentang Agama Islam
                        </Text>
                        <Text style={styles.Content}>128 Pages</Text>
                    </View>
                </View>
            </TouchableRipple>
            <TouchableRipple
                onPress={() => this.props.navigation.navigate('Baca')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.Container}
            >
                <View>
                    <Card style={styles.Box}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.CoverImage} />
                    </Card>
                    <View style={{paddingHorizontal:5}}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                            Buku Tentang Agama Islam
                        </Text>
                        <Text style={styles.Content}>128 Pages</Text>
                    </View>
                </View>
            </TouchableRipple>
            
            
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  
    Container:{
        width: '33%',
        height: '30%',
        position: 'relative',
        marginBottom: 70
    },
  Box:{
    borderRadius:10,
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowRadius: 1.41,

    elevation: 2,
    position: 'relative',
  },
  Title:{
    marginTop: 10,
    lineHeight: 15,
  },
  Content:{
    color: '#404040',
  },
  Time:{
    color: '#404040',
    lineHeight: 12,
  },
    CoverImage: {
        height: 170
    },
    CardContain: {
        flexDirection: 'row', 
        flex:1, 
        flexWrap: 'wrap', 
        alignItems: 'flex-start', 
        marginBottom: 0, 
        marginTop: 10, 
        paddingHorizontal: 15
    },

});
