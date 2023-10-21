import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header.tsx";

const meta = {
  title: "Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    collection: 0,
    favorites: 0,
  },
};

export const WithCounts: Story = {
  args: {
    collection: 3,
    favorites: 5,
  },
};
