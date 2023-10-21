import type { Meta, StoryObj } from "@storybook/react";
import VinylButton from "./VynilButton.tsx";

const meta = {
  title: "Vinyl Main Button",
  component: VinylButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof VinylButton>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    inColl: false,
    plateId: 0,
  },
};

export const InCollection: Story = {
  args: {
    inColl: true,
    plateId: 1,
  },
};
