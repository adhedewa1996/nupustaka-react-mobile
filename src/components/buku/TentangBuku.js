import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Card, Paragraph, TouchableRipple, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

class TentangBuku extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            penerbit: '',
            author: '',
            isbn: '',
        };
    }
    componentDidMount(){
        this.setState({
            description: this.props.navigation.getParam('description'),
            penerbit: this.props.navigation.getParam('penerbit'),
            author: this.props.navigation.getParam('author'),
            isbn: this.props.navigation.getParam('isbn'),
            halaman: this.props.navigation.getParam('halaman'),
            category: this.props.navigation.getParam('category'),
        })
    } 
    render() {
        const { colors } = this.props.theme;
        const { description, penerbit, author, isbn, halaman, category } = this.state;
        return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
        >
            <View style={{padding: 15}}>
                <Text style={{fontWeight:'400', fontSize: 18}}>Tentang Buku Ini</Text>
                <Text style={{color: colors.text, paddingTop: 10}}>{description}</Text>
            </View>
            <View
                style = {{
                    borderBottomColor: '#e4e6e8',
                    borderBottomWidth: 1,
                }}
            />
            <View style={{paddingHorizontal: 15}}>
                <Text style={{fontWeight:'400', fontSize: 18, paddingTop: 20, paddingBottom:15}}>Info Buku</Text>
                <View flexDirection="row" style={{justifyContent:'space-between', paddingBottom:15}}>
                    <Text style={{color: colors.text}}>Publisher</Text>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>{penerbit}</Text>
                </View>
                <View flexDirection="row" style={{justifyContent:'space-between', paddingBottom:15}}>
                    <Text style={{color: colors.text}}>Penulis</Text>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>{author}</Text>
                </View>
                <View flexDirection="row" style={{justifyContent:'space-between', paddingBottom:15}}>
                    <Text style={{color: colors.text}}>Halaman</Text>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>{halaman}</Text>
                </View>
                <View flexDirection="row" style={{justifyContent:'space-between', paddingBottom:15}}>
                    <Text style={{color: colors.text}}>ISBN</Text>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>{isbn}</Text>
                </View>
                <View flexDirection="row" style={{justifyContent:'space-between', paddingBottom:15}}>
                    <Text style={{color: colors.text}}>Kategori</Text>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>{category}</Text>
                </View>
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
   
});

export default withTheme(TentangBuku);