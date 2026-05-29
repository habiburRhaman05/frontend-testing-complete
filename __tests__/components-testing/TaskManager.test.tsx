import Home from "@/app/page";
import { TaskManager } from "@/components/TaskManager";
import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";
import { describe, expect, test, vi } from "vitest";

describe("task manager testing",()=>{

    test("rendering home page with task count",()=>{
        render(<Home/>);
        expect(screen.getByText(/total task:1/i)).toBeInTheDocument();
    })
    test("rendering task manager",()=>{
const mockFn = vi.fn<(count: number) => void>();
        render(
                <TaskManager
        initialTasks={[
          {
            id: "qyiqw18962312",
            title: "new title",
            completed: false
          }
        ]}
        onTaskCountChange={mockFn}
      />
        )
        expect(screen.getByText(/task manager/i)).toBeInTheDocument();
    });

      test("add todo successfuly",async()=>{
const mockFn = vi.fn<(count: number) => void>();
        render(
                <TaskManager
        initialTasks={[
          {
            id: "qyiqw18962312",
            title: "new title",
            completed: false
          }
        ]}
        onTaskCountChange={mockFn}
      />
        );
        const event = userEvent;
        const input = screen.getByRole("textbox");
        const button = screen.getByLabelText("add-todo-button");
        await event.type(input,"my todo");
        await event.click(button);
        const todoList = screen.getByLabelText("todo-list");
        expect(screen.getByText(/my todo/i)).toBeInTheDocument();
        expect(todoList.children).toHaveLength(2);
        expect( screen.getAllByRole("checkbox").at(-1)).not.toBeChecked();

    });

  /*  input box check
    callback value update check 
    error handling and validation 
    */
    

})