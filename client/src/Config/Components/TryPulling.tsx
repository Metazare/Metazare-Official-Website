import React, { useEffect } from 'react'
import useServices from './useServices'
function TryPulling() {
  const {data,getServicesList} = useServices();
  useEffect(()=>{
    getServicesList();
  },[])
  return (
    <div>
      {/* {((data as any[]) || []).map((service: any) => (
        <div key={service.id}>
          <h1>{service.title}</h1>
        </div>
      ))} */}
    </div>
  )
}

export default TryPulling