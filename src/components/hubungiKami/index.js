import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TextInput, CheckBox, TouchableOpacity, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Drawer, List, Checkbox } from 'react-native-paper';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';

export default class Index extends Component{
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hai jika ada saran silahkan lewat pesan disini',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://i.imgur.com/ePWCxVY.png',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  ButtonSend(props) {
      return (
        <Send
          {...props}
        >
          <View style={{marginBottom: 15, marginRight: 15}}>
              <Image source={require('./../../assets/send.png')} resizeMode={'center'}/>
          </View>
        </Send>
      );
    }

    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#E5E5E5',
            },
            right: {
              backgroundColor: '#308F53',
            },
          }}
        />
      )
    }

    textInputProps(props) {
      return (
        <TextInput
          {...props}
          style={{
            shadowColor: "#000",
            shadowOffset: {
            	width: 0,
            	height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderTopWidth: 0,
          }}
        />
      )
    }

  render() {

    return(
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderSend={props => this.ButtonSend(props)}
          textInputStyle={props => this.textInputStyle(props)}
          user={{
            _id: 1,
          }}
          alwaysShowSend={true}
          renderBubble={this.renderBubble}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({


});
