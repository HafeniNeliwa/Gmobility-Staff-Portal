import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null
}

export const createData = createAsyncThunk(
    "data/createData",
    async ({firstname, surname, id_Number, DOB,Gender, nationality, Supervisor,  homeLanguage, otherLanguages, position, password})=>{
        const response = await axios.post("http://localhost:8080/api/data", {
            firstname, 
            surname, 
            id_Number, 
            DOB, 
            Gender,
            nationality, 
            Supervisor,
            homeLanguage, 
            otherLanguages, 
            position, 
            password
        });
        return response.data;
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createData.pending, (state) => {
                state.status = "loading";
            })

            .addCase(createData.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = "succeed";
                state.data.push(action.payload);
            })

            .addCase(createData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default dataSlice.reducer;