import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { atom, useAtom } from "jotai";

import "./index.css";

import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { RegistryEntriesOverallView } from "./RegistryEntriesOverallView";

export type RegistryEntry = {
  path: string;
  values: { [key: string]: string };
};

export const entriesArrayAtom = atom<RegistryEntry[]>([]);

function App() {
  const [entries, setRegistryEntries] = useAtom(entriesArrayAtom);

  useEffect(() => {
    listRegistryEntries();
  }, []);

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
    <Layout>
      <Header onReload={listRegistryEntries} />
      <Main>
        {entries.length === 0 ? (
          <p>Loading registry entries from Windows...</p>
        ) : (
          <RegistryEntriesOverallView />
        )}
      </Main>
    </Layout>
  );
}

export default App;
