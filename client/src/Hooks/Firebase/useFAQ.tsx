import { useEffect, useState } from 'react';
import useRequest from './useRequest';
import {FAQType} from './useTypes'

function useFAQ() {
  const { data, loading, error, makeRequest } = useRequest();

  const [ascendingOrder, setAscendingOrder] = useState([]);
  useEffect(()=>{
    getFAQ()
  },[])
  useEffect(()=>{
    if(data){
      setAscendingOrder(data?.slice().sort((a:any, b:any) => a.sequence - b.sequence))
    }
  },[data])

  // Get all requests list
  const getFAQ = ()=>{
    makeRequest("get","FAQ")
  }
  // * title,description,tools
  const postFAQ = (data:FAQType) => {
    makeRequest("post","FAQ",data);
    getFAQ()
  }
  // * ID 
  const deleteFAQ = (id:string) => {
    makeRequest("delete","FAQ",{},id);
    getFAQ()
  }
  const updateFAQ = (data:FAQType,id:any) => {
    makeRequest("update","FAQ",data,id);
    getFAQ()
  }

  return {data,ascendingOrder,loading,error,getFAQ,postFAQ,deleteFAQ,updateFAQ}
}

export default useFAQ