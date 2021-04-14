import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {curveNatural} from 'd3-shape';
import {scaleTime} from 'd3-scale';
import {Circle, Path} from 'react-native-svg';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Mat from 'react-native-vector-icons/MaterialIcons';
import {logoutAction} from '../Redux/index';
import {Snackbar} from 'react-native-paper';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      cityInput: '',
      status: 'error',
      isLoading: false,
      visibleSnackbar: false,
      aqi: null,
    };
  }

  logoutFunction = () => {
    this.props.logoutAction();
    this.props.navigation.navigate('Login');
  };

  onToggleSnackBar = () => {
    this.setState({visibleSnackbar: true});
  };

  onDismissSnackBar = () => {
    this.setState({visibleSnackbar: false});
  };

  getAirQualityData = () => {
    if (this.state.cityInput.trim().length != 0) {
      this.setState({isLoading: true});
      axios
        .get(
          'https://api.waqi.info/feed/' +
            this.state.cityInput +
            '/?token=5402f0fa4924f8c14f4a6f35148f8d9cfb9e850a',
        )
        .then(res => {
          this.setState({
            data: res.data.data,
            status: res.data.status,
            aqi: res.data.data.aqi,
          });
        })
        .catch(e => {
          this.onToggleSnackBar();
        })
        .then(() => {
          this.setState({isLoading: false});
        });
    }
  };
  render() {
    if (this.state.data != null && this.state.status != 'error') {
      var oxygen = new Array();
      var pmten = new Array();
      var pmtweFive = new Array();
      var uv = new Array();
      var xAxisDateArray = new Array();

      for (var i = 0; i < this.state.data.forecast.daily.o3.length; i++) {
        xAxisDateArray.push(this.state.data.forecast.daily.o3[i].day);
        oxygen.push(this.state.data.forecast.daily.o3[i].avg);
      }
      for (var i = 0; i < this.state.data.forecast.daily.pm10.length; i++) {
        xAxisDateArray.push(this.state.data.forecast.daily.pm10[i].day);
        pmten.push(this.state.data.forecast.daily.pm10[i].avg);
      }
      for (var i = 0; i < this.state.data.forecast.daily.pm25.length; i++) {
        xAxisDateArray.push(this.state.data.forecast.daily.pm25[i].day);
        pmtweFive.push(this.state.data.forecast.daily.pm25[i].avg);
      }
      for (var i = 0; i < this.state.data.forecast.daily.uvi.length; i++) {
        xAxisDateArray.push(this.state.data.forecast.daily.uvi[i].day);
        uv.push(this.state.data.forecast.daily.uvi[i].avg);
      }

      var xAxisset = new Array();
      for (var i = 0; i < xAxisDateArray.length; i++) {
        if (xAxisset.indexOf(xAxisDateArray[i]) === -1) {
          xAxisset.push(xAxisDateArray[i]);
        }
      }
      var xAxisDate = new Array();
      for (var i = 0; i < xAxisset.length; i++) {
        xAxisDate.push({date: xAxisset[i]});
      }
    }

    //Array of datasets, following this syntax:
    const data = [
      {
        data: oxygen,
        svg: {stroke: '#011740'},
      },
      {
        data: pmten,
        svg: {stroke: '#ef476f'},
      },
      {
        data: pmtweFive,
        svg: {stroke: '#ffd60a'},
      },
      {
        data: uv,
        svg: {stroke: '#00F700'},
      },
    ];

    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      new Date().getDay()
    ];
    var time = moment().utcOffset('+05:30').format('hh:mm a');
    var Ctime = time.toUpperCase();
    const axesSvg = {fontSize: 10, fill: '#f4f3ee'};
    const verticalContentInset = {top: 10, bottom: 10};
    const xAxisHeight = 30;

    const Decorator = ({x, y, data}) => {
      var data1map = data[0]['data'].map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
      var data2map = data[1]['data'].map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
      var data3map = data[2]['data'].map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
      var data4map = data[3]['data'].map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));

      var mydata = [data1map, data2map, data3map, data4map];
      return mydata;
    };

    const Line = ({line}) => (
      <Path d={line} stroke={'rgba(134, 65, 244)'} fill={'none'} />
    );

    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={'#22223b'} barStyle="light-content" />
        <LinearGradient colors={['#4a4e69', '#22223b']} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: 30,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'verdana',
                  marginLeft: 20,
                  fontWeight: '600',
                  color: 'white',
                  alignSelf: 'flex-start',
                }}>
                Hi, {this.props.username !== null ? this.props.username : ''}
              </Text>
              <Mat
                style={{alignSelf: 'flex-end', marginTop: -30, marginRight: 20}}
                name="logout"
                size={35}
                color="white"
                onPress={() => {
                  this.logoutFunction();
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 50,
              }}>
              <Icon
                style={{marginTop: 15}}
                name="map-marker"
                size={25}
                color="white"
              />
              <TextInput
                placeholder="Enter  City"
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: 'white',
                  paddingBottom: -10,
                  fontSize: 18,
                  color: 'white',
                }}
                placeholderTextColor="white"
                returnKeyType="go"
                onChangeText={e => this.setState({cityInput: e})}
                onSubmitEditing={() => {
                  this.getAirQualityData();
                }}
              />
            </View>
            {this.state.aqi !== null ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  AQI :
                </Text>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: '800',
                    alignSelf: 'center',
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  {this.state.aqi}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                    marginBottom: 30,
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  ppm | ppb
                </Text>
                <Icon
                  style={{alignSelf: 'center', marginLeft: 20}}
                  name="weather-partly-snowy-rainy"
                  size={40}
                  color="white"
                />
              </View>
            ) : (
              <View></View>
            )}
            <Text
              style={{
                marginTop: 30,
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: '600',
                color: 'white',
              }}>
              {weekday} , {Ctime}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: 30,
            }}>
            {this.state.status == 'ok' ? (
              <View
                style={{
                  flexDirection: 'row',
                  height: 250,
                  marginLeft: 10,
                }}>
                <YAxis
                  data={[-100, 100]}
                  style={{marginBottom: xAxisHeight}}
                  contentInset={{top: 10, bottom: 10, left: 5, right: 5}}
                  svg={axesSvg}
                  formatLabel={value => `${value}`}
                />
                <View style={{flex: 1, marginLeft: 5}}>
                  <ScrollView
                    contentContainerStyle={{paddingHorizontal: 15}}
                    horizontal={true}>
                    <View style={{flexDirection: 'column'}}>
                      <LineChart
                        style={{flex: 1, width: xAxisset.length * 100}}
                        data={data}
                        contentInset={{top: 10, bottom: 10, left: 5, right: 5}}
                        svg={{strokeWidth: 2}}
                        curve={curveNatural}
                        xScale={scaleTime}>
                        <Grid />
                        <Decorator />
                        <Line />
                      </LineChart>
                      <XAxis
                        style={{
                          marginHorizontal: -10,
                          height: xAxisHeight,
                          width: xAxisset.length * 100,
                        }}
                        data={xAxisDate}
                        scale={scaleTime}
                        formatLabel={(value, index) =>
                          moment(xAxisDate[index].date).format('YYYY-MM-DD')
                        }
                        contentInset={{left: 30, right: 30}}
                        svg={axesSvg}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  marginLeft: 20,
                  alignSelf: 'center',
                  fontSize: 18,
                  color: '#f2e9e4',
                }}>
                No data to display
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,

              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#ef476f',
                borderRadius: 15,
                marginRight: 10,
                marginTop: 3,
              }}
            />
            <Text style={{color: '#f2e9e4'}}>PM-25</Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#ffd60a',
                borderRadius: 15,
                marginLeft: 20,
                marginRight: 10,
                marginTop: 3,
              }}
            />
            <Text style={{color: '#f2e9e4'}}>PM-10</Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#011740',
                borderRadius: 15,
                marginRight: 10,
                marginLeft: 20,
                marginTop: 3,
              }}
            />
            <Text style={{color: '#f2e9e4'}}>Ozone</Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#00F700',
                borderRadius: 15,
                marginLeft: 20,
                marginTop: 3,
                marginRight: 10,
              }}
            />
            <Text style={{color: '#f2e9e4'}}>UVI</Text>
          </View>
        </LinearGradient>
        <ActivityIndicator
          size="large"
          color="#00BFFF"
          style={styles.activityindicator}
          animating={this.state.isLoading}
        />
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
  mainContainer: {
    flex: 1,
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

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    username: state.username,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
