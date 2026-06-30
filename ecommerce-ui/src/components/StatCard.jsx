import React from 'react'

export const StatCard = ({title,value,color}) => {
  return (
    <div className={`rounded-xl shadow-lg p-6 text-white ${color}`}>
        <h3 className='text-lg'>
            {title}
        </h3>
        <p className='text-4xl font-bold mt-3'>
            {value}
        </p>
    </div>
  )
}
