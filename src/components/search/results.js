import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Appbar, Text, TouchableRipple, withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchSearchBooks } from './../../actions';
import { NavigationActions } from 'react-navigation';
export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.navigation.getParam('query')
        };
    }
    componentDidMount() {
        const { query } = this.state;
        console.log(this.props.getSearchBooks(query))
        
    }
    render() {
        const { navigation, searchbooks } = this.props
        const { query } = this.state
        const { colors } = this.props.theme
        return (
            <View style={{flex:1}}>
                <Appbar style={styles.top}>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content 
                        title={query}
                        style={{fontWeight: '100'}}
                    />
                    <Appbar.Action 
                        icon="magnify"
                        onPress={() => navigation.goBack()}
                    />
                </Appbar>
                <View style={{paddingTop:60, flex: 1}}>
                <ScrollView
                    removeClippedSubviews={true}
                    initialNumToRender={2} // Reduce initial render amount
                    maxToRenderPerBatch={1} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                    windowSize={3} // Reduce the window size
                    style={{flex: 1}}
                >
                    {
                        searchbooks != '' ? 
                        searchbooks.map((item, i) => (
                            <TouchableRipple
                                onPress={() => navigation.push('DetailBuku', {id: item.id})}
                                rippleColor="rgba(0, 0, 0, .32)"
                                style={{paddingVertical: 10}}
                                key={i}
                            >
                                <View flexDirection="row" style={{paddingHorizontal:15}}>
                                    <Image
                                        source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.picture}}
                                        style={styles.image}
                                    />
                                    <View style={{paddingHorizontal:15}}>
                                        <Text numberOfLines={1} style={{fontWeight: '400', color: 'black', width: 300}}>{item.title}</Text>
                                        <Text numberOfLines={1} style={{fontWeight: '400', color: colors.text}}>{item.author}</Text>
                                        <Text numberOfLines={1} style={{fontWeight: '400', color: colors.text}}>{item.penerbit}</Text>
                                    </View>
                                </View>
                            </TouchableRipple>
                        )) :
                        <View flexDirection='row' style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                            <Text style={{alignSelf: "center"}}>Not Found</Text>
                        </View>
                    }
                </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'white'
    },
    image:{
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:100,
        width: 60,
        resizeMode:'contain'
    },
})

    function mapStateToProps(state) {
        console.log(state.searchbooks.items)
        return {
            searchbooks: state.searchbooks.items
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return {
            getSearchBooks: (query) => dispatch(fetchSearchBooks(query))
        };
    }

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(index))
