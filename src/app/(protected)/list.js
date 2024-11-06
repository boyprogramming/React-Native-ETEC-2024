import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function List() {
  const [data, setData] = useState([]);

  async function fetchData() {
    // Vai buscar no banco de dados os pagamentos 
   return [];
  }

  useEffect(() => {
    // Executa a a primeira e fez a busca de dados
    const tempData = fetchData()
    setData(tempData);
  }, []); 

  
   
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e57c3a',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#555',
    fontWeight: '500',
    textAlign: 'center',
  },
});
