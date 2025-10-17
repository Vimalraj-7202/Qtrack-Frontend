import { Typography } from '@mui/material';

interface titleProps{
    title:string;
    subTitle:string
}

const CommonTitle = ({title,subTitle}:titleProps) => {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
        <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>{title}</Typography>
        <Typography sx={{fontSize:'13px',color:'gray'}}>{subTitle}</Typography>
    </div>
  )
}

export default CommonTitle