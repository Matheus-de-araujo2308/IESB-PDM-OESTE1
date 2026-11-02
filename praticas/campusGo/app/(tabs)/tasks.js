import { View, Button, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Button title="Nova Tarefa (Modal)" onPress={() => router.push('/new-task')} />
      
      <View style={styles.space} />
      
      <Link href="/task/42" style={styles.link}>
        Abrir Detalhe da Tarefa 42
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  space: { 
    height: 20 
  },
  link: { 
    color: '#007AFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});