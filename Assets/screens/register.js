import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      textUser: '',
      textEmail: '',
      textPass: '',
      secureTextEntry: true,
      iconName: 'eye',
    };
  }
  onIconPress = () => {
    let iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';

    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
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
          />
          <Icon
            style={styles.iconEye}
            name={this.state.iconName}
            size={26}
            color="black"
            onPress={() => this.onIconPress()}
          />
        </View>
        <Button
          style={styles.btnSignup}
          mode="contained"
          color="#00BFFF"
          uppercase={false}
          labelStyle={{color: 'white', fontSize: 18}}
          onPress={() => this.props.navigation.navigate('Login')}>
          sign up using email
        </Button>
        <Text style={styles.textOr}>or </Text>

        <Button
          style={styles.btnLogin}
          mode="outlined"
          color="black"
          uppercase={false}
          labelStyle={{color: 'black', fontSize: 15}}
          onPress={() => console.log('pressed')}>
          Existing User ?
        </Button>
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
  password: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInputPass: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  iconEye: {position: 'absolute', right: 45, top: 31},
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
});

export default Register;
