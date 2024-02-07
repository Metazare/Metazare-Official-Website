import { useEffect,useState } from 'react'
import {useFormik } from 'formik';
import useFirebase from '../../../../Hooks/useFirebase';
import {ServiceType} from '../../../../Hooks/Firebase/useTypes'

// MUI
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton'

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import Tooltip from '@mui/material/Tooltip'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import LandscapeIcon from '@mui/icons-material/Landscape';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs  from 'dayjs';

type Props = {
  modalClose:() => void
  postFunc: (data: ServiceType) => void
}
function AddServices({modalClose,postFunc}:Props) {

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
    if(addServiceForm.values.status === "active"){
      addServiceForm.setFieldValue("status", new Date().getTime())
    }else{
      addServiceForm.setFieldValue("status","active")
    }
  }

  const [uploadFileValue,setUploadFileValue] = useState<any>();
  useEffect(()=>{
    if(downloadURL){
      postFunc({...addServiceForm.values,imageUrl:downloadURL});
      modalClose();
    }
  },[downloadURL])

  const addServiceForm = useFormik({
    initialValues:{
      title:"",
      description:"",
      tools: [],
      imageUrl:downloadURL,
      status:"active"
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
        case 2:
          if (!uploadFileValue) {
            errors = { ...errors, imageUrl: "You need to upload image first" };
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
          uploadFile(uploadFileValue,"Service");
          break;
        default:
          break;
      }
    }
  })

  return (
    <Box sx={{minWidth:{md:"500px",xs:"300px"}}}>
      <Typography variant="h5" fontWeight={600} color="primary">Add Services</Typography>
      <Box display="flex" alignItems={"center"} margin={".5em 0 1em"}>
        <FormButton num={1} toolTip={"Basic Information"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={2} toolTip={"Image Upload"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={3} toolTip={"Active"}/>
      </Box>
      <form onSubmit={(e)=>{e.preventDefault(); addServiceForm.handleSubmit()}} >
        {formPage === 1 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
          <TextField
            name="title"
            fullWidth
            id="title"
            value={addServiceForm.values.title}
            onChange={addServiceForm.handleChange}
            error={addServiceForm.touched.title && addServiceForm.errors.title !== undefined}
            helperText={addServiceForm.touched.title && addServiceForm.errors.title}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Description</Typography>
          <TextField
            name="description"
            fullWidth
            id="description"
            value={addServiceForm.values.description}
            onChange={addServiceForm.handleChange}
            error={addServiceForm.touched.description && addServiceForm.errors.description !== undefined}
            helperText={addServiceForm.touched.description && addServiceForm.errors.description}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">List of Tools</Typography>
          <Autocomplete
            fullWidth
            multiple
            id="tags-outlined"
            options={[]}
            defaultValue={[]}
            freeSolo
            value={addServiceForm.values.tools}
            onChange={(event, newValue) => {
              addServiceForm.setFieldValue('tools', newValue);
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
                error={addServiceForm.touched.tools && addServiceForm.errors.tools !== undefined}
                helperText={addServiceForm.touched.tools && addServiceForm.errors.tools}
              />
            )}
            
          />
        </>}
        {formPage === 2 && <>
          <label htmlFor="image">
            <Box display="flex" flexDirection={"column"}  height={"300px"} justifyContent={"center"} alignItems={"center"} sx={{border:"1px dashed #1976d2",borderRadius:"8px",gap:".5em",cursor:"pointer",transition:"all .3s ease-in",opacity:".6",":hover":{opacity:"1"}}}>
              {uploadFileValue? 
                <>
                  <LandscapeIcon fontSize='large'/>
                  <Typography variant="body1" textAlign={"center"} color="initial">You've selected an image named ({uploadFileValue.name})</Typography>
                  <Typography variant="subtitle2" textAlign={"center"} fontSize={"10px"} color="initial">Click again if you want to change</Typography>
                </>:<>
                  <Box display="flex" gap={".5em"}>
                    <FileUploadIcon color='primary'/>
                    <Typography variant="body1" color="primary">Upload Image</Typography>
                  </Box>
                </>}
            </Box>            
          </label>
          <Typography variant="subtitle2" color="error" textAlign={"center"} mt={".8em"}>{addServiceForm.touched.imageUrl && addServiceForm.errors.imageUrl !== undefined && addServiceForm.touched.imageUrl && addServiceForm.errors.imageUrl}</Typography>
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
              <Checkbox checked={addServiceForm.values.status === "active"} onChange={handleActiveChange} name="gilad" />
            }
            label="Set availbe to accept service"
          />
          {addServiceForm.values.status !== "active" &&<>
            <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Availability date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={dayjs(addServiceForm.values.status)}
                  onChange={(newValue) => {
                    addServiceForm.setFieldValue("status",dayjs(newValue).valueOf());
                    console.log(addServiceForm.values)
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
              {formPage !== 3? "Next":"Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AddServices