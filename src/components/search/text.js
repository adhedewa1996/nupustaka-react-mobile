import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Appbar, TouchableRipple, Searchbar, withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchSearchText } from './../../actions';

export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            bookId: this.props.navigation.getParam('id')
        };
    }
    onSubmit = () => {
        const { query, bookId } = this.state;
        this.props.getSearchText(query, bookId);
    }
    toReadPdf = (page) => {
        this.props.navigation.state.params.onGoBack(page);
        this.props.navigation.goBack();
    }
    render() {
        const { navigation, searchtext } = this.props
        const { query } = this.state
        const { colors } = this.props.theme
        return (
            <View style={{flex:1}}>
                <Appbar style={styles.top}>
                    <View style={{flex:1}}>
                        <Searchbar 
                            placeholder="Cari Di Buku"
                            onChangeText={query => { this.setState({ query }) }}
                            value={query}
                            autoFocus={true}
                            onIconPress={() => navigation.goBack()}
                            style={{elevation: 0}}
                            iconColor={'black'}
                            onSubmitEditing={this.onSubmit}
                            keyboardType="web-search"
                            icon="arrow-left"
                        />
                    </View>
                </Appbar>
                <View style={{flex: 1, paddingTop: 60}}>
                    <ScrollView
                        removeClippedSubviews={true}
                        initialNumToRender={2} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={3} // Reduce the window size
                        style={{flex: 1}}
                    >
                        {
                            searchtext == '' ? 
                            <View flexDirection='row' 
                            key={1} style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                <Text style={{alignSelf: "center"}}>Not Found</Text>
                            </View>
                            :
                            searchtext.map((item, i) => (
                                <TouchableRipple
                                    onPress={() => this.toReadPdf(item.page_number)}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                    style={{paddingVertical: 10}}
                                    key={i}
                                >
                                    <View flexDirection="row" style={{paddingHorizontal:15}}>
                                        <View style={{paddingHorizontal:15}}>
                                            <Text style={{fontWeight: 'bold'}}>Di Halaman : {item.page_number}</Text>
                                            <Text numberOfLines={4} style={{fontWeight: '200', color: colors.text}}>
                                                {item.content}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            ))
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
})

    function mapStateToProps(state) {
        console.log(state.searchtext.items)
        return {
            searchtext: state.searchtext.items
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return {
            getSearchText: (query, id) => dispatch(fetchSearchText(query, id))
        };
    }

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(index))
