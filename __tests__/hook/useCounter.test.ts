// import { useCounter } from "@/hooks/useCounter";
// import { act, renderHook } from "@testing-library/react";
// import { describe, expect, test } from "vitest";

// describe("useCounter hook",()=>{

//     test("render hook and check init value",()=>{
//         const {result} = renderHook(()=> useCounter());
//         expect(result.current.count).toBe(0);
//     })
//     test("increment test",()=>{
//         const {result} = renderHook(()=> useCounter());
//         act(()=>{
//             result.current.increment()
//         })
//         expect(result.current.count).toBe(1);
//     })
//     test("decrement test",()=>{
//         const {result} = renderHook(()=> useCounter(1));
//         act(()=>{
//             result.current.decrement()
//         })
//         expect(result.current.count).toBe(0);
//     })

// })