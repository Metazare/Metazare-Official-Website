import useRequest from './useRequest';
import {ServiceType} from './useTypes'

function useServices() {
  const { data, loading, error, makeRequest } = useRequest();
  // Get all requests list
  const getServicesList = ()=>{
    makeRequest("get","Services")
  }
  // * title,description,tools
  const postService = (data:ServiceType) => {
    makeRequest("post","Services",data);
    getServicesList()
  }
  // * ID 
  const deleteService = (id:any) => {
    makeRequest("delete","Services",id);
    getServicesList()
  }
  const updateService = (data:ServiceType,id:any) => {
    makeRequest("update","Services",id);
    getServicesList()
  }

  return {data,loading,error,getServicesList,postService,deleteService,updateService}
}

export default useServices