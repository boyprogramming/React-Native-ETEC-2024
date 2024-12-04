
import { router } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useMaintenanceDatabase } from "../database/useMaintenanceDatabase";

export default function Maintenance() {
    const { resetDatabase, importUsers, importPayments } = useMaintenanceDatabase();

    const handleReset = async () => {
        // reset database
        try {
            // fazer a chamada da função
            await resetDatabase();
            Alert.alert("Payments", "Banco de dados resetado com sucesso!");
        } catch (error) {
            Alert.alert("Payments", "Erro ao resetar o banco de dados: " + error.message);
        }
    }

    return <View style={styles.container}>
        <Text style={styles.windowTitle}>Manutenção do Banco</Text>
        <View style={styles.contentButtons}>
            <Button title="zerar" onPress={handleReset} />
            <Button title="importar usuários" onPress={() => importUsers()} />
            <Button title="importar pagamentos" onPress={() => importPayments()} />
            <Button title="voltar" onPress={() => router.back()} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    windowTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    contentButtons: {
        marginVertical: 20,
        gap: 10
    }
});