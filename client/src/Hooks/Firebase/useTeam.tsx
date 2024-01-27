import { useEffect } from 'react';
import useRequest from './useRequest';
import {ServiceType} from './useTypes'

export default function useTeam() {

  useEffect(()=>{

  },[])

  const { data, loading, error, makeRequest } = useRequest();
  // Get all requests list
  const getTeamList = ()=>{
    makeRequest("get","Team")
  }
  // * title,description,tools
  const postService = (data:ServiceType) => {
    makeRequest("post","Services",data);
  }
  // * ID 
  const deleteService = (id:any) => {
    makeRequest("delete","Services",id);
  }
  const updateService = (data:ServiceType,id:any) => {
    makeRequest("update","Services",data,id);
  }
  return {data,loading,error,postService,deleteService,updateService}
}
