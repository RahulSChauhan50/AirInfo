import axios from 'axios';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {loginAction} from '../Redux/index';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      textEmail: '',
      textPass: '',
      secureTextEntry: true,
      iconName: 'eye',
      isLoading: false,
    };
  }
  onIconPress = () => {
    if (this.state.secureTextEntry) {
      this.setState({secureTextEntry: false, iconName: 'eye-off'});
    } else {
      this.setState({secureTextEntry: true, iconName: 'eye'});
    }
  };

  loginFunction = () => {
    var myemail = this.state.textEmail.trim();
    var mypassword = this.state.textPass.trim();

    if (myemail.length > 0 && mypassword.length > 0) {
      this.setState({isLoading: true});
      axios
        .post('https://calm-garden-34154.herokuapp.com/api/login', {
          email: myemail,
          password: mypassword,
        })
        .then(res => {
          this.props.loginAction(res.data.userData, mypassword);
          //this.props.navigation.navigate('Register');
        })
        .catch(e => {
          console.log(e);
        })
        .then(this.setState({isLoading: false}));
    }
  };

  render() {
    console.log(this.props.email);
    console.log(this.props.username);
    console.log(this.props.password);
    return (
      <View style={styles.mainCointainer}>
        <Icon
          style={styles.icon}
          name="account-lock"
          size={70}
          color="#00BFFF"
        />
        <Text style={styles.textHeader}> sign in</Text>
        <Text style={styles.textWlcm}>WELCOME !</Text>
        <Text style={styles.textDesc}>sign in to your account</Text>
        <TextInput
          style={styles.inputContainer}
          label="Email"
          mode="outlined"
          theme={{
            colors: {
              primary: '#00BFFF',
              underlineColor: 'transparent',
            },
          }}
          value={this.state.textEmail}
          onChangeText={val => this.setState({textEmail: val})}
        />
        <View style={styles.password}>
          <TextInput
            style={styles.textInputPass}
            label="Password"
            mode="outlined"
            secureTextEntry={this.state.secureTextEntry}
            theme={{
              colors: {
                primary: '#00BFFF',
                underlineColor: 'transparent',
              },
            }}
            value={this.state.textPass}
            onChangeText={val => this.setState({textPass: val})}
            right={
              <TextInput.Icon
                name={this.state.iconName}
                size={26}
                onPress={() => {
                  this.onIconPress();
                }}
              />
            }
          />
        </View>
        <ActivityIndicator
          size="large"
          color="blue"
          animating={this.state.isLoading}
        />
        <Button
          style={styles.btnLogin}
          mode="contained"
          color="#00B2FF"
          uppercase={false}
          labelStyle={{color: 'white', fontSize: 18}}
          onPress={() => this.loginFunction()}>
          sign in
        </Button>
        <Button
          style={styles.registerbtn}
          mode="outlined"
          color="black"
          uppercase={false}
          labelStyle={{color: 'black', fontSize: 15}}
          onPress={() => this.props.navigation.navigate('Register')}>
          Don't have account? Create
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: '10%',
  },
  inputContainer: {
    marginTop: 20,
    borderRadius: 15,
  },
  btnLogin: {
    marginTop: 40,
    borderRadius: 15,
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textInputPass: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '800',
  },
  textWlcm: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: '900',
    alignSelf: 'flex-start',
    fontFamily: 'verdana',
  },
  textDesc: {
    alignSelf: 'flex-start',
    fontWeight: '400',
  },
  icon: {
    alignSelf: 'center',
  },
  registerbtn: {
    marginVertical: 20,
    borderTopLeftRadius: 15,
    borderColor: '#00BFFF',
    borderWidth: 2,
  },
});

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    username: state.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: (param1, param2) => {
      dispatch(loginAction(param1, param2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
