import { useState} from 'react';
import { db } from '../../Config/Firebase';
import { getDocs,addDoc,updateDoc,deleteDoc, collection,doc} from 'firebase/firestore';

function useRequest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const makeRequest = async (action:"post"|"get"|"delete"|"update",collectionID:string,data?:{},id?:any) => {
    setLoading(true);
    try {
      switch (action) {
        case "get":
          const response = await getDocs(collection(db, collectionID));
          const filteredData = response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(filteredData);
          console.log(filteredData);
          break;
        case "post":
          await addDoc(collection(db, collectionID), data);
          break;
        case "delete":
          await deleteDoc(doc(db,collectionID,id));
          break;
        case "update":
          if(data) await updateDoc(doc(db,collectionID,id), data);
          break;
        default:
          break;
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
