import { createSlice } from '@reduxjs/toolkit'


import toast from 'react-hot-toast';



const initialState = {
    pastes: (() => {
        try {
            const storedPastes = localStorage.getItem("pastes");
            return storedPastes ? JSON.parse(storedPastes) : [];
        } catch (error) {
            console.error("Error parsing pastes from localStorage:", error);
            return [];
        }
    })(),
};

export const pasteSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;



            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast("paste created successfully");

        },
        updateToPastes: (state, action) => {
            const paste=action.payload;
            const index=state.pastes.findIndex((item)=>
            item._id===paste._id);

            if(index>=0){
                state.pastes[index]=paste;
                localStorage.setItem("pastes",JSON.stringify(state.pstes));

                toast.success("Paste updated")
            }



        },
        resetAllPastes: (state, action) => {
            state.pastes=[];
            localStorage.removeItem("pastes")

        },
        removeFromPastes: (state, action) => {
            const pasteId=action.payload;

            console.log(pasteId);
            const index=state.pastes.findIndex((item)=>item._id=pasteId);

            if(index >=0){
                state.pastes.splice(index,1);
                localStorage.setItem("pastes",JSON.stringify(state.pastes));

                toast.success("Paste deleted");
            }


        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer 