import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { getDocs,addDoc, collection} from 'firebase/firestore';

function useRequest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const makeRequest = async (action:"post"|"get",collectionID:string,data?:{}) => {
    setLoading(true);
    try {
      if (action === "get") {
        const response = await getDocs(collection(db, collectionID));
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(filteredData);
        console.log(filteredData);
      } else {
        await addDoc(collection(db, collectionID), data);
      }
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
