// import { beforeAll, describe, expect, test } from "vitest";
// import todoSlice, { addTodo } from "@/lib/redux/todoSlice"
// describe("testign todo rducer",()=>{

//     test("render with default value",()=>{
//           const {list} = todoSlice(undefined,{type:""});
//           expect(list.length).toBe(0);
//     })
//     test("add todo",()=>{
//           const initialState = {
//             list:[]
//           };
//           const newState = todoSlice(initialState,addTodo("new todo"));
//           expect(newState).toEqual({
//             list:["new todo"]
//           })
//     })

// })