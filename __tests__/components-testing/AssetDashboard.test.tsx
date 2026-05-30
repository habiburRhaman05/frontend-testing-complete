import { AssetDashboard } from "@/components/AssetDashboard";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";

describe("assest dashboard testing", () => {
    test("render assest dshboard with loading and render items", async () => {

        render(<AssetDashboard />);

        expect(screen.getByText(/Network Market Statistics/i)).toBeInTheDocument();
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
        })
    })
    test("render assest dshboard with error message", async () => {
        server.use(
            http.get("https://api.coingecko.com/api/v3/coins/markets", () => {
                return new HttpResponse(null, { status: 500 });
            })
        );
        render(<AssetDashboard />);
        expect(screen.queryByTestId("loading-spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
            expect(screen.getByTestId("error-message")).toBeInTheDocument();
        })
    });

    test("render assest dshboard with search correct resullt", async () => {

        render(<AssetDashboard />);

        const event = userEvent 
        const input = screen.getByPlaceholderText("Search assets...");

        await event.type(input,"bitc");

        expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();



    });

    test("render assest dshboard with not match search show", async () => {

        render(<AssetDashboard />);

        const event = userEvent 
        const input = screen.getByPlaceholderText("Search assets...");

        await event.type(input,"xyz");

        expect(screen.getByText(/No matching assets found./i)).toBeInTheDocument();
        



    });



})