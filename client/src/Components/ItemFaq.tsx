import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {FAQType} from "../Hooks/Firebase/useTypes"


import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik'

interface Props {
  data:FAQType,
  id:string,
  del:(id: any) => void,
  update:(data: FAQType, id: any) => void,
}
function ItemFaq({data,id,update,del}:Props) {
  const [toEdit,setToEdit] = useState(false);
  const formik = useFormik({
    initialValues:{
      question:"",
      answer:"",
      sequence:3
    },
    onSubmit:values =>{
      update(values,id)
      setToEdit(false)
    }
  })

  useEffect(()=>{
    formik.setFieldValue("question",data.question)
    formik.setFieldValue("answer",data.answer)
    formik.setFieldValue("sequence",data.sequence)
  },[data])

  return (
    <Box>
      {toEdit?
        <>
          <Box display="flex" alignItems={"center"} mb={1}>
            <Typography variant="subtitle2" color="initial" fontWeight={600} flexGrow={1}>Question {data.sequence}</Typography>
            <IconButton size='small'  onClick={()=>{del(id)}}>
              <DeleteIcon  fontSize='small'/>
            </IconButton>
            <IconButton size='small' onClick={()=>{formik.handleSubmit()}}>
              <CheckIcon fontSize='small'/>
            </IconButton>
            <IconButton  size='small' onClick={()=>{setToEdit(false)}}>
              <CloseIcon fontSize='small'/>
            </IconButton>
          </Box>
          <TextField
            fullWidth
            id="question"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
          />
          <Typography variant="subtitle2" color="initial" mt={1} mb={".5em"} fontWeight={600} flexGrow={1}>Answer</Typography>
          <TextField
            fullWidth
            id="answer"
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
          />
        </>
      :
        <Box display="flex" alignItems={"center"}>
          <Typography variant="subtitle2" color="initial" sx={{opacity:".8"}} fontWeight={600} flexGrow={1}>Question {data.sequence}: <span style={{fontWeight:"400",opacity:".8"}}>{data.question}</span></Typography>
          <IconButton  size='small' onClick={()=>{setToEdit(true)}} >
            <EditIcon fontSize="small"/>
          </IconButton>
        </Box>
      }
      
    </Box>
  )
}

export default ItemFaq