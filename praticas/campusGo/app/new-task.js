import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function NewTaskModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Tarefa</Text>
      <Button title="Fechar Modal" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});