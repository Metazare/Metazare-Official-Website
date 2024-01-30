import { useEffect } from 'react';
import useRequest from './useRequest';
import {TeamType} from './useTypes'

export default function useTeam() {

  useEffect(()=>{
    getTeamList();
  },[])

  const { data, loading, error, makeRequest } = useRequest();

  const getTeamList = ()=>{
    makeRequest("get","Team")
  }

  const postTeam = (data:TeamType) => {
    makeRequest("post","Team",data);
    getTeamList();
  }

  const deleteTeam = (id:any) => {
    makeRequest("delete","Team",{},id);
    getTeamList();
  }

  const updateTeam = (data:TeamType,id:any) => {
    makeRequest("update","Team",data,id);
    getTeamList();
  }
  return {data,loading,error,postTeam,deleteTeam,updateTeam,getTeamList}
}
