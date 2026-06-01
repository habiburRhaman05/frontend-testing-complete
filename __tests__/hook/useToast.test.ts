// import { useToast } from "@/hooks/useToast";
// import { act, renderHook } from "@testing-library/react";
// import { beforeEach, describe, expect, test, vi } from "vitest";

// describe("testing use   Toast hook",()=>{
//     beforeEach(()=>{
//         vi.useFakeTimers()
//     })
//     test("render hook and check msg show",()=>{
//         const {result} = renderHook(()=> useToast());
       
//        act(()=>{
//          result.current.showToast("hello");
//        })
//         expect(result.current.message).toBe("hello");

//         act(()=>{
//             vi.advanceTimersByTime(3000);
//         })

//         expect(result.current.message).toBe(null)
    
//     })
// })
