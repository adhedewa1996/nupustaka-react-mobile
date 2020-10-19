import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TouchableRipple, Card, } from 'react-native-paper'
import { SliderBox } from 'react-native-image-slider-box';
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios';
import { onToken } from '../../actions/auth';
import 'moment/locale/id';

export class Index extends Component {
    constructor(props) {
        super(props);
            this.state = {
            images: [
                'https://i.imgur.com/FG9zWNq.png',
                'https://i.imgur.com/FG9zWNq.png',
                'https://i.imgur.com/FG9zWNq.png',
                'https://i.imgur.com/FG9zWNq.png'
            ],
            beli: [],
            categoryId: this.props.navigation.getParam('id'),
        };
    }

    componentDidMount(){
      onToken().then(res => {
          const AuthStr = 'Bearer ' + res;
          axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/display/${this.state.categoryId}`, {
              headers: {
                  Authorization: AuthStr
              }
          }).then(response => {
              this.setState({
                beli: response.data.data.books
              });
          }).catch(err => (err));
      })
      console.log(this.state.categoryId)
    }

    render() {
      moment.locale('id');
      return (
        <View style={{flex:1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
            <SliderBox
                images={this.state.images}
                sliderBoxHeight={180}
                dotColor="#F4FFF8"
                inactiveDotColor="#5CF08F"
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    padding: 0,
                    margin: 0
                }}
                circleLoop
            />
            {this.state.beli.map((item, x) => (
              <TouchableRipple 
                  key={x}
                  onPress={() => this.props.navigation.navigate('DetailBuku', {id:item.id})}
                  rippleColor="rgba(0, 0, 0, .32)"
                  style={{borderRadius:10}}
              >
              <View style={styles.Container}>
                  <Card.Cover source={{uri: 'http://powerful-headland-43561.herokuapp.com/asset/book/'+item.picture}} style={styles.CoverImage} />
                  <View style={styles.Card}>
                      <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Title}> { item.title } </Text>
                      <View>
                          <Text style={styles.Content}> Penulis { item.author } </Text>
                          <Text style={styles.Content}> Penerbit { item.penerbit } </Text>
                      </View>
                  </View>
              </View>
              </TouchableRipple>
          ))}
        </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  Container:{
    // width: '18%',
    // height: 00,
    position: 'relative',
    marginBottom: 10,
    margin:20,
    flexDirection: 'row'
  },
  Card:{
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
  },
  Title:{
    width: '80%',
    fontSize: 16,
    lineHeight: 20,
    textAlign:'left'
  },
  Content:{
    color: '#404040',
    fontSize: 12,
    textAlign:'left'
  },
  Time:{
    color: '#404040',
    lineHeight: 12,
    textAlign:'right',
    marginRight: 70,
    color: 'green'
  },
  CoverImage: {
      height: 100,
      width: 60,
      borderRadius:5
  },
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
