import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { router } from "expo-router";

export default function List() {
  const { getPayments } = usePaymentsDatabase()
  const [page, setPage] = useState(0) //controlar qual página do sistema já carregou
  const [loading, setLoading] = useState(true) //controlar se está carregando os dados do banco
  const [hasMore, setHasMore] = useState(true) //controlar se tem mais dados para carregar
  const [data, setData] = useState([])

  async function fetchData() {

    if (hasMore === false) return; //Se esta flag for falsa, não tem mais dados para carregar

    setPage(page + 1)
    // Vai buscar no banco de dados os pagamentos
    const payments = await getPayments(page);

    if (payments.length < 5) setHasMore(false) //Se retornar menos de 5 registros, não tem mais dados para carregar
    setData([...data, ...payments])
    setLoading(false)
  }

  useEffect(() => {
    // Executa a primeira vez a busca de dados
    setPage(0)
    fetchData()
  }, []);

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => router.push({
      pathname: "details",
      params: { id: item.id }
    })}>
      <View style={styles.contentItem}>
        <Text style={styles.name}>{item.nome}</Text>
        <View style={styles.contentDate}>
          <Text style={{ fontFamily: "regular" }}>{formatDateToBrazilian(item.data_pagamento || new Date())}</Text>
          <Text>{item.numero_recibo}</Text>
        </View>
      </View>
      <View style={styles.valueContent}><Text style={styles.value}>{formatCurrencyBRL(item.valor_pago || 0)}</Text></View>
    </TouchableOpacity >
  );
  return (
<View style={{flex: 1}}>
<FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={50}
      onEndReached={fetchData}
      onEndReachedThreshold={0.8}
      keyExtractor={(item) => item.id.toString()}
    />
</View>

  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: 75,
  },
  contentItem: {
    flex: 1,
    gap: 5
  },
  contentDate: {
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontFamily: "bold",
    fontSize: 18,
    textTransform: "uppercase"
  },
  valueContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontFamily: "bold",
    fontSize: 18,
  }

})
