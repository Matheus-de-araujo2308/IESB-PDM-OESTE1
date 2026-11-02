import React from 'react';
import { View, Text, Button, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  // Soma o total das despesas
  const total = (expenses || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const formattedTotal = total.toFixed(2);

  // Ação de Partilhar nativa do telemóvel
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Gastei R$ ${formattedTotal} neste semestre.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total de Despesas do Semestre:</Text>
      <Text style={styles.total}>R$ {formattedTotal}</Text>
      <View style={styles.space} />
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  label: { fontSize: 18, color: '#666' },
  total: { fontSize: 32, fontWeight: 'bold', marginVertical: 10, color: '#007AFF' },
  space: { height: 20 },
});