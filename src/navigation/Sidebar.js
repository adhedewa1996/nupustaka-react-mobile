import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Linking } from 'react-native';
import { withTheme, TouchableRipple, Button, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { onSignOut, isSignedIn } from "./../actions/auth";
import { fetchUser } from './../actions';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded : false,
        }
    }
    componentDidMount(){
        this.props.getProfile();
    }
    toggleExpand = () => {
        const { expanded } = this.state;
        this.setState({expanded : !expanded})
    }
    render() {
        const { colors } = this.props.theme;
        const { expanded } = this.state;
        const { user } = this.props;
        return (
            <View style={{flex: 1, margin: 15}}>
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('SettingsAccount', user)}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:55}}>
                    <View flexDirection="row" style={{padding:10, alignContent: "center", justifyContent:'space-between'}}>
                        <View flexDirection="row">
                            <Image source={require('./../assets/account.png')} style={{width: 23, height: 23, margin:4}}/>
                            <View style={{paddingLeft: 10}}>
                                <Text style={{ textTransform: 'uppercase' }}>{user.name}</Text>
                                <Text style={{color: colors.text}}>{user.email}</Text>
                            </View>
                        </View>
                        {/* {
                            expanded ?
                            <Icon name="angle-down" size={25} color={`${colors.primary}`} style={{alignSelf:"center"}} />
                            :
                            <Icon name="angle-right" size={25} color={`${colors.primary}`} style={{alignSelf:"center"}} />
                        } */}
                    </View>
                </TouchableRipple>
                {
                    expanded &&
                    <View style={{padding:10}}>
                        <Button mode="outlined" onPress={()=> this.props.navigation.navigate('SettingsAccount')}>
                            Pengaturan Akun Anda
                        </Button>
                    </View>
                }
                {/* <View
                    style={{
                        borderBottomColor: '#e4e6e8',
                        borderBottomWidth: 1,
                    }}
                /> */}
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('Token')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{flex:1, alignContent: 'center'}}>
                            <Icon name="ticket" size={25} color={`${colors.text}`} style={{alignSelf: "center"}} />
                            <Text style={{color: colors.text, paddingLeft: 15, alignSelf: 'center'}}>Token Saya</Text>
                        </View>
                        <Text style={{color: colors.primary, fontWeight: 'bold', alignSelf: 'center', paddingRight: 15}}>{ Number(user.token).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } </Text>
                    </View>
                </TouchableRipple>
                {/* <View
                    style={{
                        borderBottomColor: '#e4e6e8',
                        borderBottomWidth: 1,
                    }}
                /> */}
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('Perpustakaan')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center'}}>
                            <Icon name="building" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Perpustakaan</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('Koleksi')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="book" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Koleksi Saya</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('Unduhan')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="download" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Riwayat Transaksi</Text>
                        </View>
                    </View>
                </TouchableRipple>
                {/* <View
                    style={{
                        borderBottomColor: '#e4e6e8',
                        borderBottomWidth: 1,
                    }}
                /> */}
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('Faq')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="question-circle" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>FAQ</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={()=> Whatsapp()}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="user-circle" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Hubungi Kami</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={()=> this.props.navigation.navigate('TentangAplikasi')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="info-circle" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Tentang Aplikasi</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{height:45}}>
                    <View flexDirection="row" style={styles.rowRipple}>
                        <View flexDirection="row" style={{alignContent: 'center', justifyContent: "center"}}>
                            <Icon name="sign-out" size={25} color={`${colors.text}`} style={{alignSelf:"center"}} />
                            <Text style={{color: colors.text, alignSelf: 'center', paddingLeft: 20}}>Keluar</Text>
                        </View>
                    </View>
                </TouchableRipple>
                <View style={{flex:1, justifyContent: 'flex-end'}}>
                    <View
                        style={{
                            borderBottomColor: '#e4e6e8',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={{padding: 10, alignContent: "center"}}>
                        <Text style={{color: colors.text, textAlign: 'center'}}> Aplikasi Versi: 1.0</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowRipple: {
        flex: 1,
        padding:10,
        alignContent: "center",
        justifyContent:'space-between'
    }
})

const Whatsapp = link => {
    return Linking.openURL('https://wa.me/62895376710616?text=Hi+i+need+some+help')
};

function mapStateToProps(state) {
    return {
      user: state.auth.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfile: () => dispatch(fetchUser())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Sidebar));
