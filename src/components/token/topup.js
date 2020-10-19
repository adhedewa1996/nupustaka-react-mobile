import React, { Component } from 'react';
import { ScrollView, View, Text, CheckBox, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Drawer, List, TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { fetchUser, postRedeemVoucher } from './../../actions';
import { onToken } from '../../actions/auth';
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
class Topup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      visible: false,
      loading: false,
    };
  }
  componentDidMount(){
    this.props.getProfile();
  }

  onSubmit = () => {
    // const { code } = this.state;
    // const { voucher } = this.props;
    // this.props.postRedeem(code, (req,res) => {
    //     console.log(res)
    // });
    // this.props.getProfile();
    const { navigation } = this.props;
    onToken().then(res => {
        const AuthStr = 'Bearer ' + res;
        axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/voucher/redeem/${this.state.code}`, {
            headers: {
                Authorization: AuthStr
            }
        }).then(response => {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
                Alert.alert(
                    "TOP UP BERHASIL",
                    "SELAMAT VOUCHER BERHASIL DI REDEEM",
                    [
                      { text: "OK", onPress: () => navigation.navigate('Token') }
                    ],
                    { cancelable: false }
                )
            }, 5000);
            this.setState({
                loading: true
            })
            console.log(response.data.data.message)
        }).catch(err => {Alert.alert(
            "TOP UP GAGAL DILALUKAN",
            "Voucher Tidak Valid",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }),
            this.setState({
                loading: false
            })
            console.log(err)
        }
        );
    })
  }

  render() {
    const { user, voucher } = this.props;
    const { code } = this.state;
    return(
        <ScrollView style={{backgroundColor: '#ffffff'}}>
            <LinearGradient
                colors={['#05B755','#017133']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style = {{flex:1, borderBottomLeftRadius:25, borderBottomRightRadius:25, position:'relative'}}>
                <View style={{flex: 1, alignItems: 'center', height: 200}}>
                    {/* <Icon name="ticket" size={70} color={`white`} style={{alignSelf: "center", marginTop: 20}} /> */}
                    {/* <Text style={{color: '#ffffff', margin: 20}}>Token Saya</Text> */}
                    <Title style={{color: '#ffffff', fontWeight: 'bold', fontSize: 30, marginTop: 65}}> TOP UP SEKARANG </Title>
                </View>
            </LinearGradient>
            <Card style={{height: 350, width: '85%', backgroundColor: 'white', position:"relative", marginTop:-50, margin:30, borderRadius:15}}>
                {/* {
                    this.state.loading ?
                    <ActivityIndicator animating={true} size="large" color="#0F8B43" />
                    : <Text></Text>
                } */}
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 80}}>
                    <TextInput
                        style={{height: 40, width: '70%', marginVertical: 20, borderRadius: 5, paddingTop: 3, paddingLeft: 10, margin: 5}}
                        placeholder="Masukkan Kode Voucher"
                        autoCapitalize='characters'
                        onChangeText={(code) => this.setState({ code })}
                    />
                    {
                        this.state.loading ? <ActivityIndicator animating={true} size="large" color="#0F8B43" /> :
                        <Button
                            mode="contained"
                            style={{backgroundColor: '#329052', height: 40, width: '70%', marginVertical: 20, borderRadius: 5, paddingTop: 1, paddingLeft: 5}}
                            onPress={() => this.onSubmit()}
                        > Masukan </Button>
                    }
                </View>
            </Card>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    input:{
        // underlineColorAndroid ='transparent'
    }
});

function mapStateToProps(state) {
  return {
    user: state.auth.items,
    voucher: state.voucher.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postRedeem: (id) => dispatch(postRedeemVoucher(id)),
    getProfile: () => dispatch(fetchUser()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Topup);