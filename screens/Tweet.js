import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Tweet = () => {
  const [tweetText, setTweetText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleTweet = () => {
    // Do something with the tweet text, such as post it to Twitter using an API
    console.log('Tweet posted:', tweetText);
    // Clear the tweet input and hide it
    setTweetText('');
    setShowInput(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      {showInput ? (
        <View style={styles.tweetInputContainer}>
          <TextInput
            style={styles.tweetInput}
            value={tweetText}
            onChangeText={setTweetText}
            placeholder="What's happening?"
            multiline={true}
          />
          <TouchableOpacity style={styles.tweetButton} onPress={handleTweet}>
            <Text style={styles.tweetButtonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setShowInput(true)}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#1da1f2',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  tweetInputContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    elevation: 8,
  },
  tweetInput: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  tweetButton: {
    backgroundColor: '#1da1f2',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tweetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tweet;
