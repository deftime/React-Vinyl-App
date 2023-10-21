import { describe, expect, it, vi } from "vitest";
import useKeyPress from "../../hooks/useKeyPress.ts";
import { renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("useKeyPress Hook", () => {
  it("run when press required key", async () => {
    const runPlay = vi.fn();

    renderHook(() => useKeyPress("Space", runPlay));

    await userEvent.keyboard("[Space]");

    expect(runPlay).toBeCalled();
  });

  it("not run when press any key", async () => {
    const runPlay = vi.fn();

    renderHook(() => useKeyPress("Space", runPlay));

    await userEvent.keyboard("[Enter]");

    expect(runPlay).not.toBeCalled();
  });

  it("have a wrong arguments", () => {
    const runPlay = vi.fn();

    expect(() => useKeyPress(123, runPlay)).toThrow();
  });
});
