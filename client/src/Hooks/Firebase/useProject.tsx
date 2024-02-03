import { useEffect } from 'react'
import useRequest from './useRequest'
import {ProjectType} from "../Firebase/useTypes"


export default function useProject() {
  useEffect(()=>{
    getProjectList()
  },[])
  const { data, loading, error, makeRequest } = useRequest();
  // Get all requests list
  const getProjectList = ()=>{
    makeRequest("get","Projects")
  }
  // * title,description,tools
  const postProject = (data:ProjectType) => {
    makeRequest("post","Projects",data);
    getProjectList()
  }
  // * ID 
  const deleteProject = (id:any) => {
    makeRequest("delete","Projects",{},id);
    getProjectList()
  }
  const updateProject = (data:ProjectType,id:any) => {
    makeRequest("update","Projects",data,id);
    getProjectList()
  }

  return {data,loading,error,getProjectList,postProject,deleteProject,updateProject}
}
