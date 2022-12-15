import React, { useEffect } from 'react';
import {
  FileInput,
  FormGroup,
  InputGroup,
  Button,
  Toaster,
  Switch,
  ControlGroup,
} from '@blueprintjs/core';
import MemeViewer from './MemeViewer';

const MemeGenerator = (props) => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  let [topText, setTopText] = React.useState('');
  let [bottomText, setBottomText] = React.useState('');
  let [tempTopText, setTempTopText] = React.useState('');
  let [tempBottomText, setTempBottomText] = React.useState('');
  let [image, setImage] = React.useState(null);
  let [imageName, setImageName] = React.useState('Select image...');
  let [imageSeleted, setImageSelected] = React.useState(false);
  let [autoUpdate, setAutoUpdate] = React.useState(true);

  const generateMeme = () => {
    setTopText(tempTopText);
    setBottomText(tempBottomText);
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (fileIsValidImage(file)) {
      setImageName(file.name);
      setImageSelected(true);
      setImage(file);
    } else {
      let toast = Toaster.create();
      toast.show({
        message: 'Invalid file type. Please select an image file.',
        intent: 'danger',
        icon: 'error',
        timeout: 5000,
      });
    }
  };

  const handleTextChange = (e) => {
    let text = e.target.value;
    if (e.target.id === 'top-text-input') {
      setTempTopText(text);
      if (autoUpdate) {
        setTopText(text);
      }
    } else {
      setTempBottomText(text);
      if (autoUpdate) {
        setBottomText(text);
      }
    }
  };

  const handleAutoUpdateChange = () => {
    setAutoUpdate(!autoUpdate);
  };

  const clearText = () => {
    setTempTopText('');
    setTempBottomText('');
    setTopText('');
    setBottomText('');
  };

  const fileIsValidImage = (file) => {
    return acceptedImageTypes.includes(file['type']);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: 400 }}>
        <br />
        <h1 className="bp4-heading">Generate a meme</h1>
        <FormGroup
          helperText="The image used for the background of the meme."
          label="Input Image"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <FileInput
            inputProps={{ accept: 'image/png, image/gif, image/jpeg' }}
            text={imageName}
            hasSelection={imageSeleted}
            type="file"
            className="bp4-fill"
            onInputChange={(e) => {
              handleImageChange(e);
            }}
          />
        </FormGroup>
        <FormGroup
          label="Top Text"
          labelFor="text-input"
          labelInfo="(optional)"
        >
          <InputGroup
            id="top-text-input"
            value={tempTopText}
            placeholder="Top Text"
            type="text"
            className="bp4-fill"
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
        </FormGroup>
        <FormGroup
          label="Bottom Text"
          labelFor="text-input"
          labelInfo="(optional)"
        >
          <InputGroup
            id="bottom-text-input"
            value={tempBottomText}
            placeholder="Bottom Text"
            type="text"
            className="bp4-fill"
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Switch onChange={handleAutoUpdateChange} checked={autoUpdate}>
            Auto update text
          </Switch>
          <Button
            intent="primary"
            text="Clear text"
            className="bp4-fill"
            icon="trash"
            disabled={image ? false : true}
            onClick={clearText}
          />
          {autoUpdate ? (
            ''
          ) : (
            <div>
              <br />
              <Button
                intent="primary"
                text="Generate Meme"
                className="bp4-fill"
                icon="refresh"
                disabled={image ? false : true}
                onClick={generateMeme}
              />
            </div>
          )}
        </FormGroup>
        <MemeViewer image={image} topText={topText} bottomText={bottomText} />
      </div>
    </div>
  );
};

export default MemeGenerator;
