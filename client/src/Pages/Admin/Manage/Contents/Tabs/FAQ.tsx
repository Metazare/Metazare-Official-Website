import { useEffect } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import useFAQ from '../../../../../Hooks/Firebase/useFAQ';
import ItemFaq from '../../../../../Components/ItemFaq';
import AddFaq from './AddFaq';
import Loading from '../../../../../Components/Loading';

export default function FAQ() {
  const {data:faqs,ascendingOrder,loading:loadingFAQ,error:errorFAQ,getFAQ,postFAQ,updateFAQ,deleteFAQ} = useFAQ();

  useEffect(()=>{
    getFAQ()
  },[])

  if(loadingFAQ) return <Loading/>

  return<>
    <Box >
      <Typography variant="subtitle2" sx={{opacity:".9"}}  color="initial">Frequently Ask Questions</Typography>
      <Box display="flex" flexDirection={"column"} mt={2}>
        {ascendingOrder?.map((faq:any,index:any) => (
          <ItemFaq key={faq.id} index={index+1} data={faq} update={updateFAQ} id={faq.id} del={deleteFAQ}/>
        ))}
        <AddFaq submit={postFAQ} sequence={faqs === null? 1 : faqs.length + 1}/>
      </Box>
    </Box>
  </>
}
