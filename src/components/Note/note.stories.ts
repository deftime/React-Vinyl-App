import type { Meta, StoryObj } from "@storybook/react";
import Note from "./Note.tsx";

const meta = {
  title: "Vinyl Note",
  component: Note,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Note>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    text: "Cool vinyl",
  },
};
