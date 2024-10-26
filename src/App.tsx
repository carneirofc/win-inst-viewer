import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

type RegistryEntry = {
  path: string;
  values: { [key: string]: string };
};

const RegistryKeys = ["DisplayName", "Publisher", "DisplayVersion"];

function RegistryEntryRow({ entry }: { entry: RegistryEntry }) {
  return (
    <tr>
      <td>
        <button
          onClick={() => {
            alert("Details" + entry.path);
          }}
        >
          Details
        </button>
      </td>
      {/* <td>{entry.path}</td> */}
      {RegistryKeys.map((key) => {
        const v = entry.values[key];

        switch (key) {
          case "DisplayName":
            const link = `https://duckduckgo.com/?hps=1&q=${v}`;
            if (!v) {
              return <td></td>;
            }

            return (
              <th>
                <a href={link} target="_blank">
                  {v}
                </a>
              </th>
            );
          default:
            return <td key={key}>{v}</td>;
        }
      })}
    </tr>
  );
}

function RegistryEntriesOverallView({ entries }: { entries: RegistryEntry[] }) {
  const thStyle: React.CSSProperties = {
    maxWidth: "200px",
    minWidth: "120px",
    // backgroundColor: "tomato",
    width: "200px",
  };
  return (
    <div>
      <table style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th
              style={{
                minWidth: "120px",
                width: "120px",
                maxWidth: "120px",
                // backgroundColor: "tomato",
              }}
            />
            {RegistryKeys.map((key) => {
              return <th style={thStyle}>{key}</th>;
            })}
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>{entries.map((entry) => RegistryEntryRow({ entry }))}</tbody>
      </table>
    </div>
  );
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [registryEntries, setRegistryEntries] = useState<RegistryEntry[]>([]);
  useEffect(() => {
    listRegistryEntries();
  }, []);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  async function listRegistryEntries() {
    const data = await invoke<string>("command_list_uninstall_entries");
    try {
      const entries = JSON.parse(data) as RegistryEntry[];
      setRegistryEntries(entries);
    } catch (e) {
      console.error(`Failed to parse response from backend: ${e}`);
    }
  }

  return (
    <main className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <RegistryEntriesOverallView entries={registryEntries} />
    </main>
  );
}

export default App;
