import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {

    const pastes = useSelector((state) => state.paste.pastes)

    const [searchTerms, setSearchTerms] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerms.toLowerCase()))

    function handleDelete(pastedId) {
        dispatch(removeFromPastes(pastedId));
    }



    return (
        <div>
            <input
                className='p-2 rounded-2xl mt-5 bg-orange-600  text-black'
                type="search"
                placeholder='search here'
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}

            />

            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='border'>
                                    <div> {paste.title}</div>
                                    <div> {paste.content}</div>

                                    <div className='flex flex-row gap-4 place-content-evenly'>
                                        <button className='bg-blue-500'>
                                            <a href={`/pasteId=${paste?._id}`}>Edit</a>
                                        </button>
                                        <button className='bg-blue-500'>
                                            <a href={`/pastes/${paste?._id}`}>View</a>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(paste?._id)}
                                            className='bg-blue-500'>
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(paste?.content)
                                                toast.success("Copied to clipboard")
                                            }}
                                            className='bg-blue-500'>
                                            Copy

                                        </button>

                                        <button className='bg-blue-500'>Share</button>




                                    </div>
                                    <div>{paste.createdAt}</div>

                                </div>

                            )
                        }
                    )
                }

            </div>

        </div>
    )
}

export default Pastes
