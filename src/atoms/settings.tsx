import { atom } from "jotai";

export const showAdvancedAtom = atom(false);
export const tailwindThemeAtom = atom<"stone" | "gray" | "zinc">("zinc");

const comboBoxThemeAtom = atom((get) => {
  const theme = get(tailwindThemeAtom);
  switch (theme) {
    case "stone":
      return "border dark:border-stone-700 p-1 rounded-md bg-stone-400 dark:bg-stone-800 text-black dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:bg-stone-700";
    case "gray":
      return "border dark:border-gray-700 p-1 rounded-md bg-gray-400 dark:bg-gray-800 text-black dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700";
    case "zinc":
    default:
      return "border dark:border-zinc-700 p-1 rounded-md bg-zinc-400 dark:bg-zinc-800 text-black dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700";
  }
});

const inputThemeAtom = atom((get) => {
  const theme = get(tailwindThemeAtom);
  switch (theme) {
    case "stone":
      return "border dark:border-stone-700 p-1 rounded-md bg-stone-400 dark:bg-stone-800 text-black dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:bg-stone-700";
    case "gray":
      return "border dark:border-gray-700 p-1 rounded-md bg-gray-400 dark:bg-gray-800 text-black dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700";
    case "zinc":
    default:
      return "border dark:border-zinc-700 p-1 rounded-md bg-zinc-400 dark:bg-zinc-800 text-black dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700";
  }
});

const headerThemeAtom = atom((get) => {
  const theme = get(tailwindThemeAtom);
  switch (theme) {
    case "stone":
      return "sticky top-0 w-full z-40 flex-none backdrop-blur transition-colors duration-500 dark:border-b-2 dark:border-stone-900/10";
    case "gray":
      return "sticky top-0 w-full z-40 flex-none backdrop-blur transition-colors duration-500 dark:border-b-2 dark:border-gray-900/10";
    case "zinc":
    default:
      return "sticky top-0 w-full z-40 flex-none backdrop-blur transition-colors duration-500 dark:border-b-2 dark:border-zinc-900/10";
  }
});

const buttonThemeAtom = atom((get) => {
  const theme = get(tailwindThemeAtom);
  switch (theme) {
    case "stone":
      return "border rounded-md py-2 px-4 dark:border-stone-700 bg-stone-400 dark:bg-stone-800 hover:bg-stone-700  active:bg-stone-600 text-stone-400 hover:text-stone-200";
    case "gray":
      return "border rounded-md py-2 px-4 dark:border-gray-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-700  active:bg-gray-600 text-gray-400 hover:text-gray-200";
    case "zinc":
    default:
      return "border rounded-md py-2 px-4 dark:border-zinc-700 bg-zinc-400 dark:bg-zinc-800 hover:bg-zinc-700  active:bg-zinc-600 text-zinc-400 hover:text-zinc-200";
  }
});

const layoutClassAtom = atom((get) => {
  const theme = get(tailwindThemeAtom);
  switch (theme) {
    case "stone":
      return "antialiased min-h-screen dark:text-stone-400 dark:bg-stone-900";
    case "gray":
      return "antialiased min-h-screen dark:text-gray-400 dark:bg-gray-900";
    case "zinc":
    default:
      return "antialiased min-h-screen dark:text-zinc-400 dark:bg-zinc-900";
  }
});

export const classesAtom = atom((get) => {
  return {
    input: get(inputThemeAtom),
    comboBox: get(comboBoxThemeAtom),
    header: get(headerThemeAtom),
    button: get(buttonThemeAtom),
    layout: get(layoutClassAtom),
  };
});

export const settingsAtom = atom((get) => {
  return {
    classes: get(classesAtom),
    showAdvanced: get(showAdvancedAtom),
  };
});
