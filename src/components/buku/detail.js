import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import { Paragraph, Button, withTheme, TouchableRipple, Appbar, IconButton} from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchBook, fetchSimilarBook, postBeliBook, fetchCekBeli, postSewaBook, fetchCekSewa, postPinjamBook, fetchCekPinjam, fetchBookmarkBook, fetchCekBookmarkBook } from './../../actions';
import { isSignedIn } from "./../../actions/auth";
import Pinjam from './const/Pinjam';
import Sewa from './const/Sewa';
import Beli from './const/Beli';
import { withNavigation } from 'react-navigation';
import { Loading } from './../../constants';
import Share from 'react-native-share';
import images from './../../../images/imagesBase64';
import moment from 'moment';
const screenWidth = Math.round(Dimensions.get('window').width);

class DetailBuku extends Component{
  constructor(props) {
    super(props);
    this.state = {
        token: '',
        visible: false,
        loading: false,
        loadingbutton: true,
        visibleSewa: false,
        visibleBeli: false,
        datenow: '',
        dateend: '',
        bookId: this.props.navigation.getParam('id'),
        bookmark: false
    };
  }
  componentDidMount() {
    const { bookId } = this.state;
    this.props.getBook(bookId)
    this.props.getSimilarBook(bookId);
    this.props.getCekPembelian(bookId);
    this.props.getCekPenyewaan(bookId);
    this.props.getCekPeminjaman(bookId);
    this.props.getCekBookmark(bookId);
    setTimeout(() => {
      this.setState({
        loadingbutton: false
      })
    }, 3000);

    isSignedIn().then(res => {
      this.setState({
          token: res.token,
          datenow: moment().format('Do MMMM YYYY'),
          dateend: moment().add(7, 'days').format('Do MMMM YYYY'),
      })
    })
  }

  onBeli = () => {
    Alert.alert(
      "KONFIRMASI BELI BUKU",
      "Yakin Akan Beli Buku?",
      [
        { text: "OK", onPress: () => {
          const { bookId } = this.state;
          this.props.beliBook(bookId)
          this.setState({
            loading: true
          })
          setTimeout(() => {
            Alert.alert("Anda Berhasil Membeli Buku")
            this.props.getCekPembelian(bookId);
            this.setState({
              visibleBeli: false,
              loading: false
            })
          }, 5000);
        }}
      ],
      { cancelable: true }
    )
  }

  onSewa = () => {
    // const { bookId } = this.state;
    // this.props.sewaBook(bookId)
    // this.setState({
    //   visibleSewa: false,
    //   loading: true
    // })
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
    //   Alert.alert("Anda Berhasil Menyewa Buku")
    //   this.props.getCekPenyewaan(bookId);
    // }, 5000);
    Alert.alert(
      "KONFIRMASI SEWA BUKU",
      "Yakin Akan Sewa Buku?",
      [
        { text: "OK", onPress: () => {
          const { bookId } = this.state;
          this.props.sewaBook(bookId)
          this.setState({
            loading: true
          })
          setTimeout(() => {
            Alert.alert("Anda Berhasil Menyewa Buku")
            this.props.getCekPenyewaan(bookId);
            this.setState({
              loading: false,
              visibleSewa: false,
            })
          }, 5000);
        }}
      ],
      { cancelable: true }
    )
  }

  onPinjam = () => {
    // const { bookId } = this.state;
    // this.props.pinjamBook(bookId)
    // this.setState({
    //   visible: false,
    //   loading: true
    // })
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
    //   Alert.alert("Anda Berhasil Meminjam Buku")
    //   this.props.getCekPeminjaman(bookId)
    // }, 5000);
    Alert.alert(
      "KONFIRMASI PINJAM BUKU",
      "Yakin Akan Pinjam Buku?",
      [
        { text: "OK", onPress: () => {
          const { bookId } = this.state;
          this.props.pinjamBook(bookId)
          this.setState({
            loading: true
          })
          setTimeout(() => {
            Alert.alert("Anda Berhasil Menyewa Buku")
            this.props.getCekPeminjaman(bookId);
            this.setState({
              visible: false,
              loading: false
            })
          }, 5000);
        }}
      ],
      { cancelable: true }
    )
  }

