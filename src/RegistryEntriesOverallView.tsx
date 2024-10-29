import { useAtomValue } from "jotai";
import { entriesArrayAtom } from "./App";
import { RegistryEntryRow } from "./RegistryEntryRow";

export function RegistryEntriesOverallView() {
  const entries = useAtomValue(entriesArrayAtom);

  return (
    <div className="p-4 flex flex-col gap-y-1.5">
      {entries.map((entry) => {
        return <RegistryEntryRow key={entry.path} entry={entry} />;
      })}
    </div>
  );
}
