import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer.tsx";

const meta = {
  title: "Footer",
  component: Footer,
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    text: "(c)Copyrights",
  },
};

export const Empty: Story = {
  args: {
    text: "",
  },
};
