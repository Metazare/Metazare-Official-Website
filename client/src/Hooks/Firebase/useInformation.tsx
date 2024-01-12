import { useEffect } from 'react';
import useRequest from './useRequest';
import {InformationType} from './useTypes'
export default function useInformation() {
  const { data, loading, error, makeRequest } = useRequest();

  useEffect(()=>{
    getInformation()
    console.log(data)
  },[])
  
  // Get all requests list
  const getInformation = ()=>{
    makeRequest("get","Information")
  }
  const updateService = (data:InformationType,id:any) => {
    makeRequest("update","Information",data,id);
  }

  return {data,loading,error,updateService,getInformation}
}
