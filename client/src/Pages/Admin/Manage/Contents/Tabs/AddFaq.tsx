import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { useFormik } from 'formik';
import useFAQ from '../../../../../Hooks/Firebase/useFAQ'
import {FAQType} from '../../../../../Hooks/Firebase/useTypes'




type Props = {
  submit:(data: FAQType) => void  
  sequence:number
}

export default function AddFaq({submit,sequence}:Props) {
  const [open,setOpen] = useState(false);

  const formik = useFormik({
    initialValues:{
      question:"",
      answer:"",
      sequence:sequence
    },
    onSubmit:values =>{
      submit(values)
      setOpen(false)
    }
  })

  return (
    <Box  width={'100%'} mt={2} sx={{opacity:".5",transition:"all ease-in .3s",border:"1px dashed black",padding:"1em",borderRadius:"8px",cursor:"pointer",":hover":{opacity:".9"}}}> 
      {open?<>
        <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Question</Typography>
          <TextField
            required
            fullWidth
            id="question"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Answer</Typography>
          <TextField
            fullWidth
            id="answer"
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Button fullWidth variant="contained" color="primary"  sx={{marginTop:"1.5em"}} onClick={()=>{setOpen(false)}}>
                cancel
              </Button>
            </Grid>
            <Grid item xs={7}>
              <Button fullWidth variant="contained" color="primary" type='submit' sx={{marginTop:"1.5em"}}>
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </>:<Typography variant="subtitle2" color="initial" textAlign={"center"} onClick={()=>{setOpen(true)}}>Add New Question</Typography>}
      
    </Box>
  )
}
