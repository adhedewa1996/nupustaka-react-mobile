import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Card, Paragraph, TouchableRipple, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { fetchDisplayBooks, fetchUser } from './../../actions';
import axios from 'axios';
import { onToken } from '../../actions/auth';

class Index extends Component {
    constructor(props) {
        super(props);
            this.state = {
                loading: true,
                data: [],
                current_page: 1,
                error: null,
                hasMore: true,
                refreshing: false,
                beli: [],
        };
        this.fetchData = this.fetchData.bind(this);
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.fetchData()
            this.setState({
                refreshing: false
            })
        }, 2000);
    }

    fetchData(){
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/get/transaction/beli`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                setTimeout(() => {
                  this.setState({
                    visible: false,
                    loading: false,
                    beli: response.data.data
                  })
                }, 0);
            }).catch(err => (err));
        })
    }

    componentDidMount(){
        this.props.getProfile();
        this.props.getDisplayBooks();
        this.fetchData();
    }

    render() {
        const { colors } = this.props.theme;
        const { navigation, displaybooks } = this.props; 
        return(
        <ScrollView
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />}
        >
            <ImageBackground source={require('./../../assets/background-image.png')} style={{width: '100%', height: '75%', flex:1}}>
                <View style={{alignItems: 'center', padding: 10, margin: 10}}>
                    <Image
                        source={require('./../../assets/banner_3.png')}
                        style={styles.bannerImage}
                    />
                </View>
            </ImageBackground>
            {
                this.state.loading ?
                <View key="1" style={{flex:1, justifyContent: "center", alignContent: 'center', margin: 40, marginTop: 80}}>
                  <ActivityIndicator animating={true} size="large" color="#0F8B43" />
                </View> :
                <View key={1} style={{flex:1, paddingBottom: 10}}>
                    {
                        this.state.beli != 0 ?
                        <TouchableRipple
                        onPress={() => navigation.navigate('Koleksi')}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <View flexDirection='row' style={{paddingHorizontal:20, paddingVertical:15, justifyContent:'space-between'}}>
                            <View flexDirection="column">
                                <Text style={{fontSize: 18, alignItems: 'flex-start'}}> Koleksi Saya</Text>
                                <Text style={{marginTop: 0, fontSize: 12, color:'#5C5C5C', alignItems: 'flex-start'}}> Koleksi buku saya </Text>
                            </View>
                            <Icon name="angle-right" size={30} color={`${colors.text}`} style={{alignSelf:"center"}} />
                        </View>
                    </TouchableRipple> : <Text></Text>
                    }
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={3} // Reduce the window size
                    >
                        <View style={styles.CardContain}>
                            {
                                this.state.beli.map((item, x) => (
                                    <TouchableRipple
                                        key={x}
                                        onPress={() => navigation.navigate('DetailBuku', {id:item.books.id})}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                        style={{borderRadius:10}}
                                    >
                                        <View style={styles.Container}>
                                            <Card style={styles.Box}>
                                                <Card.Cover source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.books.picture}} style={styles.CoverImage} />
                                            </Card>
                                            <View style={{paddingHorizontal:5}}>
                                                <Paragraph numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                                                    {item.books.title}
                                                </Paragraph>
                                                <Paragraph style={styles.Content}>{item.books.halaman} Halaman</Paragraph>
                                            </View>
                                        </View>
                                    </TouchableRipple>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            }
            {
                displaybooks.map(({id, title_display, subtitle_display, books}, i) => (
                <View key={id} style={{flex:1, paddingBottom: 10}}>
                    <TouchableRipple
                        onPress={() => navigation.navigate('Kategori', {title: title_display, id: id})}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <View flexDirection='row' style={{paddingHorizontal:20, paddingVertical:15, justifyContent:'space-between'}}>
                            <View flexDirection="column">
                                <Text style={{fontSize: 18, alignItems: 'flex-start'}}>
                                    {title_display}
                                </Text>
                                <Text style={{marginTop: 0, fontSize: 12, color:'#5C5C5C', alignItems: 'flex-start'}}>
                                    {subtitle_display}
                                </Text>
                            </View>
                            <Icon name="angle-right" size={30} color={`${colors.text}`} style={{alignSelf:"center"}} />
                        </View>
                    </TouchableRipple>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={3} // Reduce the window size
                    >
                        <View style={styles.CardContain}>
                            {
                                books.map((item, x) => (
                                    <TouchableRipple
                                        key={x}
                                        onPress={() => navigation.navigate('DetailBuku', {id:item.id})}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                        style={{borderRadius:10}}
                                    >
                                        <View style={styles.Container}>
                                            <Card style={styles.Box}>
                                                <Card.Cover source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.picture}} style={styles.CoverImage} />
                                            </Card>
                                            <View style={{paddingHorizontal:5}}>
                                                <Paragraph numberOfLines={2} ellipsizeMode='tail' style={styles.Title}>
                                                    {item.title}
                                                </Paragraph>
                                                <Paragraph style={styles.Content}>{item.halaman} Halaman</Paragraph>
                                            </View>
                                        </View>
                                    </TouchableRipple>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View> ))
            }
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        width: 125,
        height: '60%',
        position: 'relative',
        padding: 0,
    },
    Box:{
        borderRadius:10,
        marginHorizontal: 5,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    Title:{
        marginTop: 10,
        lineHeight: 15,
        color: 'black'
    },
    Content:{
        marginTop: 0,
        fontSize: 12,
        color: '#414141'
    },
    bannerImage:{
        width: '100%',
        borderRadius: 10
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
    displaybooks: state.displaybooks.items,
    user: state.auth.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => dispatch(fetchUser()),
    getDisplayBooks: () => dispatch(fetchDisplayBooks())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Index));