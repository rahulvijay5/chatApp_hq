import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
        aimessages:null,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        setAiMessages:(state,action)=>{
            state.aimessages = action.payload;
        }
    }
});
export const {setMessages, setAiMessages} = messageSlice.actions;
export default messageSlice.reducer;