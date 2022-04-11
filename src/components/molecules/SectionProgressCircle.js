import ReactCircularSlider from '@fseehawer/react-circular-slider';
import React from 'react';

export default function SectionProgressCircle({ value, total }) {
  let arr = [];

  Array.from({ length: 101 }).map((item, index) => arr.push(`${index}%`));

  return (
    <div>
      <ReactCircularSlider
        width={100}
        label=" "
        verticalOffset="0"
        labelColor="#fff"
        knobColor="#005a58"
        progressColorFrom="#fcd34d"
        progressColorTo="#f59e0b"
        progressSize={10}
        trackColor="#fffbeb"
        trackSize={5}
        valueFontSize="2rem"
        max={100}
        min={0}
        data={arr} //...
        dataIndex={(value / total) * 100}
        hideKnob={true}
        knobDraggable={false}
      />
    </div>
  );
}
