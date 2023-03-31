import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'post/fetchData',
    async () => {
        let localData = await JSON.parse(localStorage.getItem('post'));

        if (localData !== null) {
            return localData;
        } else {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            let getSomeData = [];
            for (let index = 0; index < 9; index++) {
                getSomeData.push(data[index])
            }
            return getSomeData;
        }
    }
);



const initialState = {
    loading: true,
    postData: [],
    message: '',
    error: false
};


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        init: (state) => {
            state.loading = true;
            state.message = "";
            state.error = false;
        },
        failed: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = true;
        },
        addPost: (state, action) => {
            state.loading = false;
            state.postData.push(action.payload)
            let items = JSON.parse(localStorage.getItem('post'));
            items.push(action.payload);

            localStorage.setItem('post', JSON.stringify(items))
        },

        updatePostItem: (state, action) => {
            state.postData = action.payload;
        },

        deletePost: (state, action) => {
            const filterItems = action.payload.data.postData.filter(item => item.id !== action.payload.id);
            state.postData = filterItems;
            localStorage.setItem('post', JSON.stringify(filterItems))
            // if (filterItems.length === 0) {
            //     localStorage.removeItem('post');
            // }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        }).addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.postData = action.payload;
            localStorage.setItem('post', JSON.stringify(action.payload))

        }).addCase(fetchData.rejected, (state) => {
            state.loading = false;
            state.message = "Failed data fetch...";
            state.error = true;
        });
    },
});

export const { failed, addPost, updatePostItem, deletePost } = postSlice.actions;
export default postSlice.reducer;
