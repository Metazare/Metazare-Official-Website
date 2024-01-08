import React, { useEffect } from 'react'
import useRequest from './userequest';

function useServices() {
  const { data, loading, error, makeRequest } = useRequest();
  
  // Get all requests list
  const getServicesList = ()=>{
    makeRequest("Services")
  }
  return {data,loading,error,getServicesList}
}

export default useServices