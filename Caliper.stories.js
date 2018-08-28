import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CaliperComponent from './Caliper';
import { plotterData } from '../Plotter/PlotterData';

const componentName = 'Caliper';
const stories = storiesOf(componentName, module);

const times = plotterData.data.sampleTimes;

stories.add(
  'Caliper',
  withInfo('An SVG for Caliper')(() => (
    <svg width={1000} height={400}>
      <CaliperComponent
        key={1}
        xCoordinate={times.indexOf('2017-11-15 01:04:34.500000')}
        top={10}
        stroke={'#4286f4'}
        yMin={5}
        yMax={300}
      />
    </svg>
  ))
);
