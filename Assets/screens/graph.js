import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {curveNatural} from 'd3-shape';
import {scaleTime} from 'd3-scale';
import {Circle, Path} from 'react-native-svg';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      cityInput: 'shanghai',
      status: 'error',
    };
  }

  getAirQualityData = () => {
    if (this.state.cityInput.trim().length != 0) {
      axios
        .get(
          'https://api.waqi.info/feed/' +
            this.state.cityInput +
            '/?token=5402f0fa4924f8c14f4a6f35148f8d9cfb9e850a',
        )
        .then(res => {
          this.setState({data: res.data.data, status: res.data.status});
        })
        .catch(e => {
          console.log(e);
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
      var xAxisset = [...new Set(xAxisDateArray)];
      var xAxisDate=new Array();
      for(var i=0;i<xAxisset.length;i++){
        xAxisDate.push({date:xAxisset[i]})
      }
    }

    //Array of datasets, following this syntax:
    const data = [
      {
        data: oxygen,
        svg: {stroke: '#99d98c'},
      },
      {
        data: pmten,
        svg: {stroke: '#3d5a80'},
      },
      {
        data: pmtweFive,
        svg: {stroke: '#ef476f'},
      },
      {
        data: uv,
        svg: {stroke: '#ffd60a'},
      },
    ];

    const axesSvg = {fontSize: 10, fill: '#0096c7'};
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
        <LinearGradient colors={['#f0efeb', '#98c1d9']} style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Enter City"
              style={{borderBottomWidth: 2}}
              returnKeyType="go"
              onChangeText={e => this.setState({cityInput: e})}
              onSubmitEditing={() => {
                this.getAirQualityData();
              }}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            {this.state.status == 'ok' ? (
              <View style={{flexDirection: 'row', height: 200}}>
                <YAxis
                  data={[-100, 100]}
                  style={{marginBottom: xAxisHeight}}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                  formatLabel={value => `${value}ºC`}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <ScrollView
                    contentContainerStyle={{paddingHorizontal: 15}}
                    horizontal={true}>
                    <View style={{flexDirection: 'column'}}>
                      <LineChart
                        style={{flex: 1, width: xAxisset.length * 100}}
                        data={data}
                        contentInset={verticalContentInset}
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
                        contentInset={{left: 10, right: 10}}
                        svg={axesSvg}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : (
              <Text>No data to display</Text>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#1d3557',
                borderRadius: 15,
              }}
            />
            <Text>Line 1</Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#457b9d',
                borderRadius: 15,
              }}
            />
            <Text>Line 2</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Graph;
