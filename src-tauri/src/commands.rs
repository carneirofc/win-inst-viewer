use std::collections::HashMap;

use winreg::enums::*;
use winreg::RegKey;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct RegistryEntry {
    path: String,
    values: HashMap<String, String>,
}

#[tauri::command]
pub fn command_list_uninstall_entries() ->String{
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    let unist_paths = [
        "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
        "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    ];

    let mut entries: Vec<RegistryEntry> = Vec::new();

    for uninst_p in unist_paths.iter() {
        let result = hklm.open_subkey_with_flags(uninst_p, KEY_READ);
        if result.is_err() {
            println!("Failed to open key {}", uninst_p);
            continue;
        }
        let actual_key = result.unwrap();

        for sub_path_result in actual_key.enum_keys() {
            if sub_path_result.is_err() {
                println!("Failed to enumerate subpath");
                continue;
            }
            let sub_path = sub_path_result.unwrap();
            let sub_key_response = actual_key.open_subkey_with_flags(sub_path.clone(), KEY_READ);
            if sub_key_response.is_err() {
                println!("Failed to open subkey at {}", sub_path);
                continue;
            }
            let sub_key = sub_key_response.unwrap();

            let full_reg_path = format!("{}\\{}", *uninst_p, sub_path.clone());
            let mut values = HashMap::new();
            for value_result in sub_key.enum_values() {
                if value_result.is_err() {
                    println!("Faile to enumerate value at {}\\{}", *uninst_p, sub_path);
                    continue;
                }
                let (key, value) = value_result.unwrap();
                values.insert(key, value.to_string());
            }
            entries.push(RegistryEntry {
                path: full_reg_path,
                values: values,
            });
        }
    }
    let entries_json = serde_json::to_string_pretty(&entries).unwrap();
    return entries_json;
}
