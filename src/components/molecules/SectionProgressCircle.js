import ReactCircularSlider from '@fseehawer/react-circular-slider';
import React from 'react';

export default function SectionProgressCircle({
  value,
  total,
  labelColor = '#FFF',
  width = 100,
  fontSize = '2rem',
  colorProgress = '#fffbeb',
  colorFinish = '#f59e0b',
  colorStart = '#fcd34d',
}) {
  let arr = [];

  Array.from({ length: 101 }).map((item, index) => arr.push(`${index}%`));

  return (
    <div>
      <ReactCircularSlider
        width={width}
        label=" "
        verticalOffset="0"
        labelColor={labelColor}
        knobColor="#005a58"
        progressColorFrom={colorStart}
        progressColorTo={colorFinish}
        progressSize={10}
        trackColor={colorProgress}
        trackSize={5}
        valueFontSize={fontSize}
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
