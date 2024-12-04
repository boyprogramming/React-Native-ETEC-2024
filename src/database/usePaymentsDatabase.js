import { useSQLiteContext } from "expo-sqlite";

export function usePaymentsDatabase() {
    const database = useSQLiteContext();

    async function createPayment({user_id, user_cadastro, valor_pago, data_pagamento, observacao, numero_recibo}) {
        const statement = await database.prepareAsync(`
            INSERT INTO payments (user_id, user_cadastro, valor_pago, data_pagamento, observacao, numero_recibo)
            VALUES ($user_id, $user_cadastro, $valor_pago, $data_pagamento, $observacao, $numero_recibo);
            `);
        try {
            const result = await statement.executeAsync({$user_id: user_id, $user_cadastro: user_cadastro, $valor_pago: valor_pago, $data_pagamento: data_pagamento, $observacao: observacao, $numero_recibo: numero_recibo});
            const insertedID = result.lastInsertRowId.toString();
            return {insertedID};
        } catch (error) {
          console.log(error);
          throw error
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getPayments(page) {
    try {
        const payments = await database.getAllAsync(`SELECT p.*, u.nome FROM payments p, users u WHERE u.id = p.user_id ORDER BY data_pagamento DESC LIMIT 5 OFFSET ${page * 5}`);
        return payments;
    } catch (error) {
        console.log(error);
        throw error;
        }
    }

    async function getPayment(id) {
        try {
            const payment = await database.getFirstAsync(`SELECT p.*, u.nome FROM payments p, users u WHERE u.id = p.user_id AND p.id = ${id}`);
            return payment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function setImagePayment(id, filename) {
    const updated_at = new Date().toLocaleString("pt-BR").replace("T", " ").split(".")[0];
    const statement = await database.prepareAsync(`
        UPDATE payments SET imagem = $filename, updated_at = $updated_at WHERE id = $id;
        `);

        try {
            const result = await statement.executeAsync({
                $filename: filename,
                $updated_at: updated_at,
                $id: id
            });
            return result.changes;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { createPayment, getPayments, getPayment, setImagePayment };
}
