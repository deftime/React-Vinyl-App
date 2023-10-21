import type { Meta, StoryObj } from "@storybook/react";
import Filters from "./Filters.tsx";

const meta = {
  title: "Filters",
  component: Filters,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Filters>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};