  onNavigation = () => {
    this.props.navigation.navigate('Token')
    this.setState({
      visibleBeli: false,
    })
  }
  onShare = () => {
    const shareOptions = {
      title: 'Share file',
      url: images.image1,
      failOnCancel: false,
    };
    const ShareResponse = Share.open(shareOptions);
    setResult(JSON.stringify(ShareResponse, null, 2));
  }
  onBookmark = () => {
    const { bookId, bookmark } = this.state;
    this.props.postBookmark(bookId);
    this.props.getCekBookmark(bookId);
    this.setState({
      bookmark : !bookmark
    })
  }
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false, visibleSewa: false, visibleBeli: false });
  _showDialogSewa = () => this.setState({ visibleSewa : true });
  _showDialogBeli = () => this.setState({ visibleBeli: true});

  render() {
    moment.locale('id');
    const { book, navigation, similarbook, cekbeli, ceksewa, cekpinjam, cekbookmarkbook } = this.props;
    const { colors } = this.props.theme;
    const { visible, visibleSewa, visibleBeli, token, datenow, dateend, loading, loadingbutton, bookmark} = this.state; 
    return(
      <View style={{flex:1}}>
        <Appbar style={styles.top}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
          />
          <IconButton
              icon={cekbookmarkbook ? 'bookmark-plus' : 'bookmark-plus-outline'}
              color={'white'}
              size={25}
              onPress={this.onBookmark}
          />
          <IconButton
              icon="magnify"
              color={'white'}
              size={25}
              onPress={() => navigation.navigate('Search')}
          />
          <IconButton
              icon="share-variant"
              color={'white'}
              size={25}
              onPress={this.onShare}
          />
        </Appbar>
        <ScrollView style={{backgroundColor: '#ffffff', marginTop:50}}>
          <Loading loading={loading} />
          <Pinjam 
            visible={visible} 
            _hideDialog={this._hideDialog} 
            picture={book.picture} 
            title={book.title} 
            author={book.author} 
            penerbit={book.penerbit}
            token = {token}
            tokenbook = {book.harga_pinjam}
            date = {datenow}
            dateend={dateend}
            onSubmit={this.onPinjam}
            onNavigation={this.onNavigation}
          />
          <Sewa 
            visible={visibleSewa} 
            _hideDialog={this._hideDialog} 
            picture={book.picture} 
            title={book.title} 
            author={book.author} 
            penerbit={book.penerbit}
            token = {token}
            tokenbook = {book.harga_sewa}
            date = {datenow}
            dateend={dateend}
            onSubmit={this.onSewa}
            onNavigation={this.onNavigation}
          />
          <Beli 
            visible={visibleBeli} 
            _hideDialog={this._hideDialog} 
            picture={book.picture} 
            title={book.title} 
            author={book.author} 
            penerbit={book.penerbit}
            token = {token}
            tokenbook = {book.harga_beli}
            date = {datenow}
            dateend={dateend}
            onSubmit={this.onBeli}
            onNavigation={this.onNavigation}
          />
          <View style={{padding: 10}}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+book.picture}}
                  style={styles.image}
                />
                <View style={{width: '70%', paddingLeft: 20}}>
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.description2}>{book.author}</Text>
                  <Text style={styles.description2}>{book.penerbit}</Text>
                </View>
              </View>
            </View>
            {
              loadingbutton ?
              <ActivityIndicator animating={true} size="large" color="#0F8B43" />
              :
              [
                cekbeli ?
                <Button key="1" onPress={()=> navigation.navigate('Baca', {id: book.id, files: book.files})} mode="contained" style={{marginHorizontal: 10, marginVertical: 15}} color="#329052">
                  Baca Buku
                </Button>
                :
                  ( ceksewa !== null || cekpinjam !== null ?
                    <Button key="2" onPress={()=> navigation.navigate('Baca', {id: book.id, files: book.files})} mode="contained" style={{marginHorizontal: 10, marginVertical: 10}} color="#e8ad0c">
                      <Text style={{color:"white"}}>Baca Sampai { ceksewa !== null && moment(ceksewa.expired_at).format('Do MMMM YYYY') } { cekpinjam !== null && moment(cekpinjam.expired_at).format('Do MMMM YYYY') }</Text>
                    </Button>
                    :
                    <View flexDirection="row" style={{justifyContent:"center"}}>
                      <View style={{paddingHorizontal: 10}}>
                        <Button
                          mode="contained"
                          color="#329052"
                          style={{width: screenWidth/2-30}}
                          onPress={this._showDialogSewa}
                        >
                          Sewa
                        </Button>
                      </View>
                      <View style={{paddingHorizontal: 10}}>
                        <Button
                          mode="contained"
                          color="#468223"
                          style={{width: screenWidth/2-30}}
                          onPress={this._showDialog}
                        >
                          Pinjam
                        </Button>
                      </View>
                    </View>
                  ),
                  <Button onPress={this._showDialogBeli} mode="contained" style={{marginHorizontal: 10, marginVertical: 10}} color="#57a32e">
                    Beli Dengan {book.harga_beli} Token 
                  </Button>
              ]
            }
          </View>

          <View>
            <TouchableRipple
              onPress={() => navigation.navigate('TentangBuku', {
                title: book.title, 
                picture: book.picture, 
                description: book.description,
                author: book.author,
                penerbit: book.penerbit,
                isbn: book.isbn,
                halaman: book.halaman,
                category: book.category.category_name,
              })}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View flexDirection="row" style={{paddingHorizontal: 20, marginVertical: 15, justifyContent:'space-between', alignItems:'center'}}>
                <View>
                  <Text style={{fontWeight:'400', fontSize: 18, alignSelf:'center'}}>Tentang Buku Ini</Text>
                </View>
                <View>
                  <Icon name="angle-right" size={25} style={{alignSelf:"center"}} />
                </View>
              </View>
            </TouchableRipple>
            <Text numberOfLines={4} style={{paddingHorizontal: 20, marginBottom:20, color: colors.text}}
              onPress={() => navigation.navigate('TentangBuku', {
                title: book.title, 
                picture: book.picture, 
                description: book.description,
                author: book.author,
                penerbit: book.penerbit,
                isbn: book.isbn,
                halaman: book.halaman,
                category: book.category.category_name,
              })}
            >
              {book.description}
            </Text>
            <View
                style = {{
                    borderBottomColor: '#e4e6e8',
                    borderBottomWidth: 1,
                }}
            />
          </View>
          <View style={{flex:1}}>
            <Text style={{paddingHorizontal: 20, marginTop: 15, fontSize: 18, fontWeight: '400'}}>Similar Buku</Text>
              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={3} // Reduce the window size
              >
                <View style={styles.CardContain}>
                  {
                      similarbook.map((item, x) => (
                          <TouchableRipple 
                              key={item.id}
                              onPress={() => navigation.push('DetailBuku', {id:item.id})}
                              rippleColor="rgba(0, 0, 0, .32)"
                              style={{borderRadius:10}}
                          >
                              <View style={styles.ContainerRelat}>
                                  <View>
                                    <Image source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.picture}} style={styles.image} />
                                  </View>
                                  <View style={{paddingHorizontal:5}}>
                                      <Text numberOfLines={2} style={{width: 100}}>
                                          {item.title}
                                      </Text>
                                      <Paragraph style={styles.Content}>128 Pages</Paragraph>
                                  </View>
                              </View>
                          </TouchableRipple>
                      ))
                  }
                </View>
              </ScrollView>
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  ContainerRelat:{
    flex: 1,
    position: 'relative',
    padding: 0,
  },
  Box:{
      borderRadius:10,
      flex: 1,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
  },
  CoverImage: {
      height: 170
  },
  TitleRelat:{
      marginTop: 10,
      lineHeight: 15,
      color: 'black'
  },
  Content:{
      marginTop: 0,
      fontSize: 12,
      color: '#414141'
  },
  container2:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE6DF'
  },
  title:{
    paddingTop: 0,
    fontWeight: 'bold',
    color: '#2F2F2F',
    letterSpacing: 1,
    fontSize: 20
  },
  title2:{
    paddingTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  description:{
    paddingHorizontal: 20,
    paddingBottom: 2,
    fontSize: 14,
    color: '#484848',
  },
  description2:{
    color: '#716f6f',
  },
  iconImage:{
    marginRight: 30,
    flex: 1,
  },
  iconImage2:{
    alignItems: 'flex-end',
  },
  image:{
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    height:160,
    width: 100,
    resizeMode:'contain'
  },
  Container3:{
    flex: 1,
    width: 130,
    height: '35%',
    position: 'relative',
    padding: 0,
  },
  Box:{
    borderRadius:10,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  Content:{
    marginTop: 0,
    fontSize: 10,
    color: '#404040',
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
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

function mapStateToProps(state) {
  console.log(state.book.items)
  return {
    book: state.book.items,
    similarbook: state.similarbook.items,
    beli: state.beli.items,
    cekbeli: state.cekbeli.items,
    sewa: state.sewa.items,
    ceksewa: state.ceksewa.items,
    pinjam: state.pinjam.items,
    cekpinjam: state.cekpinjam.items,
    bookmarkbook: state.bookmarkbook.items,
    cekbookmarkbook: state.cekbookmarkbook.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBook: (id) => dispatch(fetchBook(id)),
    getSimilarBook: (id) => dispatch(fetchSimilarBook(id)),
    beliBook: (id) => dispatch(postBeliBook(id)),
    getCekPembelian: (id) => dispatch(fetchCekBeli(id)),
    sewaBook: (id) => dispatch(postSewaBook(id)),
    getCekPenyewaan: (id) => dispatch(fetchCekSewa(id)),
    pinjamBook: (id) => dispatch(postPinjamBook(id)),
    getCekPeminjaman: (id) => dispatch(fetchCekPinjam(id)),
    postBookmark: (id) => dispatch(fetchBookmarkBook(id)),
    getCekBookmark: (id) => dispatch(fetchCekBookmarkBook(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withNavigation(DetailBuku)));