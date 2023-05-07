import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, useTheme, useMediaQuery } from '@mui/material';

import { CakeType } from '../../types/cakeType';
import { useAppSelector } from '../../redux/hooks';

type CakePropType = {
  cake: CakeType;
};

//props from .... pages/Home.tsx
const CardCake = ({ cake }: CakePropType) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedStatus = useAppSelector((state) => state.auth.authInfo);
  return (
    <Card sx={{ minWidth: 280, margin: '0 auto', padding: '0.1em' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='250'
          image={cake.selectedFile}
          alt={cake.name}
          sx={{ padding: mdDown ? "0em":"1em 1em 0 1em" }}
        />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            {cake.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {cake.description}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Price: {cake.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant='contained'
          size='small'
          color='warning'
          onClick={() => {
            if (isLoggedStatus.isLoggedIn) {
              navigate(`/ordercake/${cake._id}/${isLoggedStatus._id}`);
            } else {
              navigate('/auth');
            }
          }}
        >
          Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardCake;
