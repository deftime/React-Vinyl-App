import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Vynil from "./Vinyl.tsx";
import { userEvent } from "@testing-library/user-event";

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

const plateData = {
  id: 23,
  artist: "Artist",
  title: "Title",
  genre: "Genre",
  styles: ["rock", "roll"],
  year: 1985,
  country: "USA",
  thumb_image: "/img/pic5.jpg",
  inColl: false,
  inFav: false,
};

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("Vinyl Component", () => {
  it("show plate data", () => {
    render(
      <Vynil
        plateData={plateData}
        onColBtnClick={vi.fn()}
        onFavBtnClick={vi.fn()}
        order={1}
      />
    );

    const imgTag = screen.getByAltText("album_cover");
    const info = screen.getByLabelText("plate-info");

    expect(imgTag.src).toBe("http://localhost:3000/img/pic5.jpg");
    expect(within(info).getByText("1985")).toHaveTextContent("1985");
    expect(within(info).getByText("Genre")).toHaveTextContent("Genre");
    expect(within(info).getByText("rock, roll")).toHaveTextContent(
      "rock, roll"
    );
    expect(within(info).getByText("USA")).toHaveTextContent("USA");
  });

  it("run callbacks by buttons", async () => {
    const handleCollection = vi.fn();
    const handleFavorites = vi.fn();

    render(
      <Vynil
        plateData={plateData}
        onColBtnClick={handleCollection}
        onFavBtnClick={handleFavorites}
        order={1}
      />
    );

    const buttons = screen.getAllByRole("button");

    await userEvent.click(buttons[1]);
    await userEvent.click(buttons[2]);

    expect(handleFavorites).toHaveBeenCalled();
    expect(handleCollection).toHaveBeenCalled();
  });
});
