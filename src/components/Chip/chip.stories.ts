import type { Meta, StoryObj } from "@storybook/react";
import Chip from "./Chip.tsx";

const meta = {
  title: "Chip mark",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    name: "Chip",
  },
};
