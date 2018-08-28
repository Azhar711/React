import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import AnnotationComponent from './Annotation';
import { plotterData } from '../Plotter/PlotterData';

const componentName = 'Annotations Component';
const stories = storiesOf(componentName, module);

const times = plotterData.data.sampleTimes;

stories.add(
  'Annotations Component',
  withInfo('An SVG for Annotations Component')(() => (
    <svg width={1000} height={400}>
      <AnnotationComponent
        timeArray={times}
        startTime={'2017-11-15T01:04:34.500000'}
        endTime={'2017-11-15T01:04:38.420000'}
        scaleAdjust={1.6667}
        height={350}
        fill={'#4286f4'}
        cssAdjust={8}
        eventType={'NS'}
      />
    </svg>
  ))
);
