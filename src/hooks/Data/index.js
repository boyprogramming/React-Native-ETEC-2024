import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../../database/initializeDatabase";

export function DataProvider({ children }) {
    return (
        <SQLiteProvider databaseName="data.db" onInit={initializeDatabase}>
            {children}
        </SQLiteProvider>

    );
}

