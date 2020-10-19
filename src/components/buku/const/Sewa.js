import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Avatar, Card, Title, Paragraph, Drawer, List, Button, Chip, Dialog, Portal } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const Sewa = props => {
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
            <Text style={styles.textTitle}>Konfirmasi Penyewaan</Text>
            <View
                style = {{
                    borderBottomColor: '#e4e6e8',
                    borderBottomWidth: 1,
                }}
            />
            <Dialog.Content style={{flexDirection: 'row', paddingTop: 15}}>
                <Image
                    source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+picture}}
                    style={styles.image}
                />
                <View style={{width: '70%', paddingHorizontal: 10, paddingLeft: 40}}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Dialog.Content>
            <Dialog.Content style={{flexDirection: 'row', paddingTop: 15}}>
                <View style={{width: '70%', paddingHorizontal: 0}}>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '100%'}}>
                        <Text style={{marginBottom: 0,}}>Lama Penyewaan : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}> 7 Hari</Text>
                    </View>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '100%'}}>
                        <Text style={{marginBottom: 0,}}>Tanggal Mulai : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}>{date}</Text>
                    </View>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '100%'}}>
                        <Text style={{marginBottom: 0,}}>Tanggal Berakhir : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}>{dateend}</Text>
                    </View>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '100%'}}>
                        <Text style={{marginBottom: 0,}}>Token Saya : </Text>
                        <Text style={{fontWeight: 'bold', color: '#329052'}}>{Number(token).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    <View flexDirection="row" style={{marginBottom: 5, justifyContent: 'flex-start', width: '100%'}}>
                        <Text style={{marginBottom: 0,}}>Token yang dibutuhkan : </Text>
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
                        > Topup Sekarang
                        </Button>
                    </Dialog.Actions>
                    :
                    <Dialog.Actions>
                        <Button
                            onPress={onSubmit}
                            mode="contained"
                            style={{marginHorizontal: 10}}
                        > Sewa Hanya {tokenbook} Token
                        </Button>
                    </Dialog.Actions>
                }
        </Dialog>
    </Portal>
    )
}


const styles = StyleSheet.create({
    image:{
        borderRadius: 10,
        shadowColor: "#000",
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

export default Sewa;
