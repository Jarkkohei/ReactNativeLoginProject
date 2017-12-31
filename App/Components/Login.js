import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.22


export default class Login extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    }
  }
  
  _loadInitialState = async () => {
    
    let value = await AsyncStorage.getItem('user');
    
    if(value !== null) {
      this.props.navigation.navigate('Profile');
    }
  }
  
  componentDidMount() {
    this._loadInitialState().done();
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
        
          <Text style={styles.header}>- LOGIN -</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder='Username'
            onChangeText={ (username) => { this.setState({username})} }
            underlineColorAndroid='transparent'
          />
          
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={ (password) => { this.setState({password})} }
            underlineColorAndroid='transparent'
          />
          
          <TouchableOpacity 
            style={styles.btn}
            onPress={this.login}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  login = () => {
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((res) => {
      
      if(res.success === true) {
        AsyncStorage.setItem('user', res.user);
        this.props.navigation.navigate('Profile');
      } else {
        alert(res.message);
      }
    })
    .done();
  }
  
}




const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4d4d4',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: 'green',
    padding: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff'
  }
});