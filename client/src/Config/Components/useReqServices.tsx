import React, { useEffect } from 'react'
import useGetRequest from './useGetRequest';
function useServices() {
  const { data, loading, error, makeRequest } = useGetRequest();
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