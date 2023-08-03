// Home.js
import React from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';

const Home = () => {
  const cardData = [
    {
      id: 1,
      title: 'Card 1',
      content: 'Content for card 1',
      imageUrl: 'https://random.imagecdn.app/500/150', // Replace with your image URL
    },
    {
      id: 2,
      title: 'Card 2',
      content: 'Content for card 2',
      imageUrl: 'https://random.imagecdn.app/500/150', // Replace with your image URL
    },
    {
      id: 3,
      title: 'Card 3',
      content: 'Content for card 3',
      imageUrl: 'https://random.imagecdn.app/500/150', // Replace with your image URL
    },
    {
      id: 4,
      title: 'Card 4',
      content: 'Content for card 4',
      imageUrl: 'https://random.imagecdn.app/500/150', // Replace with your image URL
    },
    // Add more card data as needed
  ];

  const renderItem = ({ item }) => (
    <Card title={item.title} content={item.content} imageUrl={item.imageUrl} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
};

const Card = ({ title, content, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24, // Increased marginBottom for more spacing between cards
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5.84,
    elevation: 2,
  },
  cardImage: {
    height: 200, // Set the image height to 200 pixels
    // borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
  },
});

export default Home;
