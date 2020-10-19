import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Appbar, IconButton, Searchbar } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchSearchBooks } from './../../actions';

export class index extends Component {
    state = {
        query: '',
    };
    onSubmit = () => {
        const { query } = this.state;
        this.props.navigation.navigate('Result', {query: query})
    }
    render() {
        const { navigation } = this.props
        const { query } = this.state
        return (
            <View style={{flex:1}}>
                <Appbar style={styles.top}>
                    <View style={{flex:1}}>
                        <Searchbar 
                            placeholder="Cari Buku"
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
        return {
            searchbooks: state.searchbooks.items
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return {
            getSearchBooks: () => dispatch(fetchSearchBooks())
        };
    }

export default connect(mapStateToProps, mapDispatchToProps)(index)
