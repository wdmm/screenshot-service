import { useState } from 'react';
import { Button, ButtonGroup, Grid, IconButton } from '@mui/material';
import { Delete, DeleteOutlined, PhotoCamera } from '@mui/icons-material';
import MultiActionAreaCard from './MultiActionAreaCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function App() {
  const [image, setImage] = useState('');
  const [iName, setIName] = useState('');

  const capture = async () => {
    const canvas = document.createElement("canvas");  

    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia();
      const track = captureStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();
      captureStream.getTracks().forEach(track => track.stop());

      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

      const frame = canvas.toDataURL();

      setImage(frame);
      setIName(`photo_${new Date().toISOString()}.jpg`);
      
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  const saveToFile = async (image) => {
    // this turns the base 64 string to a [File] object
    const res = await fetch(image);
    const buff = await res.arrayBuffer();
    // clone so we can rename, and put into array for easy proccessing
    const file = [
      new File([buff], iName, {
        type: 'image/jpeg',
      }),
    ];

    const opts = {
      suggestedName: iName,
      types: [{
        description: 'Image file',
        accept: {'image/jpeg': ['.jpeg']},
      }],
    };

    const fileHandle = await window.showSaveFilePicker(opts).catch((e)=>console.log(e));
    if (!fileHandle) return;
    const fileStream = await fileHandle.createWritable();
    await fileStream.write(file[0], {type: "image/jpeg"});
    await fileStream.close();
  };

  return (
    <div className="App">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
          style={{ minHeight: '89vh' }}
      >
        <Grid item m={2}>
          <Button onClick={capture} variant="contained" endIcon={<PhotoCamera />}>Take screenshot</Button>
          { image && <IconButton color="error" onClick={() => setImage('')}  aria-label="delete"><DeleteOutlined /></IconButton> }
        </Grid>
        { image && 
          <Grid item m={2} style={{ maxWidth:"360px" }}>
            <MultiActionAreaCard image={image} saveToFile={saveToFile} fileName={iName}></MultiActionAreaCard>
          </Grid>
        }
      </Grid>
    </div>
  );
}

export default App;
