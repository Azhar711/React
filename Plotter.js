import React from 'react';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { timeFormat } from 'd3-time-format';
import { AxisLeft, AxisBottom, AxisTop, AxisRight } from '@vx/axis';
import { LinePath } from '@vx/shape';
import CaliperComponent from '../Caliper/Caliper';
import AnnotationComponent from '../Annotation/Annotation';

const parseTime = value => {
  if (timeFormat('%S')(value) % 10 === 0) {
    return timeFormat('%H:%M:%S')(value);
  } else {
    return timeFormat('%S')(value);
  }
};

const PlotterComponent = ({
  datum,
  xScale,
  yScale,
  xMax,
  x,
  y,
  xPoints,
  i,
  datapoints,
  click,
  scroll,
  width,
  height,
  top,
  right,
  left,
  bottom,
  yMax,
  yAxisLabel,
  gridColor,
  strokeColor,
  scaleAdjust,
  cssAdjust,
  timeArray,
  Clicked
}) => {
  const defaultTickLabelStyle = {
    fill: 'black',
    fontSize: 15,
    fontFamily: 'Arial',
    textAnchor: 'middle',
    dx: '0.25em',
    color: '#470000'
  };

  const defaultTickLabelStyleTop = {
    fill: 'transparent'
  };

  return (
    <div key={i}>
      <svg width={width} height={height} onWheel={scroll}>
        <Grid
          top={top}
          xScale={xScale}
          yScale={yScale}
          stroke={'#f9d7ac'}
          width={xMax}
          height={yMax}
          numTicksRows={30}
          numTicksColumns={250}
        />
        <AxisRight
          top={top}
          scale={yScale}
          label={yAxisLabel}
          tickStroke={gridColor}
          tickLength={xMax}
        />
        <AxisLeft
          top={top}
          left={width - (right + left)}
          scale={yScale}
          label={'BPM'}
          tickStroke={gridColor}
          tickLength={xMax}
        />
        <AxisBottom
          top={yMax + top}
          bottom={bottom}
          scale={xScale}
          tickStroke={gridColor}
          tickLength={0.1}
          tickLabelProps={() => defaultTickLabelStyle}
          tickFormat={(value, index) => parseTime(value, index)}
        />
        <AxisTop
          top={yMax + top}
          bottom={bottom}
          scale={xScale}
          tickStroke={gridColor}
          tickLength={yMax}
          numTicks={50}
          tickLabelProps={() => defaultTickLabelStyleTop}
        />
        <Group top={top} key={i}>
          <LinePath
            data={datum}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke={strokeColor}
            strokeWidth={1.5}
          />
          <rect
            x={0}
            y={0}
            width={width - 20}
            height={height - 25}
            fill="transparent"
            onClick={click}
            onWheel={scroll}
          />
        </Group>
        {datapoints
          ? datapoints.map((data, index) => {
              /*eslint complexity: ["error", 20]*/
              if (data.startTime.length === 21) {
                data.startTime = `${data.startTime}00000`;
              } else if (data.startTime.length === 22) {
                data.startTime = `${data.startTime}0000`;
              } else if (data.startTime.length === 23) {
                data.startTime = `${data.startTime}000`;
              } else if (data.startTime.length === 24) {
                data.startTime = `${data.startTime}00`;
              }
              if (data.endTime.length === 21) {
                data.endTime = `${data.endTime}00000`;
              } else if (data.endTime.length === 22) {
                data.endTime = `${data.endTime}0000`;
              } else if (data.endTime.length === 23) {
                data.endTime = `${data.endTime}000`;
              } else if (data.endTime.length === 24) {
                data.endTime = `${data.endTime}00`;
              }
              let fill = 'None';
              switch (data.eventType) {
                case 'VT':
                  fill = '#aab3ff';
                  break;
                case 'NS':
                  fill = '#fce374';
                  break;
                case 'Noise':
                  fill = '#ff921e';
                  break;
                case 'VF':
                  fill = '#adadad';
                  break;
                default:
                  fill = 'None';
                  break;
              }
              return (
                <AnnotationComponent
                  key={index}
                  eventType={data.eventType}
                  fill={fill}
                  startTime={data.startTime}
                  endTime={data.endTime}
                  height={height}
                  width={width}
                  scaleAdjust={scaleAdjust}
                  cssAdjust={cssAdjust}
                  timeArray={timeArray}
                  newAnnotation={data.newAnnotation}
                  Clicked={click}
                  Close={Clicked.bind(this, index)}
                />
              );
            })
          : null}
        {xPoints
          ? xPoints.map((d, index) => {
              return (
                <CaliperComponent
                  key={index}
                  xCoordinate={d}
                  yMin={0}
                  yMax={height}
                  stroke={'rgb(0, 29, 255)'}
                  top={top}
                  timeArray={timeArray}
                  scaleAdjust={scaleAdjust}
                />
              );
            })
          : null}
      </svg>
    </div>
  );
};

export default PlotterComponent;
