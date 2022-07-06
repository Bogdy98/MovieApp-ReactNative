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
} from "react-native";
// import Video from "react-native-video";
// import YouTube from 'react-native-youtube';
// import YoutubePlayer from "react-native-youtube-iframe";
// import { WebView } from "react-native-webview";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoScreen = () => {
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
      <View style={styles.containerTop} />
      <View style={styles.container}>
        <Text style={styles.title}>Watch top 10 movies everybody should seen once!</Text>
      </View>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={
            // {uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",}
            // require("../videos/sample-mp4-file.mp4")
            require("../videos/video.mp4")
          }
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back to movies list</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  video: {
    width: 400,
    height: 400,
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
    textAlign: "center",
  },
});
