import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { StackApp } from './src/router';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import { isSignedIn } from './src/actions/auth';
let store = createStore(reducers, {}, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F8B43',
    accent: '#129B4B',
    background: '#F8F9FA',
    text: '#716f6f'
  },
};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        checkedSignIn: false
      };
  }
  componentDidMount(){
    isSignedIn()
      .then(res => {
        this.setState({ loggedIn: res, checkedSignIn: true })
      })
      .catch(err => console.log('err'));
  }
  render() {
    const {loggedIn, checkedSignIn} = this.state;
    if (!checkedSignIn) {
      return null;
    }
    const Layout = StackApp(loggedIn);

    return (
      <StoreProvider store={store}>
        <StatusBar backgroundColor="#129B4B" barStyle="light-content" />
          <PaperProvider theme={theme}>
            <Layout />
          </PaperProvider>
      </StoreProvider>
    )
  }
}

export default App;