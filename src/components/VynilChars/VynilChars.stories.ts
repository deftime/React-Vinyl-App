import type { Meta, StoryObj } from "@storybook/react";
import VynilChars from "./VynilChars.tsx";

const meta = {
  title: "Vinyl Short Characterstics",
  component: VynilChars,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof VynilChars>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    year: 1985,
    genre: "Rock",
    styles: ["Hard Rock", "Heavy Rock"],
    country: "USA",
  },
};
