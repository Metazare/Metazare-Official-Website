import React from 'react'
import {motion} from "framer-motion"
function SampleAnimation() {
  return (
    <motion.div
      style={{width:"40px",height:"40px",background:"black"}}
      initial={{
        rotate:"0deg"
      }}
      animate={{
        rotate:"170deg"
      }}
      transition={{
        duration:1
      }}
    >
      SampleAnimation
    </motion.div>
  )
}

export default SampleAnimation