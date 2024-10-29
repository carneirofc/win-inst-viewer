import { atom, useAtom, useAtomValue } from "jotai";
import { tailwindThemeAtom, classesAtom } from "../atoms/settings";
import { ReloadIcon } from "@radix-ui/react-icons";

const themeOptions: ("stone" | "gray" | "zinc")[] = ["stone", "gray", "zinc"];
export const searchAtom = atom("");

export function Combobox<T>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: T[];
}) {
  const classes = useAtomValue(classesAtom);
  return (
    <select
      value={value as string}
      onChange={(e) => onChange(e.target.value as T)}
      className={classes.comboBox}
    >
      {options.map((theme) => (
        <option key={theme as string} value={theme as string} className="">
          {theme as string}
        </option>
      ))}
    </select>
  );
}

export function Header({ onReload }: { onReload: () => void }) {
  const [search, setSearch] = useAtom(searchAtom);
  const [theme, setTheme] = useAtom(tailwindThemeAtom);
  const classes = useAtomValue(classesAtom);

  return (
    <header className={classes.header}>
      <div>
        <div className="p-4">
          <h1 className="text-xl font-semibold">WinReg Installed Programs</h1>
        </div>
        <div className="flex items-center p-1 space-x-2">
          <div className="flex items-center space-x-2">
            <form
              className="space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit", search);
              }}
            >
              <button
                id="reload-button"
                className={classes.button}
                onClick={onReload}
              >
                <ReloadIcon />
              </button>

              <input
                id="search-input"
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Search..."
                className={classes.input}
              />
            </form>
          </div>
          <span>Theme </span>
          <Combobox
            value={theme}
            onChange={(v) => setTheme(v)}
            options={themeOptions}
          />
        </div>
      </div>
    </header>
  );
}
