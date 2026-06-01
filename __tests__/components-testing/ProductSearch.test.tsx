import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "@/lib/redux/searchSlice";
import { Provider } from "react-redux";
import { act, render, screen, waitFor } from "@testing-library/react";
import { ProductSearch } from "@/components/ProductSearch";
import userEvent from "@testing-library/user-event";

vi.mock("axios");
const mockAxios = vi.mocked(axios);

describe("ProductSearch Component Integration Tests", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchSlice,
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

      test("redner componenets",()=>{
    render(<ProductSearch/>,{
        wrapper:Wrapper
    });
    expect(screen.getByRole("heading",{
        name:"Search Products"
    })).toBeInTheDocument();
    });


  test("search item successfully with 500ms debounce", async () => {
    render(<ProductSearch />, {
      wrapper: Wrapper,
    });

    const mockProducts = [
      { id: 1, title: "M1 Macbook Air" },
      { id: 2, title: "iPhone 15 Pro" },
    ];
    
    mockAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const event = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const input = screen.getByPlaceholderText("Type to search...");

    await event.type(input, "iph");
    expect(input).toHaveValue("iph");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(screen.getByText(/Searching.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
  });


  test("search error handling shows alert message on API failure", async () => {
    render(<ProductSearch />, {
      wrapper: Wrapper,
    });

    mockAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const event = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const input = screen.getByPlaceholderText("Type to search...");

    await event.type(input, "iph");
    
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(screen.getByText(/Searching.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument();
    });

    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent("Failed to fetch products from server");
  });
});