import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Pokemon } from '../types/pokemon';

const SquirtlePage = ({ route }) => {
  const { pokemon } = route.params;
  const [squirtleData, setSquirtleData] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchSquirtleData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSquirtleData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do Squirtle:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSquirtleData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
      {squirtleData && (
        <Image
          style={styles.image}
          source={{ uri: squirtleData.sprites.front_default }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 100,
    textAlign: 'center',
  },
});

export default SquirtlePage;
