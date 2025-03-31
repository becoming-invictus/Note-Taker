import React from 'react'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const ViewPaste = () => {
    const {id}=useParams();
    const allPastes=useSelector((state)=>state.paste.pastes);
    const paste =allPastes.filter((p)=>p._id===id)[0];

  return (
    <div>
            <div className='flex flex-row gap-7'>
                <input
                    className='pl-2 bg-cyan-500  rounded-lg text-black'
                    type="text"
                    placeholder='Enter titile here'
                    value={paste.title}
                    disabled
                    onChange={(e) => setTitle(e.target.value)}
                />

               
            </div>
            <div className='mt-6'>
                <textarea
                    className='bg-orange-600 rounded-lg text-black mt-4 mni-w-10 p-5'
                    value={paste.content}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    disabled
                    rows={20}
                />
            </div>
        </div>
  )
}

export default ViewPaste
