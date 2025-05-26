import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';
// import { Interface } from 'readline';

interface Props {
    id:string;
    title: string;
    Category: string;
    description: string;
    name:string
    price:number
    onClick?: () => void;
    // image: string;
}
export default function MultiActionAreaCard( { title,description,Category,name,price,onClick}: Props) {
  return (
    <Card style={{maxWidth: "350px" ,height:"450px"}}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
        //   height="10"
        style={{ height: '220px', objectFit: 'cover' }} 
        //   image="/static/images/cards/contemplative-reptile.jpg"
        image='/iiit.png'
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{fontSize:"25px",fontFamily:"fair display",color:"#062780"}}>
           {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary',marginBottom:"8px" }}>
          <span style={{fontSize:"18px" ,color:"#005f73",}}>Price  : Rs.{price}</span > 
          </Typography>
          <Typography variant="body2" sx={{ color: '	#001219',fontSize:"16px" }}>
           <span style={{fontSize:"18px",color:'	#3a2c73'}}> Description :</span>
           {/* <div> */}
           {/* <br /> */}
           {description}
           <br />
           {/* </div> */}
          </Typography>
          <Typography variant="body2" sx={{ color: '	#251236',marginTop:"10px" ,fontSize:"18px"}}>
            category : {Category}
            </Typography>
          <Typography variant="body2" sx={{ color: '	#24384f',marginTop:"10px",fontSize:"20px" }}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}