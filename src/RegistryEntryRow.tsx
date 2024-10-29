import { AccessibilityIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { RegistryEntry } from "./App";
import { searchAtom } from "./components/Header";
import { classesAtom, tailwindThemeAtom } from "./atoms";
import { useState } from "react";

export function RegistryEntryRow({ entry }: { entry: RegistryEntry }) {
  const search = useAtomValue(searchAtom);
  const classes = useAtomValue(classesAtom);
  const theme = useAtomValue(tailwindThemeAtom);
  const [details, setDetails] = useState(false);

  function classForTheme() {
    switch (theme) {
      case "gray":
        return "rounded-sm  flex flex-row align-middle pt-3 pb-3 bg-gray-400 dark:bg-gray-800   text-gray";
      case "stone":
        return "rounded-sm  flex flex-row align-middle pt-3 pb-3 bg-stone-400 dark:bg-stone-800   text-stone-300";
      case "zinc":
      default:
        return "rounded-sm  flex flex-row align-middle pt-3 pb-3 bg-zinc-400 dark:bg-zinc-800   text-zinc-300";
    }
  }

  const isVisible = Object.values(entry.values).some((v) =>
    v.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className={(isVisible ? "" : "hidden ") + "flex flex-col"}>
      <div className={classForTheme()}>
        <div className="p-4">
          <AccessibilityIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-base">{entry.values["DisplayName"]}</span>
          <div className="text-sm">
            <span>{entry.values["Publisher"]}</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{entry.values["DisplayVersion"]}</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col ml-4 mr-4">
          <span className="text-sm">{entry.path}</span>
          <span className="text-sm">
            {entry.values["InstallLocation"] ?? ""}
          </span>
        </div>
        <button
          className={classes.button + " " + "mr-4"}
          onClick={() => setDetails(!details)}
        >
          <DotsHorizontalIcon />
        </button>
      </div>
      {details && (
        <div>
          {Object.entries(entry.values).map(([key, value]) => (
            <div key={key} className="flex flex-row">
              <span className="font-bold">{key}</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
