import type { Meta, StoryObj } from "@storybook/react";
import Vinyl from "./Vinyl.tsx";

const meta = {
  title: "Vinyl",
  component: Vinyl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Vinyl>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    plateData: {
      id: 1,
      artist: "{Artist}",
      title: "{Title}",
      genre: "{Genre}",
      styles: ["Style1", "Style2"],
      year: 0o0,
      country: "{Country}",
      thumb_image: "/img/beatles.jpg",
      inColl: false,
      inFav: false,
    },
    statusSearch: "ok",
  },
};

export const GetSomeData: Story = {
  args: {
    plateData: {
      id: 9,
      artist: "Manowar",
      title: "Kings Of Metal",
      genre: "Metal",
      styles: ["Hard Rock", "Heavy Rock"],
      year: 1988,
      country: "USA",
      thumb_image: "/img/manowar.jpg",
      inColl: false,
      inFav: false,
    },
    statusSearch: "ok",
  },
};

export const SearchInProgress: Story = {
  args: {
    plateData: {
      id: 9,
      artist: "Manowar",
      title: "Kings Of Metal",
      genre: "Metal",
      styles: ["Hard Rock", "Heavy Rock"],
      year: 1988,
      country: "USA",
      thumb_image: "/img/manowar.jpg",
      inColl: false,
      inFav: false,
    },
    statusSearch: "load",
  },
};

export const InCollection: Story = {
  args: {
    plateData: {
      id: 9,
      artist: "Manowar",
      title: "Kings Of Metal",
      genre: "Metal",
      styles: ["Hard Rock", "Heavy Rock"],
      year: 1988,
      country: "USA",
      thumb_image: "/img/manowar.jpg",
      inColl: true,
      inFav: false,
    },
    statusSearch: "ok",
  },
};

export const InFavorites: Story = {
  args: {
    plateData: {
      id: 9,
      artist: "Manowar",
      title: "Kings Of Metal",
      genre: "Metal",
      styles: ["Hard Rock", "Heavy Rock"],
      year: 1988,
      country: "USA",
      thumb_image: "/img/manowar.jpg",
      inColl: false,
      inFav: true,
    },
    statusSearch: "ok",
  },
};
