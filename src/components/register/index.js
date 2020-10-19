import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Picker, Alert } from 'react-native';
import { withTheme, TextInput, Button, Checkbox } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/login';
import {Config} from '../../constants';
import axios from 'axios';

function mapStateToProps(state) {
    return {
        user: state
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            email: '',
            yearborn: '',
            gender: 'm',
            password: '',
            c_password: '',
            checked: false
        };
    }
    onLoginButtonPress = () => {
        const { phone, name, email, yearborn, gender, password, checked, c_password } = this.state;
        this.setState({
            loading: true
        });
        if(checked == false){
            Alert.alert("Mohon setujui syarat & ketentuan");
        }
        axios.post(`http://powerful-headland-43561.herokuapp.com/api/auth/signup`, {
            name: name,
            phone: phone,
            email: email,
            password: password,
            c_password: c_password
        })
        .then(response => {
            this.props.navigation.navigate('SignIn')
        })
        .catch(error => {
            this.setState({
                loading: false
            });
        });
    }
    render() {
        const { user } = this.props;
        const { phone, name, email, yearborn, gender, password, checked, c_password } = this.state;
        const { colors } = this.props.theme;
        return (
            <ScrollView style={{flex:1}} 
                showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <View style={{flex:1, padding: 10, justifyContent: 'center', alignContent: 'center'}}>
                        <View style={{alignItems: "center"}}>
                            <Image source={Config.LOGO} style={{marginBottom:50}} />
                        </View>
                            
                            <TextInput
                                label='Nama Lengkap'
                                style={{marginVertical: 10}}
                                value={name}
                                onChangeText={name => this.setState({ name })}
                            />
                            <TextInput
                                label='Alamat Email'
                                style={{marginVertical: 10}}
                                value={email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <TextInput
                                label='Nomor Handphone'
                                style={{marginVertical: 10}}
                                value={phone}
                                onChangeText={phone => this.setState({ phone })}
                            />
                            {/* <TextInput
                                label='Tahun Lahir'
                                style={{marginVertical: 10}}
                                value={yearborn}
                                onChangeText={yearborn => this.setState({ yearborn })}
                            /> */}
                            {/* <Picker
                                selectedValue={gender}
                                style={{height: 50, width: '100%', padding: 10, borderColor: 'grey', borderWidth: 1}}
                                onValueChange={(gender, itemIndex) =>
                                    this.setState({gender})
                                }>
                                <Picker.Item label="Pria" value="m" />
                                <Picker.Item label="Wanita" value="f" />
                            </Picker> */}

                            <TextInput
                                label='Password'
                                style={{marginVertical: 10}}
                                value={password}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                            />
                            <TextInput
                                label='Ulangi Password'
                                style={{marginVertical: 10}}
                                value={c_password}
                                secureTextEntry={true}
                                onChangeText={c_password => this.setState({ c_password })}
                            />
                            <View style={{ flexDirection: 'row', paddingVertical: 10}}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: !checked }); }}
                                />
                                <Text style={{color: colors.text, width: 300}} onPress={() => this.setState({checked: !checked}) }>Dengan mendaftar, saya menyetujui Syarat dan Ketentuan, serta Kebijakan yang berlaku.</Text>
                            </View>
                            <Button mode="contained" onPress={() => this.onLoginButtonPress()} style={{marginTop:10, paddingVertical: 5}}>
                                <Text>DAFTAR</Text>
                            </Button>
                    </View>
                    <View style={{padding: 15, justifyContent:"space-between", alignSelf: 'center'}}>
                        <Text style={{color: colors.text, borderTopColor: colors.text}} onPress={()=> this.props.navigation.navigate('SignIn')}>
                            Sudah Punya Akun? Masuk
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(withTheme(Index)); 