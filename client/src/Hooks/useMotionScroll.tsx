import React, { useRef } from 'react'

import { useScroll, useTransform } from 'framer-motion'

function useMotionScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset:["0 1", "1.33 1"]
  })
  return ({
    ref,scrollYProgress
  })
}

export default useMotionScroll