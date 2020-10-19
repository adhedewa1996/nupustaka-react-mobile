import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TextInput, CheckBox, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux'
import { fetchKoleksiBook } from './../../actions'
import axios from 'axios';
import { onToken } from '../../actions/auth';

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      koleksi: []
    };
    this.getKoleksi = this.getKoleksi.bind(this);
  }
  componentDidMount(){
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 2000);
      this.props.getKoleksiBook()
      this.getKoleksi();
      console.log(this.state.koleksi)
  }

  getKoleksi(){
      onToken().then(res => {
          const AuthStr = 'Bearer ' + res;
          axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/get/transaction/all`, {
              headers: {
                  Authorization: AuthStr
              }
          }).then(response => {
              this.setState({
                koleksi: response.data.data
              });
          }).catch(err => (err));
      })
  }

  render() {
    const { loading } = this.state;
    const { koleksibook, navigation } = this.props;
    return (
      <View style={{flex:1}}>
      {
        loading ?
        <View key="1" style={{flex:1, justifyContent: "center", alignContent: 'center'}}>
          <ActivityIndicator animating={true} size="large" color="#0F8B43" />
        </View> :
        <ScrollView style={{flex: 1, backgroundColor: '#ffffff', margin:10}} showsVerticalScrollIndicator={false}>
        { this.state.koleksi == '' ? 
        <View style={styles.NoContent}>
          <Text>Anda Belum Punya Koleksi </Text>
          <Button mode="contained" onPress={() => navigation.navigate('Kategori', {title: 'Buku Terbaru', id: '3'})} style={{marginTop: 20}}> Lihat Buku Terbaru </Button>
        </View>
        :
          <View>
            <Text style={styles.dir}> Koleksi Saya </Text>
            <View style={{ flexDirection: 'row', flex:1, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 0, marginTop: 10, paddingHorizontal: 5}}>
              {
                  this.state.koleksi.map((item, x) => (
                    <TouchableRipple
                    key={x}
                    onPress={() => navigation.navigate('DetailBuku', {id:item.books.id})}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={styles.Container}
                    >
                        <View style={{flex: 1}}>
                            <Card style={styles.Box}>
                                <Card.Cover source={{ uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.books.picture }} style={styles.CoverImage} />
                            </Card>
                            <View style={{paddingHorizontal:5}}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                                    {item.books.title}
                                </Text>
                                <Text style={styles.Content}>{item.books.halaman} halaman</Text>
                            </View>
                        </View>
                    </TouchableRipple>
                  ))
              }
            </View>
          </View>
        }
      </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NoContent:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions .get('window').height - 200,
    // paddingTop: 100
  },
  Container:{
    width: 120,
    height: 225,
    // backgroundColor: 'red',
    position: 'relative',
    margin: 5,
    marginBottom: 30,
    borderRadius:10
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
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dir:{
    fontSize: 20,
    margin: 10,
  },
  Title:{
    // fontSize: 12,
    // marginTop: 30,
    // lineHeight: 15,
  },
  Content:{
    color: '#404040',
    fontSize: 12
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


function mapStateToProps(state) {
  console.log(state.koleksibook.items)
  return {
    koleksibook: state.koleksibook.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getKoleksiBook: () => dispatch(fetchKoleksiBook()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
