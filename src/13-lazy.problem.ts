// CODE

import { expect, it } from "vitest";
import { z } from "zod";

type MenuItemType = {
  link: string;
  label: string;
  children: Array<MenuItemType>
}

const MenuItem: z.ZodType<MenuItemType> = z.lazy(() => z.object({
  //             ^ 🕵️‍♂️
  link: z.string(),
  label: z.string(),
  children: z.array(MenuItem),
}));

// TESTS

it("Should succeed when it encounters a correct structure", async () => {
  const menuItem = {
    link: "/",
    label: "Home",
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(MenuItem.parse(menuItem)).toEqual(menuItem);
});

it("Should error when it encounters an incorrect structure", async () => {
  const menuItem = {
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(() => MenuItem.parse(menuItem)).toThrowError();
});
