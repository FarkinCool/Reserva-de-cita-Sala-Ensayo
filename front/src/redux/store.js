import {configureStore} from "@reduxjs/toolkit";

import userSlice from "./reducer";  //traemos al slice crado

const store = configureStore({
    reducer: {
        actualUser: userSlice,
    },

});

export default store;