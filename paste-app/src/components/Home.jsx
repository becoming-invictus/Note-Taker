import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pastedId = searchParams.get('pasteId');
    const dispatch=useDispatch();

    const allPastes=useSelector((state)=>{
        state.paste.pastes
    })

    useEffect(()=>{
        if(pastedId){
            const paste=allPastes.find((p)=>p._id===pastedId)
            setTitle(paste.title);
            setValue(paste.content);
    
            
        }
    
    },[pastedId]);

    function createPaste() {
        const paste ={
            title:title,
            content:value,
            _id:pastedId || Date.now().toString(36),
            createdAt:new Date().toISOString(),

        }


        if(pastedId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste))
        }

        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div>
            <div className='flex flex-row gap-7'>
                <input
                    className='pl-2 bg-cyan-500  rounded-lg text-black'
                    type="text"
                    placeholder='Enter titile here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createPaste}
                    className='bg-pink-500 rounded-lg p-2 '>
                    {
                        pastedId ? 'Update My Paste' : "Create My Paste"
                    }
                </button>
            </div>
            <div className='mt-6'>
                <textarea
                    className='bg-orange-600 rounded-lg text-black mt-4 mni-w-10 p-5'
                    value={value}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home
