import { useState } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import { DeleteOutlined, PhotoCamera } from '@mui/icons-material';
import MultiActionAreaCard from './MultiActionAreaCard';

function App() {
  const [image, setImage] = useState('');

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
      
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  return (
    <div className="App">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
          style={{ minHeight: '89vh' }}
      >
        <Grid item m={2}>
          <Button onClick={capture} variant="contained" endIcon={<PhotoCamera />}>Take screenshot</Button>
          { image && <IconButton onClick={() => setImage('')}  aria-label="delete"><DeleteOutlined /></IconButton> }
        </Grid>
        { image && 
          <Grid item m={2} style={{ maxWidth:"300px" }}>
            <MultiActionAreaCard image={image}></MultiActionAreaCard>
          </Grid>
        }
      </Grid>
    </div>
  );
}

export default App;
