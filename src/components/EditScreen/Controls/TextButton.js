import React from 'react';
import { Button } from 'react-materialize';

export default function TextButton({
  control: {
    width,
    height,
    text,
    fontSize,
    textColor,
    backgroundColor,
    borderColor,
    borderThickness,
    borderRadius
  }
}) {
  console.log('In label');
  console.log(width);
  return (
    <Button
      node="button"
      style={{
        width,
        height,
        fontSize,
        color: textColor,
        backgroundColor,
        borderWidth: borderThickness,
        borderRadius,
        borderStyle: 'solid',
        borderColor
      }}
    >
      {text}
    </Button>
  );
}
