import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { getOverallReports } from "./report.thunk";

interface reportPayload{
    data:any[],
    hasNext:boolean,
    hasPrevious:boolean,
    totalRecordCount:number
}

interface reportState{
    reportloading:boolean,
    error:string|null
    data:any[],
    hasNext:boolean,
    hasPrevious:boolean,
    totalRecordCount:number
}

const initialState:reportState={
    reportloading:false,
    error:null,
    data:[],
    hasNext:true,
    hasPrevious:false,
    totalRecordCount:0

}
 const reportSlice=createSlice({
    name:'report',
    initialState,
    reducers:{},
    extraReducers:(builder)=>
        builder
    .addCase(getOverallReports.pending,(state)=>{
        state.reportloading=true,
        state.error=null;
    })
    .addCase(getOverallReports.fulfilled,(state,action:PayloadAction<reportPayload>)=>{
        state.reportloading=false,
        state.data=action.payload.data;
        state.hasNext=action.payload.hasNext;
        state.hasPrevious=action.payload.hasPrevious;
        state.totalRecordCount=action.payload.totalRecordCount;
    })
    .addCase(getOverallReports.rejected,(state,action)=>{
        state.reportloading=false,
        state.data=[];
        state.error=action.payload as any||action.error.message
    })
 })

 export default reportSlice.reducer;