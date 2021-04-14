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
          name="account-check"
          size={70}
          color="white"
        />
        <Text style={styles.textHeader}>WELCOME !</Text>
        <Text style={styles.textdesc}>create a new account</Text>
        <TextInput
          style={styles.inputContainer}
          label="Enter your name"
          mode="outlined"
          theme={{
            colors: {
              placeholder: 'white',
              text: 'white',
              primary: 'white',
              underlineColor: 'transparent',
              background: '#026676',
            },
          }}
          right={
            <TextInput.Icon
              name="account"
              size={26}
              color="white"
              onPress={() => {
                this.onIconPress();
              }}
            />
          }
          value={this.state.textUser}
          onChangeText={val => this.setState({textUser: val})}
        />
        <TextInput
          style={styles.inputContainer}
          label="Enter a email"
          mode="outlined"
          theme={{
            colors: {
              placeholder: 'white',
              text: 'white',
              primary: 'white',
              underlineColor: 'transparent',
              background: '#026676',
            },
          }}
          right={
            <TextInput.Icon name="email-multiple" size={26} color="white" />
          }
          value={this.state.textEmail}
          onChangeText={val => this.setState({textEmail: val})}
        />

        <TextInput
          style={styles.textInputPass}
          label="Choose a Password"
          mode="outlined"
          secureTextEntry={this.state.secureTextEntry}
          theme={{
            colors: {
              placeholder: 'white',
              text: 'white',
              primary: 'white',
              underlineColor: 'transparent',
              background: '#026676',
            },
          }}
          value={this.state.textPass}
          onChangeText={val => this.setState({textPass: val})}
          right={
            <TextInput.Icon
              name={this.state.iconName}
              color="white"
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
          secureTextEntry={true}
          theme={{
            colors: {
              placeholder: 'white',
              text: 'white',
              primary: 'white',
              underlineColor: 'transparent',
              background: '#026676',
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
          color="white"
          uppercase={false}
          labelStyle={{color: 'black', fontSize: 18}}
          onPress={() => this.registerFunction()}>
          sign up using email
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
    backgroundColor: '#026676',
  },
  inputContainer: {
    marginVertical: 10,
  },
  btnSignup: {
    marginTop: 30,
    borderRadius: 15,
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textdesc: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
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
