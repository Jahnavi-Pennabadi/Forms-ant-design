import { createSlice } from '@reduxjs/toolkit';

let formSlice = createSlice({
    name: 'form-slice',
    initialState: {
        disableAttributeArr: []
    },
    reducers: {
        getAttr: (state:any, action) => {
            if (!state.disableAttributeArr.includes(action.payload)) {
                state.disableAttributeArr.push(action.payload);
            }
        }
    }
});

export const { getAttr } = formSlice.actions;
export default formSlice.reducer;
