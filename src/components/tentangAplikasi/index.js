import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TextInput, CheckBox, ActivityIndicator, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TouchableRipple, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import { onToken } from '../../actions/auth';

class Index extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    onToken().then(res => {
      const AuthStr = 'Bearer ' + res;
      axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/tentang`, {
          headers: {
              Authorization: AuthStr
          }
      }).then(response => {
          // setTimeout(() => {
            this.setState({
              visible: false,
              loading: false,
              data: response.data.data
            })
          // }, 0);
          console.log(this.state.data)
      }).catch(err => (err));
    })
  }

  render() {
        //const { loading } = this.state;
        return (
          <ScrollView style={{backgroundColor: '#ffffff'}}>
            {
                this.state.data.map((item, x) => (
                    <View>
                      <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
                        <Title style={{lineHeight: 20, margin: 15, marginTop: 20 , color: '#373737'}}>
                          Tentang
                        </Title>
                        <Image source={require('./../../assets/Logo.png')} style={{height: 200, width: 200, alignSelf: 'center'}}/>
                        <Text style={{lineHeight: 20, margin: 15, color: '#373737'}}>
                          { item.deskripsi }
                        </Text>
                      </View>
                      <View style={{margin: 15, paddingHorizontal: 15, flexDirection: 'row'}}>
                        <Image source={require('./../../assets/Logo.png')} style={{height: 50, width: 50}}/>
                        <View style={{paddingHorizontal: 15, width: '90%'}}>
                          <Text style={{color: '#373737', fontWeight: 'bold'}}> { item.nama_organisasi } </Text>
                          <Text> { item.alamat } </Text>
                          <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Icon name="phone" size={15} color="#017D2D" style={{alignSelf:"center", marginRight: 15}} />
                            <Text>{ item.no_telp }</Text>
                          </View>
                          <View style={{flexDirection: 'row', paddingTop: 5}}>
                            <Icon name="envelope" size={15} color="#017D2D" style={{alignSelf:"center", marginRight: 15}} />
                            <Text>{ item.email }</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                ))
            }
            {/* {
              <View>
                <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
                  <Title style={{lineHeight: 20, marginVertical: 5, color: '#373737'}}>
                    Tentang
                  </Title>
                  <Image source={require('./../../assets/Logo.png')} style={{height: 200, width: 200, alignSelf: 'center'}}/>
                  <Text style={{lineHeight: 20, marginVertical: 5, color: '#373737'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                  <Text style={{lineHeight: 20,  marginVertical: 5, color: '#373737'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                </View>
                <View style={{paddingVertical: 15, paddingHorizontal: 15, backgroundColor: '#F4F4F4', flexDirection: 'row'}}>
                  <Image source={require('./../../assets/Logo.png')} style={{height: 50, width: 50}}/>
                  <View style={{paddingHorizontal: 15, width: '90%'}}>
                    <Text style={{color: '#373737', fontWeight: 'bold'}}>NU Pustaka</Text>
                    <Text>Jalan Lorem Ipsum No.99 Sleman, Yogyakarta, Indonesia, 1999999</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <Icon name="phone" size={15} color="#017D2D" style={{alignSelf:"center", marginRight: 15}} />
                      <Text>+62 899 9999 9999</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                      <Icon name="envelope" size={15} color="#017D2D" style={{alignSelf:"center", marginRight: 15}} />
                      <Text>admin@nupustaka.com</Text>
                    </View>
                  </View>
                </View>
              </View>
            } */}
          </ScrollView>
        )
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
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    Title:{
      marginTop: 10,
      lineHeight: 15,
    },
    Content:{
      color: '#404040',
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
    // console.log(state.categoriesbooks.items)
    return {
      categoriesbooks: state.categoriesbooks.items,
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getCategoriesBooks: (id) => dispatch(fetchCategoryBooks(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
