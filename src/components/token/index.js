import React, { Component } from 'react';
import { ScrollView, View, Text, CheckBox, TouchableOpacity, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Drawer, List, TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchUser, postRedeemVoucher } from './../../actions';
import 'moment/locale/id';
import axios from 'axios';
import { onToken } from '../../actions/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
class Token extends Component{
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      loading: true,
      token: null,
      topup: this.props.navigation.getParam('topup'),
      history: []
    };
  }
  componentDidMount(){
    setTimeout(() => {
      this.props.getProfile();
      const { user } = this.props;
      this.setState({
        token: user.token
      })
    }, 1000);

    onToken().then(res => {
      const AuthStr = 'Bearer ' + res;
      axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/history/redeem`, {
          headers: {
              Authorization: AuthStr
          }
      }).then(response => {
        setTimeout(() => {
          this.setState({
            visible: false,
            loading: false,
            history: response.data.data
          })
        }, 1000);
      }).catch(err => (err));
    })
  }
  onSubmit = () => {
    const { code } = this.state;
    const { voucher } = this.props;
    this.props.postRedeem(code);
    this.props.getProfile();
  }
  render() {
    const { navigation, loading } = this.props;
    const { user, voucher } = this.props;
    const { code } = this.state;
    moment.locale('id');
    return(
      <View style={{flex:1}}>
        <ScrollView style={{backgroundColor: '#ffffff'}}>
        <LinearGradient
          colors={['#05B755','#017133']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style = {{flex:1, borderBottomLeftRadius:25, borderBottomRightRadius:25, position:'relative'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
              <Icon name="ticket" size={70} color={`white`} style={{alignSelf: "center", marginTop: 20}} />
                <Text style={{color: '#ffffff', margin: 20}}>Token Saya</Text>
                {
                  this.state.loading ?
                  <View key="1" style={{flex:1, justifyContent: "center", alignContent: 'center'}}>
                    <ActivityIndicator animating={true} size="large" color="white" marginBottom={20}/>
                  </View> :
                  <Title style={{color: '#ffffff', fontWeight: 'bold', fontSize: 30, marginBottom: 30}}>{ Number(this.state.token).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</Title>
                }
          </View>
          </LinearGradient>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20}}>
            <Button
              mode="contained"
              // onPress={() => this.onSubmit()}
              onPress={() => navigation.navigate('Topup')}
              style={styles.buttonTopUp}
            >
              TOP UP TOKEN
            </Button>
          </View>
          {
            this.state.loading ?
            <View key="1" style={{flex:1, justifyContent: "center", alignContent: 'center'}}>
              <ActivityIndicator animating={true} size="large" color="#0F8B43" marginTop={200}/>
            </View> :
            this.state.history == '' ?
            <View style={styles.NoContent}>
              <Text> Belum Ada History </Text>
            </View> :
            <View style={{marginBottom: 10}}>
            <Text style={styles.history}> History </Text>
            {this.state.history.map((item, x) => (
                <View style={styles.container}>
                  <View style={styles.kotak}></View>
                  <View>
                    <Text style={styles.title}> { item.voucher.title } </Text>
                    <Text style={styles.date}> {moment(item.created_at).format('Do MMMM YYYY')} </Text>
                  </View>
                  <Text style={styles.token}> + { Number(item.voucher.token_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } Token</Text>
                </View>
            ))}
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NoContent:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions .get('window').height - 500,
    // paddingTop: 100
  },
  images:{
    marginTop: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonTopUp:{
    backgroundColor: '#329052',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    marginLeft:'30%',
    marginRight: '30%',
    // width:140,
    height:40,
    flex: 1,
    flexDirection: 'column',
  },
  history:{
    margin: 30,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold'
  },
  container:{
    flex: 1,
    margin: 30,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  date:{
    fontSize: 12,
    fontStyle: 'italic'
  },
  token:{
    flex: 1,
    fontSize: 18,
    color: 'green',
    textAlign: 'right',
  },
  kotak: {
    width: 40,
    height: 40,
    backgroundColor: '#42f5b0',
    borderRadius: 5,
    marginRight: 10
  }
});

function mapStateToProps(state) {
  return {
    user: state.auth.items,
    voucher: state.voucher.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postRedeem: (id) => dispatch(postRedeemVoucher(id)),
    getProfile: () => dispatch(fetchUser()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Token);