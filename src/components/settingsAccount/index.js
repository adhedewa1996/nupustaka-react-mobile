import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Picker, Alert } from 'react-native';
import { withTheme, TextInput, Button, Checkbox } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import FormSimpan from './formSimpan'
import { connect } from 'react-redux';
//import * as Actions from '../../actions/login';
import { Loading } from './../../constants';
import axios from 'axios';
import { onToken } from '../../actions/auth';
import { fetchUser } from './../../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
const ACCESS_TOKEN = 'access_token'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            phone: '',
            name: '',
            email: '',
            yearborn: '',
            gender: 'm',
            password: '',
            c_password: '',
            checked: false
        };
        this.onButtonPress = this.onButtonPress.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputEmail = this.handleInputEmail.bind(this);
        this.handleInputPhone = this.handleInputPhone.bind(this);
    }

    handleInputName = (text) => {
        this.setState({
            name: text.nativeEvent.text
        })
        console.log(this.state.name)
    }
    handleInputEmail = (text) => {
        this.setState({
            email: text.nativeEvent.text
        })
        console.log(this.state.email)
    }
    handleInputPhone = (text) => {
        this.setState({
            phone: text.nativeEvent.text.replace(/\D/gm, '')
        })
        console.log(this.state.phone)
    }

    componentDidMount(){
        this.props.getProfile();
        this.setState({
            email: this.props.user.auth.items.email,
            name: this.props.user.auth.items.name,
            phone: this.props.user.auth.items.phone
        })
    }

    onButtonPress = async () => {

        const token = await AsyncStorage.getItem('access_token')

        Alert.alert(
            "KONFIRMASI",
            "Yakin Akan Perbarui Akun?",
            [
                { text: "OK", onPress: () => {
                    onToken().then(res => {
                        const AuthStr2 = 'Bearer ' + token;
                        console.log(AuthStr2)
                        axios({
                            method: 'POST',
                            url: 'http://powerful-headland-43561.herokuapp.com/api/auth/simpanUser',
                            headers: {
                                'Authorization': AuthStr2
                            },
                            data: {
                                "email": this.state.email,
                                "name": this.state.name,
                                "phone": this.state.phone
                            }
                        })
                        .then(response => {
                            setTimeout(() => {
                                Alert.alert("Akun Berhasil Diperbaharui")
                                this.setState({
                                loading: false
                                })
                            }, 5000);
                            console.log(response)
                        })
                        .catch(error => console.log(error))
                    })
                    this.setState({
                        visible: false,
                        loading: true
                    })
                }}
            ],
            { cancelable: true }
        )
        console.log(response)
    };

    render() {
        const { colors } = this.props.theme;
        return (
            <ScrollView style={{flex:1}}
                showsVerticalScrollIndicator={false}>
                <Loading loading={this.state.loading} />
                <View style={{flex: 1}}>
                    <View style={{flex:1, padding: 10, justifyContent: 'center', alignContent: 'center', margin: 10}}>
                        {/* <View style={{marginBottom: 15, marginRight: 15, borderRadius:30}}>
                            <Image source={require('./../../assets/adminIcon.png')}  style={{width: 120, height: 120, alignSelf:"center", margin:25, borderRadius: 100}}/>
                        </View> */}
                        <View >
                            <Gravatar options={{
                                email: 'adhedewa1996@gmail.com',
                                parameters: { "size": "200", "d": "mm" },
                                secure: true
                            }}
                            style={{width: 120, height: 120, alignSelf:"center", margin:25, borderRadius: 100}} />
                        </View>
                        <TextInput
                            value={this.state.name}
                            onChange={this.handleInputName}
                            label='Nama Lengkap'
                            style={{marginVertical: 10}}
                        />
                        <TextInput
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                            label='Alamat Email'
                            style={{marginVertical: 10}}
                        />
                        <TextInput
                            value={this.state.phone}
                            onChange={this.handleInputPhone}
                            label='Nomor Handphone'
                            style={{marginVertical: 10}}
                        />
                        <Button mode="contained" style={{marginTop:10, paddingVertical: 5}} onPress={this.onButtonPress}>
                            <Text>Simpan</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getProfile: () => dispatch(fetchUser()),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Index));
