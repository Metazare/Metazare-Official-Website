import React, { useEffect } from 'react'
import useRequest from './useRequest';
import { EmailUsType } from './useTypes';
export default function useEmailUs() {
  const { data, loading, error, makeRequest } = useRequest();
  useEffect(()=>{
    getEmailList()
  },[])

  const getEmailList = ()=>{
    makeRequest("get","EmailUs")
  }
  // * title,description,tools
  const postEmail = (data:EmailUsType) => {
    makeRequest("post","EmailUs",data);
    getEmailList()
  }
  // * ID 
  const deleteEmail = (id:any) => {
    makeRequest("delete","EmailUs",{},id);
    getEmailList()
  }

  return {data,loading,error,getEmailList,postEmail,deleteEmail}
}
