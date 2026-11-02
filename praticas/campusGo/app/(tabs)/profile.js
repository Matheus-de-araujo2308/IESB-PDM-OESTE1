import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  // Selecionar imagem da Galeria ou Câmera
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'É preciso permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Capturar Localização GPS
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Permissão de acesso à localização foi recusada.');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {/* Exibição da Foto de Perfil */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Sem Foto</Text>
          </View>
        )}
      </View>

      <Button title="Alterar Foto de Perfil" onPress={pickImage} />

      <View style={styles.divider} />

      {/* Seção de Localização */}
      <Text style={styles.subtitle}>Sua Localização:</Text>
      {location ? (
        <Text style={styles.coordsText}>
          Lat: {location.latitude.toFixed(4)} | Long: {location.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.coordsText}>Localização ainda não capturada.</Text>
      )}

      <View style={styles.space} />
      <Button title="Obter Localização Atual" onPress={getLocation} color="#34C759" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  imageContainer: { marginBottom: 15 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  placeholder: { backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#666', fontSize: 14 },
  coordsText: { fontSize: 14, color: '#444', marginVertical: 8, textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#DDD', width: '100%', marginVertical: 25 },
  space: { height: 10 },
});