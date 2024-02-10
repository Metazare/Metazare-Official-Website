import { useEffect,useState } from 'react'
import {useFormik } from 'formik';
import useFirebase from '../../../../Hooks/useFirebase';
import {ServiceType} from '../../../../Hooks/Firebase/useTypes'

// MUI
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import LensIcon from '@mui/icons-material/Lens';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs  from 'dayjs';


type Props = {
  modalClose:() => void
  updateFunc:   (data: ServiceType, id: any) => void
  data: ServiceType
  id:any
}
function UpdateService({modalClose,updateFunc,data,id}:Props) {
  const {downloadURL,uploadFile} = useFirebase();


  const [formPage,setFormPage] = useState(1)
  const FormButton = ({ num , toolTip}: { num: number,toolTip:string}) => {
    return (
      <Tooltip title={toolTip}>
        <IconButton sx={formPage === num ? { opacity: "1" } : { opacity: ".5" }} >
          {formPage === num ?
            <RadioButtonCheckedIcon color='primary'/>
          : 
            formPage < num ? 
            <RadioButtonUncheckedIcon/> :
            <LensIcon sx={{scale:".7"}}/> 
          }
        </IconButton>
      </Tooltip> 
    );
  };

  const handleActiveChange = () =>{
    if(UpdateServiceForm.values.status === "active"){
      UpdateServiceForm.setFieldValue("status", new Date().getTime())
    }else{
      UpdateServiceForm.setFieldValue("status","active")
    }
  }
  const [uploadFileValue,setUploadFileValue] = useState<any>();
  useEffect(()=>{
    if(downloadURL){
      updateFunc({...UpdateServiceForm.values,imageUrl:downloadURL},id);
      modalClose();
    }
  },[downloadURL])


  const UpdateServiceForm = useFormik({
    initialValues:{
      title:data.title,
      description: data.description,
      tools: data.tools,
      imageUrl:data.imageUrl,
      status: data.status
    },
    validate: (values) => {
      let errors: { [key: string]: string } = {};
    
      switch (formPage) {
        case 1:
          if (!values.title) {
            errors = { ...errors, title: "Title is required" };
          }
          if (!values.description) {
            errors = { ...errors, description: "Description are required" };
          }
          if (values.tools.length < 3) {
            errors = { ...errors, tools: "Add atleast 3 Tools" };
          }
          break;
        default:
          break;
      }
      return errors;
    },
    onSubmit:(values) =>{
      switch (formPage) {
        case 1:
          setFormPage(2)
          break;
        case 2:
          setFormPage(3)
          break;
        case 3:
          if(uploadFileValue){
            uploadFile(uploadFileValue,"Service");
          }else{
            updateFunc(values,id);
            modalClose()
          }
          break;
        default:
          break;
      }
    }
  })




  return (
    <Box sx={{minWidth:{md:"500px",xs:"300px"}}}>
      <Typography variant="h5" fontWeight={600} color="primary">Update Services</Typography>
      <Box display="flex" alignItems={"center"} margin={".5em 0 1em"}>
        <FormButton num={1} toolTip={"Basic Information"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={2} toolTip={"Image Upload"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={3} toolTip={"Active"}/>
      </Box>
      <form onSubmit={(e)=>{e.preventDefault(); UpdateServiceForm.handleSubmit()}} >
        {formPage === 1 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
          <TextField
            name="title"
            fullWidth
            id="title"
            value={UpdateServiceForm.values.title}
            onChange={UpdateServiceForm.handleChange}
            error={UpdateServiceForm.touched.title && UpdateServiceForm.errors.title !== undefined}
            helperText={UpdateServiceForm.touched.title && UpdateServiceForm.errors.title}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Description</Typography>
          <TextField
            name="description"
            fullWidth
            id="description"
            value={UpdateServiceForm.values.description}
            onChange={UpdateServiceForm.handleChange}
            error={UpdateServiceForm.touched.description && UpdateServiceForm.errors.description !== undefined}
            helperText={UpdateServiceForm.touched.description && UpdateServiceForm.errors.description}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">List of Tools</Typography>
          <Autocomplete
            fullWidth
            multiple
            id="tags-outlined"
            options={[]}
            defaultValue={[]}
            freeSolo
            value={UpdateServiceForm.values.tools}
            onChange={(event, newValue) => {
              UpdateServiceForm.setFieldValue('tools', newValue);
            }}
            renderTags={(value: any, getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label=""
                placeholder="tools..."
                error={UpdateServiceForm.touched.tools && UpdateServiceForm.errors.tools !== undefined}
                helperText={UpdateServiceForm.touched.tools && UpdateServiceForm.errors.tools}
              />
            )}
            
          />
        </>}
        {formPage === 2 && <>
          <label htmlFor="image">
            <Box display="flex" flexDirection={"column"}  height={"300px"} justifyContent={"center"} alignItems={"center"} sx={{padding:"1em 0",border:"1px dashed #1976d2",borderRadius:"8px",gap:".5em",cursor:"pointer",transition:"all .3s ease-in",opacity:".6",":hover":{opacity:"1"}}}>
              {uploadFileValue? 
                <>
                  <Box display="flex" width={"80%"} height={"300px"} sx={{overflow:"hidden", borderRadius:"8px"}} justifyContent={"center"} alignItems={"start"}>
                    <img width={"400px"} src={URL.createObjectURL(uploadFileValue)} alt="" />
                  </Box>
                  <Typography variant="subtitle2" textAlign={"center"} fontSize={"10px"} color="initial">Click again if you want to change</Typography>
                </>:<>
                  <Box  sx={{width:{md:"400",xs:"300px"},height:"600px",overflow:'hidden'}}>
                    <img width={"100%"} height={"auto"} src={UpdateServiceForm.values.imageUrl} alt="" />
                    <Typography variant="subtitle2" textAlign={"center"} fontSize={"10px"} color="initial">Click again if you want to change</Typography>
                  </Box>
                </>
              }
            </Box>            
          </label>
          <Typography variant="subtitle2" color="error" textAlign={"center"} mt={".8em"}>{UpdateServiceForm.touched.imageUrl && UpdateServiceForm.errors.imageUrl !== undefined && UpdateServiceForm.touched.imageUrl && UpdateServiceForm.errors.imageUrl}</Typography>
          <TextField
            name="image"
            id='image'
            fullWidth
            type='file'
            onChange={async(e:any)=>{
              setUploadFileValue(e.target.files[0])
              console.log(e.target.files[0])
            }}
            inputProps={{
              accept: '.jpg',
            }}
            sx={{display:"none"}}
          />
        </>}
        {formPage === 3 &&<>
          <FormControlLabel
            control={
              <Checkbox checked={UpdateServiceForm.values.status === "active"} onChange={handleActiveChange} name="gilad" />
            }
            label="Set availbe to accept service"
          />
          {UpdateServiceForm.values.status !== "active" &&<>
            <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Availability date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={dayjs(UpdateServiceForm.values.status)}
                  onChange={(newValue) => {
                    UpdateServiceForm.setFieldValue("status",dayjs(newValue).valueOf());
                    console.log(UpdateServiceForm.values)
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </>}
        </>}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={5}>
            <Button fullWidth variant="contained" color="primary"  sx={{marginTop:"1.5em"}} onClick={()=>{modalClose()}}>
              cancel
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button fullWidth variant="contained" color="primary" type='submit' sx={{marginTop:"1.5em"}}>
              {formPage !== 3? "Next":"Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default UpdateService