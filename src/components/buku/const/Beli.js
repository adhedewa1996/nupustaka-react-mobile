import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const Beli = props => {
    const {
        visible,
        _hideDialog,
        picture,
        title,
        author,
        penerbit,
        token,
        tokenbook,
        date,
        dateend,
        onSubmit,
        onNavigation,
        ...attributes
    } = props;
    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={_hideDialog}>
            <Text style={styles.textTitle}>Konfirmasi Pembelian</Text>
            <View
                style = {{
                    borderBottomColor: '#e4e6e8',
                    borderBottomWidth: 1,
                }}
            />
            <Dialog.Content style={{flexDirection: 'row', paddingTop: 10}}>
                <Image
                    source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+picture}}
                    style={styles.image}
                />
                <View style={{width: '78%', paddingHorizontal: 15, marginTop: 2}}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Dialog.Content><Dialog.Content style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{width: '78%', paddingHorizontal: 0, marginTop: 2}}>
                  <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '55%'}}>
                        <Text style={{marginBottom: 0,}}>Token Saya : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}>{Number(token).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '120%'}}>
                        <Text style={{marginBottom: 0}}>Token yang dibutuhkan : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}>{tokenbook}</Text>
                    </View>
                    {
                        token < tokenbook ?
                        <View>
                            <Text style={{color: 'red', fontWeight: '100'}}>Token Anda tidak mencukupi</Text>
                        </View>
                        :
                        null
                    }
                </View>
            </Dialog.Content>
                {
                    token < tokenbook ?
                    <Dialog.Actions>
                        <Button
                            onPress={onNavigation}
                            mode="contained"
                            style={{marginHorizontal: 10}}
                        >
                            Topup Sekarang
                        </Button>
                    </Dialog.Actions>
                    :
                    <Dialog.Actions>
                        <Button
                            onPress={onSubmit}
                            mode="contained"
                            style={{marginHorizontal: 10}}
                        >
                            Beli Hanya {tokenbook} Token
                        </Button>
                    </Dialog.Actions>
                }
        </Dialog>
    </Portal>
    )
}


const styles = StyleSheet.create({
    image:{
        marginLeft: -5,
        marginTop: 5,
        borderRadius: 10,
        shadowColor: "#000",
        padding: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:160,
        width: 100,
        resizeMode:'contain'
    },
    textTitle: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        color: '#716f6f',
        fontWeight: 'bold'
    },
    title:{
        paddingTop: 0,
        fontWeight: 'bold',
        color: '#2F2F2F',
        letterSpacing: 1,
        fontSize: 16,
        marginBottom: 10
    },
});

export default Beli;
