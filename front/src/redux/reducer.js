import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:{ loggin: false, user: {id: null }},
    userAppointments: [],
};

const userSlice = createSlice({
    name: "actualUser",   
    initialState,
    reducers:{
        setUserData: (state, action) => {
            state.user = action.payload; // recibe lo que llega del res
        
        },
        // logoutUser: (state) => {
        //     state.user={ loggin: false, user: {id: null }}
        // },
        setUserAppoinments: (state, action) => {
            state.userAppointments = action.payload;
        }
    },
});

export const {setUserData, setUserAppoinments, logoutUser } = userSlice.actions;
export default userSlice.reducer;
