import React from 'react';
import { Group } from '@vx/group';

const AnnotationComponent = ({
  timeArray,
  startTime,
  endTime,
  scaleAdjust,
  height,
  fill,
  cssAdjust,
  eventType,
  newAnnotation,
  Clicked,
  Close
}) => {
  const x = timeArray.indexOf(startTime.replace('T', ' ')) / scaleAdjust;
  const y = timeArray.indexOf(endTime.replace('T', ' ')) / scaleAdjust;

  const width =
    timeArray.indexOf(endTime.replace('T', ' ')) / scaleAdjust -
    timeArray.indexOf(startTime.replace('T', ' ')) / scaleAdjust;
  const text =
    (timeArray.indexOf(startTime.replace('T', ' ')) / scaleAdjust +
      timeArray.indexOf(endTime.replace('T', ' ')) / scaleAdjust) /
      2 -
    cssAdjust;

  /*eslint complexity: ["error", 20]*/
  return (
    <Group>
      <rect
        x={x}
        width={Math.abs(width)}
        height={height - 15}
        fillOpacity={0.5}
        fill={fill}
        onClick={Clicked}
      />
      {y > 0 ? (
        <text x={text > 0 ? text : null} y={height / 10} width={width / 2 - cssAdjust}>
          {eventType}
        </text>
      ) : null}
      {newAnnotation && text > 0 ? (
        <text
          className="close"
          x={text > 0 ? text : null}
          y={height - 50}
          width={width / 2 - cssAdjust}
          onClick={Close}
        >
          {text > 0 ? 'X' : null}
        </text>
      ) : null}
    </Group>
  );
};

export default AnnotationComponent;
