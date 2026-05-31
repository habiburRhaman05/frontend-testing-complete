import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  list: string[];
}

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;