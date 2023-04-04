import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const DATA = [
  {
    id: '1',
    username: 'JohnDoe',
    handle: '@johndoe',
    tweetText: 'Just had the best pizza in town! 🍕 #yum #pizza #foodie',
    image: require('../assets/twitter.png'),
    likes: 23,
    retweets: 10,
  },
  {
    id: '2',
    username: 'JaneDoe',
    handle: '@janedoe',
    tweetText: 'Excited to start my new job at Google! 🚀 #newjob #excited',
    image: require('../assets/twitter.png'),
    likes: 32,
    retweets: 15,
  },
];

export default function App() {
  const [tweets, setTweets] = useState(DATA);

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <Image style={styles.tweetImage} source={item.image} />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.tweetUsername}>{item.username}</Text>
          <Text style={styles.tweetHandle}>{item.handle}</Text>
        </View>
        <Text style={styles.tweetText}>{item.tweetText}</Text>
        <View style={styles.tweetStats}>
          <Text style={styles.tweetStat}>{item.likes} Likes</Text>
          <Text style={styles.tweetStat}>{item.retweets} Retweets</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tweetContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tweetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tweetUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  tweetHandle: {
    color: 'grey',
  },
  tweetText: {
    marginVertical: 5,
  },
  tweetStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tweetStat: {
    color: 'grey',
  },
});
