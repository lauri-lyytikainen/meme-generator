import React, { useEffect, useState } from 'react';
import { Button, Overlay, Card, ControlGroup } from '@blueprintjs/core';

const MemeViewer = (props) => {
  const canvasRef = React.useRef(null);
  const finalCanvasRef = React.useRef(null);

  let [imagePreviewHeight, setImagePreviewHeight] = React.useState(0);
  let [isOverlayOpen, setIsOverlayOpen] = React.useState(false);
  let [imageWidth, setImageWidth] = React.useState(0);
  let [imageHeight, setImageHeight] = React.useState(0);
  let [outputWidth, setOutputWidth] = React.useState(0);
  let [outputHeight, setOutputHeight] = React.useState(0);

  function wrapText(context, text, x, y, maxWidth, lineHeight, fontSize) {
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${fontSize}px impact`;
    context.lineWidth = fontSize / 24;

    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        context.strokeText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
    context.strokeText(line, x, y);
  }

  const addTextToImage = (canvas, topText, bottomText, displayFullSized) => {
    if (!canvas) {
      return;
    }
    var context = canvas.getContext('2d');
    const previewSize = 380;
    const fullSize = 1042;
    let imageSize = displayFullSized ? fullSize : previewSize;

    // Draw Image function
    var img = new Image();
    img.src = props.image ? URL.createObjectURL(props.image) : '';
    img.onload = function () {
      setImageWidth(img.width);
      setImageHeight(img.height);
      var hRatio = imageSize / img.width;
      var vRatio = imageSize / img.height;
      var ratio = Math.min(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;

      if (!displayFullSized) {
        setImagePreviewHeight(img.height * ratio);
      } else {
        setOutputHeight(img.height * ratio);
        setOutputWidth(img.width * ratio);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio,
        img.width * ratio,
        img.height * ratio
      );
      context.fillStyle = '#ffffff';
      context.lineStyle = '#000000';
      const fontSize = Math.max(img.height * ratio, img.width * ratio) / 10;
      const offset = fontSize;

      wrapText(
        context,
        topText,
        imageSize / 2,
        offset,
        Math.min(imageSize, 1024),
        fontSize,
        fontSize
      );
      wrapText(
        context,
        bottomText,
        imageSize / 2,
        img.height * ratio - offset,
        Math.min(imageSize, 1024),
        fontSize,
        fontSize
      );
    };
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
    setImagePreviewHeight(-1);
  };

  const downloadImage = () => {
    const canvas = finalCanvasRef.current;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const finalCanvas = finalCanvasRef.current;
    addTextToImage(canvas, props.topText, props.bottomText, false);
    addTextToImage(finalCanvas, props.topText, props.bottomText, true);
  });

  return (
    <div>
      <Button
        className="bp4-minimal"
        disabled={props.image ? false : true}
        onClick={toggleOverlay}
      >
        <canvas
          ref={canvasRef}
          width="380px"
          height={imagePreviewHeight}
        ></canvas>
        <br />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Click image to view full size</p>
        </div>
      </Button>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={toggleOverlay}
        transitionDuration={0}
      >
        <Card
          style={{
            // Aling the card to the center of the screen
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          elevation={4}
        >
          <canvas
            ref={finalCanvasRef}
            width={outputWidth}
            height={outputHeight}
          ></canvas>
          <ControlGroup fill="false">
            <Button intent="warning" icon="cross" onClick={toggleOverlay}>
              Close
            </Button>
            <Button intent="success" icon="download" onClick={downloadImage}>
              Download
            </Button>
          </ControlGroup>
        </Card>
      </Overlay>
    </div>
  );
};

export default MemeViewer;
