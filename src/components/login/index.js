import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { withTheme, TextInput, Button, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { loginUser } from './../../actions';
import { Config } from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const ACCESS_TOKEN = 'access_token';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            disabled: false,
            visible: false
        };
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    onLoginPressed() {
        const { email, password } = this.state;
        this.props.loginUser({ email, password });
    }
    onButtonPress = () => {
        const { email, password, visible } = this.state;
        this.setState({
            loading: true,
            disabled: true
        });
        axios.post(`http://powerful-headland-43561.herokuapp.com/api/auth/login`, {
            email: email,
            password: password,
        })
        .then(response => {
            if(response.data.success === true) {
                AsyncStorage.setItem(ACCESS_TOKEN, response.data.data.access_token);
                this.setState({
                    loading: false,
                    disabled: false
                });
                this.props.navigation.navigate('Home')
            } else {
                this.setState({
                    loading: false,
                    disabled: false,
                    visible: !visible
                });
            }
        })
        .catch(error => {
            this.setState({
                loading: false,
                disabled: false,
                visible: !visible
            });
        });
    };
    render() {
        const { email, password, loading, disabled, visible } = this.state;
        const { colors } = this.props.theme;
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, padding: 10, justifyContent: 'center', alignContent: 'center'}}>
                    <View style={{alignItems: "center"}}>
                        <Image source={Config.LOGO} style={{marginBottom:50}} />
                    </View>
                        <TextInput
                            label='Email'
                            value={email}
                            style={{marginTop: 10}}
                            onChangeText={(email) => this.setState({ email })}
                            disabled={disabled}
                        />
                        <TextInput
                            label='Password'
                            style={{marginTop: 10}}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            disabled={disabled}
                        />
                        <Button 
                            mode="contained" 
                            loading={loading} 
                            disabled={disabled}
                            onPress={this.onButtonPress} 
                            style={{marginTop:10, paddingVertical: 5}}
                        >
                            LOGIN
                        </Button>
                        {/* <Text style={{alignSelf: "center", fontWeight: 'bold', color: colors.text, paddingTop:10, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('SignInEmail')}>
                            Login Dengan Email
                        </Text> */}
                </View>
                <View style={{padding: 15, justifyContent:"space-between", alignSelf: 'center'}}>
                    <Text style={{color: colors.text, borderTopColor: colors.text}} onPress={()=> this.props.navigation.navigate('SignUp')}>
                        Belum Punya Akun? Daftar
                    </Text>
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                        label: 'COBA LAGI',
                        onPress: () => {
                        // Do something
                        },
                    }}
                    >
                    Akun yang Anda masukkan salah
                </Snackbar>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { email, password, error, user, loading, loggedIn } = state.auth;
    return {
        email,
        password,
        error,
        user,
        loading,
        loggedIn,
    };
};

export default connect(mapStateToProps, {  
    loginUser 
})(withTheme(Index)); 