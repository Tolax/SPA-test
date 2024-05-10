import React from 'react'

export default function APIservice() {
    const getAllRecieps = async ()=>{
        const result = await fetch('https://dummyjson.com/recipes')
                        .then(res => res.json())
    return result
    }
  return {getAllRecieps}
}
