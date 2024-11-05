import { Text, View, StyleSheet } from "react-native";

export default function List() {
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
