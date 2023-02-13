import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard(props) {
  const { image, saveToFile, fileName } = props;

  return (
    <Card>
      <CardActionArea onClick={()=>saveToFile(image)}>
        <CardMedia
          component="img"
        //   width={"150px"}
          image={image}
          alt="screenshot"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {fileName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click to download
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
