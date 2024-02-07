import useTeam from '../../../../../Hooks/Firebase/useTeam';

import useModal from '../../../../../Hooks/Firebase/useModal';
import AddTeam from './AddTeam';

import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditTeam from './EditTeam';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Loading from '../../../../../Components/Loading';


export default function Team() {
  const {data:team,loading:loadingTeam,error:errorTeam,updateTeam,postTeam,deleteTeam} = useTeam();
  const {setOpenModal,ModalComponent,closeModal} = useModal();

  if(loadingTeam) return <Loading/>
  if(errorTeam) return <>Error</>

  return (
    <Box>
      <Typography variant="subtitle2" sx={{opacity:".9"}}  color="initial">Our Team</Typography>
      <TableContainer component={Paper} sx={{marginTop:'1em'}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left" sx={{display:"flex",justifyContent:"end"}}>
                <Button  variant="contained" color="primary" onClick={()=>{
                  setOpenModal(<AddTeam modalClose={closeModal} addFunc={postTeam} />)
                }}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {team?.map((member:any, index:any) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" sx={{ display: 'flex', gap: '1em', alignItems: "center" }}>
                <Avatar variant="circular" src={member.image} alt={member.name} sx={{ width: '35px', height: '35px' }} />
                <Typography variant="body1" color="initial">{member.name}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" color="initial">{member.roles}</Typography>
              </TableCell>
              <TableCell align="right">
                <Box display="flex" justifyContent={"flex-end"} gap={1}>
                  <IconButton size='medium' onClick={()=>{
                    setOpenModal(<EditTeam data={member} modalClose={closeModal} editFunc={updateTeam} />)
                  }}>
                    <EditIcon fontSize='medium' />
                  </IconButton>
                  <IconButton size='medium' onClick={() => {deleteTeam(member.id)}}>
                    <DeleteIcon fontSize='medium' />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      {ModalComponent()} 
    </Box>
  )
}
