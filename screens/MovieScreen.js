import { useNavigation } from "@react-navigation/core";
import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  Animated,
  FlatList,
  ScrollView,
} from "react-native";
// import Video from "react-native-video";
// import YouTube from 'react-native-youtube';
// import YoutubePlayer from "react-native-youtube-iframe";
// import { WebView } from "react-native-webview";
import { Video, AVPlaybackStatus } from "expo-av";

const MovieScreen = ({ route }) => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTop} />
        <View style={styles.container}>
          <Text style={styles.title}>Movie Details</Text>
        </View>
        <View style={styles.movie}>
          <Text style={styles.text3}>Title: {route.params.movie.title}</Text>
          <Text style={styles.text}>Rating: {route.params.movie.rating}</Text>
          <Text style={styles.text}>
            Release year: {route.params.movie.releaseYear}
          </Text>
          <Text style={styles.text}>
            Description: {route.params.movie.description}
          </Text>
          <Text style={styles.text}>
            Director: {route.params.movie.director}
          </Text>
          <Text style={styles.text}>Writers: {route.params.movie.writers}</Text>
          <Text style={styles.text}>Stars: {route.params.movie.stars}</Text>
          <View style={styles.movieImage}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: route.params.movie.image,
              }}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Back to movies list</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  containerButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  containerTop: {
    height: 25,
    // borderBottomWidth: 1,
    width: "100%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  movie: {
    flex: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: 5,
  },
  movieImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
  },
  image: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    // textAlign: "center",
    padding: 1,
  },
  text2: {
    fontWeight: "700",
    fontSize: 24,
    // textAlign: "center",
    padding: 1,
  },
  text3: {
    fontWeight: "700",
    fontSize: 20,
    padding: 1,
    // textAlign: "center",
  },
});
