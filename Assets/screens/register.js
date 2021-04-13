import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {registerAction} from '../Redux/index';
import axios from 'axios';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      textUser: '',
      textEmail: '',
      textPass: '',
      textPassConfirm: '',
      secureTextEntry: true,
      iconName: 'eye',
      visibleSnackbar: false,
      isLoading: false,
    };
  }
  onIconPress = () => {
    let iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';

    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
  };

  onToggleSnackBar = () => {
    this.setState({visibleSnackbar: true});
  };

  onDismissSnackBar = () => {
    this.setState({visibleSnackbar: false});
  };

  registerFunction = () => {
    var myemail = this.state.textEmail.trim();
    var mypassword = this.state.textPass.trim();
    var myuser = this.state.textUser.trim();
    var mypasswordconfirm = this.state.textPassConfirm.trim();

    if (
      myemail.length > 0 &&
      mypassword.length > 0 &&
      myuser.length > 0 &&
      mypasswordconfirm.length > 0
    ) {
      if (mypassword === mypasswordconfirm) {
        this.setState({isLoading: true});
        axios
          .post('https://calm-garden-34154.herokuapp.com/api/register', {
            email: myemail,
            password: mypassword,
            user_name: myuser,
            password_confirm: mypasswordconfirm,
          })
          .then(res => {
            this.props.registerAction(myemail, mypassword, myuser);
            this.props.navigation.navigate('Graph');
          })
          .catch(e => {
            this.onToggleSnackBar();
          })
          .then(() => {
            this.setState({isLoading: false});
          });
      } else {
        this.onToggleSnackBar();
      }
    }
  };
  render() {
    return (
      <View style={styles.mainCointainer}>
        <Icon
          style={styles.icon}
          name="account-plus"
          size={70}
          color="#00BFFF"
        />
        <Text style={styles.textHeader}>WELCOME !</Text>
        <Text style={styles.textdesc}>create a new account</Text>
        <TextInput
          style={styles.inputContainer}
          label="Username"
          mode="outlined"
          theme={{
            colors: {
              primary: '#00BFFF',
              underlineColor: 'transparent',
            },
          }}
          value={this.state.textUser}
          onChangeText={val => this.setState({textUser: val})}
        />
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
        <TextInput
          style={styles.inputContainer}
          label="Confirm Password"
          mode="outlined"
          theme={{
            colors: {
              primary: '#00BFFF',
              underlineColor: 'transparent',
            },
          }}
          value={this.state.textPassConfirm}
          onChangeText={val => this.setState({textPassConfirm: val})}
        />
        <ActivityIndicator
          size="large"
          color="#00BFFF"
          style={styles.activityindicator}
          animating={this.state.isLoading}
        />
        <Button
          style={styles.btnSignup}
          mode="contained"
          color="#00BFFF"
          uppercase={false}
          labelStyle={{color: 'white', fontSize: 18}}
          onPress={() => this.registerFunction()}>
          sign up using email
        </Button>
        <Text style={styles.textOr}>or </Text>

        <Button
          style={styles.btnLogin}
          mode="outlined"
          color="black"
          uppercase={false}
          labelStyle={{color: 'black', fontSize: 15}}
          onPress={() => this.props.navigation.navigate('Login')}>
          Existing User ?
        </Button>
        <Snackbar
          visible={this.state.visibleSnackbar}
          onDismiss={() => {
            this.onDismissSnackBar();
          }}>
          Something Went Wrong !
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: '10%',
  },
  inputContainer: {
    marginVertical: 10,
  },
  textOr: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  btnSignup: {
    marginTop: 30,
    borderRadius: 15,
  },
  btnLogin: {
    marginVertical: 20,
    borderTopLeftRadius: 15,
    borderColor: '#00BFFF',
    borderWidth: 2,
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textdesc: {
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
  },
  activityindicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    registerAction: (param1, param2, param3) => {
      dispatch(registerAction(param1, param2, param3));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
