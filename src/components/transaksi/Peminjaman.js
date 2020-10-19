import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableRipple, Card, } from 'react-native-paper'
import moment from 'moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios';
import { onToken } from '../../actions/auth';
import 'moment/locale/id';

export class Peminjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pinjam: [],
          loading: true,
        };
    }
    componentDidMount(){
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            console.log(AuthStr)
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/get/transaction/pinjam`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
              setTimeout(() => {
                this.setState({
                  visible: false,
                  loading: false,
                  pinjam: response.data.data
                })
              }, 2000);
            }).catch(err => (err));
        })
    }

    render() {
        // moment.locale('id');
        return (
          <View style={{flex:1}}>
          {this.state.loading ?
          <View key="1" style={{flex:1, justifyContent: "center", alignContent: 'center'}}>
            <ActivityIndicator animating={true} size="large" color="#0F8B43" />
          </View> :
          <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
            {this.state.pinjam.map((item, x) => (
                <TouchableRipple
                    key={x}
                    onPress={() => this.props.navigation.navigate('DetailBuku', {id:item.books.id})}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{borderRadius:10}}
                >
                <View style={styles.Container}>
                    <Card.Cover source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.books.picture}} style={styles.CoverImage} />
                    <View style={styles.Card}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}> { item.books.title } </Text>
                        <View>
                            <Text style={styles.Content}> Penulis { item.books.author } </Text>
                            <Text style={styles.Content}> Penerbit { item.books.penerbit } </Text>
                            {/* <Text style={styles.Content}> dipinjamkan dengan harga { item.books.qty_pinjam } Token </Text> */}
                            <Text style={styles.Time}> { `\n` + moment(item.created_at).locale('id').format('Do MMMM YYYY') } </Text>
                        </View>
                    </View>
                </View>
                </TouchableRipple>
            ))}
          </ScrollView>}
          </View>
        )
    }
}

const styles = StyleSheet.create({
  Container:{
    // width: '18%',
    // height: 00,
    position: 'relative',
    marginBottom: 10,
    margin:20,
    flexDirection: 'row'
  },
  Card:{
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
  },
  Title:{
    width: '80%',
    fontSize: 16,
    lineHeight: 20,
    textAlign:'left'
  },
  Content:{
    color: '#404040',
    fontSize: 12,
    textAlign:'left'
  },
  Time:{
    color: '#404040',
    lineHeight: 12,
    textAlign:'right',
    marginRight: 70,
    color: 'green'
  },
  CoverImage: {
      height: 100,
      width: 60,
      borderRadius:5
  },
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Peminjaman)
