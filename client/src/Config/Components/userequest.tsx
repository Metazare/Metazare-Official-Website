import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { getDocs, collection} from 'firebase/firestore';

function useRequest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);


  const makeRequest = async (collectionID:string) => {
    setLoading(true);
    try {
      const data = await getDocs(collection(db, collectionID));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(filteredData);
      console.log(filteredData)
    } catch (err) {
      console.error(err);
      setError(err)
    }finally {
      setLoading(false);
    }
  };


  return {data,loading,error,makeRequest};
}

export default useRequest;
