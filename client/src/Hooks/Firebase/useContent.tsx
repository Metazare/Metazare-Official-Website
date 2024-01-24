import { useEffect } from 'react';
import useRequest from './useRequest';
import {BasicInformation} from './useTypes'
function useContent() {
  const { data, loading, error, makeRequest } = useRequest();
  useEffect(()=>{
    getBasicInformation()
  },[])
   // Get all requests list
  const getBasicInformation = ()=>{
    makeRequest("get","Information")
  }
  const updateBasicInformation = (data:BasicInformation,id:any) => {
    makeRequest("update","Information",data,id)
  }
  return {data, loading, error, getBasicInformation,updateBasicInformation}
}

export default useContent