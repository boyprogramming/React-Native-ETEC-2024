import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, StyleSheet, Text, View, Image } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useEffect, useState } from "react";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { usePickImage } from "../../utils/pickImage";
import { useConfig } from "../../hooks/Config";




export default function Details() {
   const { id } = useLocalSearchParams();
   const { getPayment, setImagePayment } = usePaymentsDatabase();
   const [payment, setPayment] = useState(null);  // Inicializa como null
   const { pickImage } = usePickImage();

   const { directory } = useConfig();


   const fetchData = async () => {
       try {
           const fetchedPayment = await getPayment(id);
           setPayment(fetchedPayment); // Corrigido de 'data' para 'fetchedPayment'
       } catch (error) {
           Alert.alert("Erro ao buscar pagamento");
           console.log(error);
       }
   };


   useEffect(() => {
       fetchData();
   }, []);


   const handlePickImage = async () => {
       try {
           const image = await pickImage();
           if (!image) return; // Corrigido a verificação para `!image`
           setPayment({ ...payment, imagem: image });
           await setImagePayment(id, image);
       } catch (error) {
           console.log("handlePickImage", error);
           Alert.alert("Erro ao buscar imagem");
       }
    };


    const handleRemoveImage = async () => {
        try {
            setPayment({ ...payment, imagem: "" });
            await setImagePayment(id, "");
        } catch (error) {
            console.log("handleRemoveImage", error);
            Alert.alert("Erro ao remover imagem");
        }
    };
 
 
    if (!payment) {
        return <Text>Carregando...</Text>;  // Exibe "Carregando..." enquanto o pagamento não estiver disponível
    }
 
 
    return (
        <View style={styles.container}>
            <Text>Details - {id ? id : "Sem id"}</Text>
            <View>
                <Text style={styles.text}>Nome: {payment?.nome}</Text>
                <Text style={styles.text}>
                    Data do Pagamento: {formatDateToBrazilian(payment?.data_pagamento || new Date())}
                </Text>
 
                <Text style={styles.text}>Num Recibo: {payment?.numero_recibo}</Text>
               <Text style={styles.text}>
                   Valor Pago: {formatCurrencyBRL(payment?.valor_pago || 0)}
               </Text>
               <Text style={styles.text}>Observação: {payment?.observacao}</Text>
           </View>
           <View style={styles.contentImage}>
               {payment?.imagem ? (
                   <Image source={{ uri: `${directory}/${payment?.imagem}` }} style={{ width: 200, height: 200 }} />
               ) : (
                   <Text>Não há imagem cadastrada</Text>
               )}
           </View>
           <View style={styles.containerButtons}>
               <Button title="Editar" disabled />
               <Button title="IMAGEM" onPress={handlePickImage} />
               <Button title="REMOVER IMAGEM" onPress={handleRemoveImage} />
               <Button title="VOLTAR" onPress={() => router.push("list")} />
           </View>
       </View>

);
}


const styles = StyleSheet.create({
   container: {
       flex: 1,
       padding: 10,
   },
   containerButtons: {
       flexDirection: "row",
       justifyContent: "space-between",
   },
   contentImage: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
   },
   text: {
       fontFamily: "regular",
       fontSize: 18,
   },
});


