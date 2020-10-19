import React, { Component } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { IconButton, Colors } from 'react-native-paper';
import 'react-native-gesture-handler';
import Home from './../components/home';
import Kategori from './../components/kategori';
import Perpustakaan from './../components/perpustakaan';
import Koleksi from './../components/koleksi';
import Unduhan from './../components/unduhan';
import Baca from './../components/buku/baca';
import DetailBuku from './../components/buku/detail';
import Sidebar from './Sidebar';
import TentangBuku from './../components/buku/TentangBuku';
import Token from './../components/token';
import Search from './../components/search';
import SearchText from './../components/search/text';
import Result from './../components/search/results';
import Pembelian from './../components/transaksi/Pembelian';
import Peminjaman from './../components/transaksi/Peminjaman';
import Penyewaan from './../components/transaksi/Penyewaan';
import Faq from './../components/FAQ/';
import HubungiKami from './../components/hubungiKami/';
import TentangAplikasi from './../components/tentangAplikasi/';
import SettingsAccount from './../components/settingsAccount/';
import UbahPassword from './../components/settingsAccount/ubahPassword';
import Topup from './../components/token/topup';

class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <IconButton
            icon="menu"
            color={Colors.white}
            size={25}
            onPress={() => this.props.navigationProps.toggleDrawer()}
        />
      );
    }
}
class ButtonRight extends Component {
    render() {
        return (
            <IconButton
                icon="magnify"
                color={'white'}
                size={25}
                onPress={() => this.props.navigationProps.navigate('Search')}
            />
        );
    }
}

class LinkKoleksiSaya extends Component {
    render() {
        return (
            <IconButton
                icon="book"
                color={'white'}
                size={25}
                onPress={() => this.props.navigationProps.navigate('Koleksi')}
            />
        );
    }
}

class LogoImage extends Component {
    render() {
        return (
            <View flexDirection='row'>
                <View st yle={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    source={require('./../assets/Logo.png')}
                    style={{width:40, height: 40}}
                    />
                </View>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'white', fontSize:20, width: 200 }}>NU PUSTAKA</Text>
                </View>
            </View>
        );
    }
}
class SearchButton extends Component {
    render() {
        return (
            <IconButton
                icon="magnify"
                color={'white'}
                size={25}
                onPress={() => this.props.navigationProps.navigate('Search')}
            />
        );
    }
}

export const TabTransaksi = createBottomTabNavigator({
    Beli: { screen: Pembelian, },
    Sewa: { screen: Penyewaan },
    Pinjam: { screen: Peminjaman }
},{
    initialRouteName: 'Beli',
    barStyle:{
        backgroundColor: 'red',
    },
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconName2;
        if (routeName === 'Beli') {
            iconName = require('./../assets/beliIcon.png');
            iconName2 = require('./../assets/beliIcon-disable.png');
        } else if (routeName === 'Sewa') {
            iconName = require('./../assets/sewaIcon.png');
            iconName2 = require('./../assets/sewaIcon-disable.png');
        } else if (routeName === 'Pinjam') {
            iconName = require('./../assets/pinjamIcon.png');
            iconName2 = require('./../assets/pinjamIcon-disable.png');
        }
        return <Image
            source={
              focused
                ? iconName
                : iconName2
            }
            style={{
                width: 20,
                height: 20,
                marginBottom: 5
            }}
            />;
    },
    }),
    tabBarOptions: {
    style: {
        backgroundColor: '#0F8B43',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
        color: 'white',
        letterSpacing: .9,
        height: 60,
    },
    activeTintColor: '#d6d6d6',
    inactiveTintColor: 'white',
    }
})

export const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
              headerLeft: (
                <NavigationDrawerStructure navigationProps={navigation} />
              ),
              headerTitle: (
                <LogoImage />
              ),
              headerRight: (
                  <View flexDirection='row'>
                    <LinkKoleksiSaya navigationProps={navigation}/>
                    <ButtonRight navigationProps={navigation}/>
                  </View>
              ),
              headerStyle : {
                  backgroundColor: '#0F8B43',
              },
            }
        },
    },
    Topup: {
        screen: Topup,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Topup Token</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Kategori: {
        screen: Kategori,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>{navigation.getParam('title')}</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Perpustakaan: {
        screen: Perpustakaan,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Perpustakaan</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Koleksi: {
        screen: Koleksi,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Koleksi Saya</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Unduhan: {
        screen: TabTransaksi,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Riwayat Transaksi</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Baca: {
        screen: Baca,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                header: null,
                headerTitle: (
                    <Text style={{color: 'white'}}>Baca Buku</Text>
                ),
                headerRight: (
                    <SearchButton navigationProps={navigation}/>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    TentangBuku: {
        screen: TentangBuku,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <View flexDirection="row" style={{flex:1, alignItems: 'center'}}>
                        <Image
                            source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+navigation.getParam('picture')}}
                            style={{width:20, height: 30, borderRadius: 3}}
                        />
                        <Text style={{color: 'white', marginLeft: 10}}>{navigation.getParam('title')}</Text>
                    </View>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    DetailBuku: {
        screen: DetailBuku,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                header: null
            }
        },
    },
    Token: {
        screen: Token,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Token Saya</Text>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Faq: {
        screen: Faq,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>FAQ</Text>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    HubungiKami: {
        screen: HubungiKami,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Hubungi Kami</Text>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    TentangAplikasi: {
        screen: TentangAplikasi,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Tentang Aplikasi</Text>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    SettingsAccount: {
        screen: SettingsAccount,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Settings Account</Text>
                ),
                headerRight:(
                  <TouchableOpacity
                    onPress={()=> navigation.navigate('UbahPassword')}
                  >
                    <Text style={{color: 'white', marginRight: 15, fontWeight: 'bold'}}>Ubah Password</Text>
                  </TouchableOpacity>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    UbahPassword: {
        screen: UbahPassword,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                headerTitle: (
                    <Text style={{color: 'white'}}>Ubah Password</Text>
                ),
                headerStyle : {
                    backgroundColor: '#0F8B43',
                },
            }
        },
    },
    Search: {
        screen: Search,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                header: null
            }
        },
    },
    SearchText: {
        screen: SearchText,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                header: null
            }
        },
    },
    Result: {
        screen: Result,
        navigationOptions: ({ navigation }) => {
            const { state, setParams } = navigation;
            return {
                header: null
            }
        }
    }
},{
    navigationOptions: {
        headerVisible: false,
    },
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
            color: 'white',
        },
        headerTintColor: 'white',
        headerPressColorAndroid: 'white',
    }),
})
export const DrawerStack = createDrawerNavigator({
    "Beranda": {
        screen: HomeStack,
    },
    "Token Pribadi" : {
        screen: HomeStack
    },
    "Perpustakaan" : HomeStack
},{
    drawerWidth: Dimensions.get('window').width * .8,
    contentComponent: Sidebar,
    initialRouteName: 'Beranda',
});

export const AppNavigation = createStackNavigator({
    DrawerStack: {
        screen: DrawerStack,
    }
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    initialRouteName: 'DrawerStack',
});
