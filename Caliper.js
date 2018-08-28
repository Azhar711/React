import React from 'react';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { Marker } from '@vx/marker';

const CaliperComponent = ({ xCoordinate, top, stroke, yMin, yMax, timeArray, scaleAdjust }) => {
  return (
    <Group>
      {
        <Marker
          from={new Point({ x: timeArray.indexOf(xCoordinate) / scaleAdjust, y: yMin })}
          to={new Point({ x: timeArray.indexOf(xCoordinate) / scaleAdjust, y: yMax })}
          top={top}
          stroke={stroke}
        />
      }
    </Group>
  );
};

export default CaliperComponent;
