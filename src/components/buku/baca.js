import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Button, IconButton, Appbar, Dialog, Portal } from 'react-native-paper';
import Pdf from 'react-native-pdf';

export default class Baca extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      files: this.props.navigation.getParam('files'),
      bookID: this.props.navigation.getParam('id'),
      page: 1
    };
  }
  componentDidMount(){
    console.log(this.state.bookID)
  }
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  _showDaftarIsi = () => this.setState({ visible: true });
  _hideDaftarIsi = () => this.setState({ visible: false });

  _showShare = () => this.setState({ visible: true });
  _hideShare = () => this.setState({ visible: false });
  refresh=(data)=> {
    console.log(data)
    this.setState({
      page: data
    })
  }

  render() {
    const source = {uri:'http://powerful-headland-43561.herokuapp.com/asset/files/' + this.state.files, cache:true};
    const { navigation } = this.props;
    const { bookID, page } = this.state;
    return(
      <View style={{flex: 1}}>
        <Appbar style={styles.top}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
          />
          <IconButton
              icon="magnify"
              color={'white'}
              size={25}
              onPress={() => navigation.navigate('SearchText', {id: bookID, page: page, onGoBack: this.refresh})}
          />
        </Appbar>
        <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath)=>{
            console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages)=>{
            console.log(`current page: ${page}`);
        }}
        onError={(error)=>{
            console.log(error);
        }}
        onPressLink={(uri)=>{
            console.log(`Link presse: ${uri}`)
        }}
        page={page}
        style={styles.pdf}/>
        <View style={styles.footerTab}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            onPress={() => navigation.push('DetailBuku', {id:bookID})}
          >
            <Image
              source={require('./../../assets/info.png')}
            />
            <Text style={{fontSize: 10, marginTop: 5}}>Info Buku </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerTab:{
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title:{
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2F2F2F',
    lineHeight: 30,
    letterSpacing: 1,
  },
  description2:{
    paddingHorizontal: 20,
    paddingBottom: 5,
    fontSize: 12,
    color: '#484848',
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  top: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
});
