import React, { useEffect } from 'react'
import useRequest from './useRequest';
function useServices() {
  const { data, loading, error, makeRequest } = useRequest();
  // Get all requests list
  const getServicesList = ()=>{
    makeRequest("get","Services")
  }
  const postService = (data:object) => {
    makeRequest("post","Services",data);
    getServicesList()
  }
  return {data,loading,error,getServicesList,postService}
}

export default useServices