import type { Meta, StoryObj } from "@storybook/react";
import VinylDetails from "./VynilDetails.tsx";

const meta = {
  title: "Vinyl Plate Open Info",
  component: VinylDetails,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof VinylDetails>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    plateId: 34,
  },
};
