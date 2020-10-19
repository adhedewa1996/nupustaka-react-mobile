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
        axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/faq`, {
            headers: {
                Authorization: AuthStr
            }
        }).then(response => {
            // setTimeout(() => {
              this.setState({
                data: response.data.data
              })
            // }, 0);
            console.log(this.state.data)
        }).catch(err => (err));
      })
      console.log(this.state.data)
    }
    render() {
        //const { loading } = this.state;
        return (
          <ScrollView style={{backgroundColor: '#ffffff'}}>
            <View>
              <List.Section>
              {
                this.state.data.map((item, x) => (
                  <List.Section>
                  <List.Accordion
                    key={item.id}
                    title={item.nama_kategori}
                    theme={{ colors: '#373737'}}
                  >
                  {
                    item.faq.map(detail =>{
                      return <List.Item
                      title={detail.title}
                      description={detail.deskripsi}
                      theme={{ colors: '#373737'}}
                    />
                    })
                  }
                  </List.Accordion>
                </List.Section>
                ))
              }
              </List.Section>
              {/* <List.Section>
                <List.Accordion
                  title="Waktu Peminjaman"
                  theme={{ colors: '#373737'}}
                >
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                </List.Accordion>
              </List.Section>
              <List.Section>
                <List.Accordion
                  title="Koleksi Anda"
                  theme={{ colors: '#373737'}}
                >
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                </List.Accordion>
              </List.Section>
              <List.Section>
                <List.Accordion
                  title="Pendaftaran"
                  theme={{ colors: '#373737'}}
                >
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                </List.Accordion>
              </List.Section>
              <List.Section>
                <List.Accordion
                  title="Masuk"
                  theme={{ colors: '#373737'}}
                >
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                </List.Accordion>
              </List.Section>
              <List.Section>
                <List.Accordion
                  title="Pembayaran"
                  theme={{ colors: '#373737'}}
                >
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                  <List.Item
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    theme={{ colors: '#373737'}}
                  />
                </List.Accordion>
              </List.Section> */}
            </View>
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
