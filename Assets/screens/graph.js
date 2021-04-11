import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {curveNatural} from 'd3-shape';
import {Circle, Path} from 'react-native-svg';

class Graph extends Component {
  render() {
    const data1 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53];
    const data2 = [-87, 66, -69, 92, -40, -61, 16, 62, 78, 90];

    //Array of datasets, following this syntax:
    const data = [
      {
        data: data1,
        svg: {stroke: '#1d3557'},
      },
      {
        data: data2,
        svg: {stroke: '#457b9d'},
      },
    ];
    //const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

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

      var mydata = [data1map, data2map];
      return mydata;
    };

    const Line = ({line}) => (
      <Path d={line} stroke={'rgba(134, 65, 244)'} fill={'none'} />
    );

    return (
      <View style={styles.mainContainer}>
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
                  style={{flex: 1, width: data1.length * 100}}
                  data={data}
                  contentInset={verticalContentInset}
                  svg={{strokeWidth: 2}}
                  curve={curveNatural}>
                  <Grid />
                  <Decorator />
                  <Line />
                </LineChart>
                <XAxis
                  style={{
                    marginHorizontal: -10,
                    height: xAxisHeight,
                    width: data1.length * 100,
                  }}
                  data={data1}
                  formatLabel={(value, index) => value}
                  contentInset={{left: 10, right: 10}}
                  svg={axesSvg}
                />
              </View>
            </ScrollView>
          </View>
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
