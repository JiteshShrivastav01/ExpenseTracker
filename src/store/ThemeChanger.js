import { createSlice } from "@reduxjs/toolkit";

const lightTheme = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
};
  
const darkTheme = {
    backgroundColor: '#1c1c1c',
    textColor: '#ffffff',
};
  

const initialTheme={theme : lightTheme}

const Theme = createSlice({
    name : 'theme',
    initialState : initialTheme ,
    reducers : {
        changeTheme(state){
            state.theme = state.theme === darkTheme ? lightTheme : darkTheme;
        }
    }
})

export const themeAction = Theme.actions
export default Theme.reducer
