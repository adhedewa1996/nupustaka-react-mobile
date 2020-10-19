import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Picker, Alert } from 'react-native';
import { withTheme, TextInput, Button, Checkbox } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import * as Actions from '../../actions/login';
import { Loading } from './../../constants';
import axios from 'axios';
import { onToken } from '../../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

function mapStateToProps(state) {
    return {
        user: state
    };
}

class UbahPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // passwordLama: '',
            password: '',
            c_password: '',
            loading: false,
            visible: false
        };
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePassword = (text) => {
        this.setState({
            password: text.nativeEvent.text
        })
    }

    handleConfirmPassword = (text) => {
        this.setState({
            c_password: text.nativeEvent.text,
        })
        console.log(this.state.c_password)
    }

    handleSubmit = async () => {
        const { navigation } = this.props;
        const token = await AsyncStorage.getItem('access_token')
        this.state.password == '' && this.state.c_password == '' ?
        Alert.alert("PASSWORD TIDAK BOLEH KOSONG", '') :
        this.state.password.length <= 4 || this.state.c_password.length <= 4 ?
        Alert.alert("PASSWORD MINIMAL 5 CHARACTER", '') :
        this.state.password == this.state.c_password ?
        Alert.alert("YAKIN AKAN GANTI PASSWORD", '',
        [
            { text: "OK", onPress: () => {
                onToken().then(res => {
                    const AuthStr2 = 'Bearer ' + token;
                    console.log(AuthStr2)
                    axios({
                        method: 'POST',
                        url: 'http://powerful-headland-43561.herokuapp.com/api/auth/updatePassword',
                        headers: {
                            'Authorization': AuthStr2
                        },
                        data: {
                            "password": this.state.password,
                            "c_password": this.state.c_password
                        }
                    })
                    .then(response => {
                        setTimeout(() => {
                            Alert.alert("Password Berhasil Diperbaharui")
                            this.setState({
                            loading: false,
                            visible: true,
                            })
                            navigation.navigate('SettingsAccount')
                        }, 5000);
                        console.log(response)
                    })
                    .catch(error => console.log(error))
                })
                this.setState({
                    visible: false,
                    loading: true
                })
            }
            }
        ],
        { cancelable: true })
        : Alert.alert("PASSWORD TIDAK SESUAI", '')
    }

    render() {
        const { colors } = this.props.theme;
        return (
            <ScrollView style={{flex:1}}
                showsVerticalScrollIndicator={false}>
                <Loading loading={this.state.loading} />
                <View style={{flex: 1}}>
                    <View style={{flex:1, padding: 10, justifyContent: 'center', alignContent: 'center'}}>
                        {/* <TextInput
                            label='Password Lama'
                            style={{marginVertical: 10}}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        /> */}
                        <TextInput
                            label='Password Baru'
                            value={this.state.password}
                            style={{marginVertical: 10}}
                            secureTextEntry={true}
                            onChange={this.handlePassword}
                        />
                        <TextInput
                            label='Ulangi Password Baru'
                            value={this.state.c_password}
                            style={{marginVertical: 10}}
                            secureTextEntry={true}
                            onChange={this.handleConfirmPassword}
                        />
                        <Button mode="contained" style={{marginTop:10, paddingVertical: 5}} onPress={this.handleSubmit}>
                            <Text>Simpan</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(withTheme(UbahPassword));
