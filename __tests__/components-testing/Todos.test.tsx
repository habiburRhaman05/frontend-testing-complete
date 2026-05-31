import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { beforeAll, describe, expect, test } from "vitest";
import todoSlice from "@/lib/redux/todoSlice";
import { TodoApp } from "@/components/Todos";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("testing todo components", () => {
  let store: any;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        todo: todoSlice,
      },
    });
  });

  const Wrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  test("renders heading", () => {
    render(<TodoApp />, {
      wrapper: Wrapper,
    });

    expect(
      screen.getByRole("heading", {
        name: "Todo Manager",
      })
    ).toBeInTheDocument();


  });

   test("add todo", async() => {
    render(<TodoApp />, {
      wrapper: Wrapper,
    });


    const event = userEvent;
    const input = screen.getByPlaceholderText("Enter a new todo");
    const button = screen.getByRole("button",{
        name:"Add"
    });

    await event.type(input,"god can do everythink");
    await event.click(button);

    expect(screen.getByText("god can do everythink")).toBeInTheDocument()

expect(store.getState().todo.list).toEqual(["god can do everythink"]);


  });
});