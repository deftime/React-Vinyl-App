import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination.tsx";

const meta = {
  title: "Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    countItems: 10,
    itemsPerPage: 4,
  },
};

export const LessThenPage: Story = {
  args: {
    countItems: 3,
    itemsPerPage: 4,
  },
};

export const ManyItems: Story = {
  args: {
    countItems: 50,
    itemsPerPage: 7,
  },
};
