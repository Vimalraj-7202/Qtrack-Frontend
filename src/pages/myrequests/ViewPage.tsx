import { Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const ViewPage = () => {
    const {id}=useParams();
  return (
    <div>
        <Typography>{id}</Typography>
    </div>
  )
}

export default ViewPage