import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Login extends Component {
  constructor() {
    super();
    this.state = {
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
          style={styles.btnLogin}
          mode="contained"
          color="#00B2FF"
          uppercase={false}
          labelStyle={{color: 'white', fontSize: 18}}
          onPress={() => this.props.navigation.navigate('Graph')}>
          sign in
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
  iconEye: {position: 'absolute', right: 45, top: 31},
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
});

export default Login;
