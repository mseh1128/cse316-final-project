import React from 'react';

export default function Container({
  control: {
    width,
    height,
    backgroundColor,
    borderColor,
    borderThickness,
    borderRadius
  }
}) {
  console.log('In label');
  console.log(width);
  return (
    <div
      className="box"
      style={{
        width,
        height,
        backgroundColor,
        borderWidth: borderThickness,
        borderRadius,
        borderStyle: 'solid',
        borderColor
      }}
    />
  );
}
