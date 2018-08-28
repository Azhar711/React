import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import PlotterComponent from './Plotter';
import { scaleLinear } from '@vx/scale';
import { min, max } from 'd3-array';
import zipWith from 'lodash/zipWith';
import { plotterData } from './PlotterData';

const componentName = 'Plotter Component';
const stories = storiesOf(componentName, module);

const xSelector = d => d.timestamp;
const ySelector = d => d.reading / 200;

const times = plotterData.data.sampleTimes;
const values = plotterData.data.sensorReadings;

const signals = values.map(signal => {
  let value = zipWith(times, signal.readings, function(timestamp, reading) {
    return { timestamp: timestamp, reading: reading };
  });
  return { name: signal.signalRef, readings: value };
});

const signal = signals.map(function(signals) {
  return signals.readings;
});

const scale = [-4, 5];
const yMax = 350;
const xMax = 1200;
const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [min(scale), max(scale)]
});

const idx = signal.map((d, i) => (d.timestamp = i));

stories.add(
  'Plotter Component',
  withInfo('An SVG for Annotations Component')(() => (
    <PlotterComponent
      signal={signal}
      xMax={xMax}
      xSelector={xSelector}
      ySelector={ySelector}
      markerData={[-1, -1]}
      datapoints={[22, 51]}
      click={'Clicked'}
      width={1200}
      height={350}
      top={10}
      right={12}
      left={3}
      bottom={15}
      yMax={yMax}
      yScale={yScale}
      yAxisLabel={'BPM'}
      gridColor={'#4286f4'}
      scaleAdjust={1.66667}
      cssAdjust={8}
      timeArray={times}
    />
  ))
);
