import { useSQLiteContext } from "expo-sqlite"

export function useMaintenanceDatabase() {
    const database = useSQLiteContext()

    async function resetDatabase() {
        try {
            await database.withTransactionAsync(async () => {
                //DELETE -> apaga os dados da tabela/entidade
                //DROP -> apaga a tabela/entidade
                try {
                    database.execAsync(`DROP TRIGGER IF EXISTS idx_payments_data_pagamento;`)
                    database.execAsync(`DROP INDEX IF EXISTS idx_users_nome;`)
                    database.execAsync(`DROP TABLE IF EXISTS payments;`)
                    database.execAsync(`DROP TABLE IF EXISTS users;`)
                    database.execAsync(`
                    CREATE TABLE users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nome TEXT,
                        curso TEXT,
                        email TEXT NOT NULL UNIQUE,
                        data_pagamento DATE,
                        senha TEXT NOT NULL DEFAULT 'A123456a!',
                        role TEXT NOT NULL DEFAULT 'user',
                        created_at DATE DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATE
                    );
                `)
                await database.execAsync(`
                    CREATE TABLE payments (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        user_cadastro INTEGER NOT NULL,
                        valor_pago REAL NOT NULL,
                        data_pagamento DATE NOT NULL,
                        numero_recibo TEXT NOT NULL,
                        observacao TEXT,
                        imagem TEXT DEFAULT "",
                        created_at DATE DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATE,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (user_cadastro) REFERENCES users(id)
                    );
                `)
                    database.execAsync(`CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);`)
                    database.execAsync(`CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);`)
                    database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456a!', 'SUPER');`)
                    database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456a!', 'ADMIN');`)
                    database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456a!', 'USER');`)
                } catch (error) {
                    console.log("useMaintenanceDatabase resetDatabase error: ", error)
                }
            })
            console.log("useMaintenanceDatabase resetDatabase success ")
        } catch (error) {
            console.log("useMaintenanceDatabase resetDatabase error: ", error)
        }
    }

    async function importUsers() {
        const URL = "https://api.mockaroo.com/api/122ae070?count=40&key=1af2bf00"

        try {
            //recupera/solicita os dados da API/ da internet
            const response = await fetch(URL);
            //converte a resposta para o padrão json -> Javascript Object Notation
            //converte a resposta para o tipo texto;
            const users = await response.text();

            await database.withTransactionAsync(async () => {
                users.split(/\r?\n/).forEach(async (line) => {
                    try {
                        await database.execAsync(line);
                    } catch (error) {
                        console.error("Error importing user: ", error);
                    }
                })
            })
            console.log("Usuários importados com sucesso")
        } catch (error) {
            console.error("useMaintenanceDatabase importUsers error: ", error);
            throw error;
        }
    }

    async function importPayments() {
        // Implementar a função de importação de pagamentos
        const URL = "https://api.mockaroo.com/api/3c491290?count=100&key=1af2bf00"

        try {
            //recupera/solicita os dados da API/ da internet
            const response = await fetch(URL);
            //converte a resposta para o padrão json -> Javascript Object Notation
            //converte a resposta para o tipo texto;
            const users = await response.text();

            await database.withTransactionAsync(async () => {
                users.split(/\r?\n/).forEach(async (line) => {
                    try {
                        await database.execAsync(line);
                    } catch (error) {
                        console.error("Error importing user: ", error);
                    }
                })
            })
            console.log("Usuários importados com sucesso")
        } catch (error) {
            console.error("useMaintenanceDatabase importUsers error: ", error);
            throw error;
        }
    }


    return { resetDatabase, importUsers, importPayments }
}