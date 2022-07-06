import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
} from "react-native";
import { auth } from "../firebase";
import VideoScreen from "./VideoScreen";
import MovieScreen from "./MovieScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Bogdy98/ReactNative-RestAPI/main/ReactNative-RestAPI.json"
      );
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const Item = ({
    title,
    rating,
    releaseYear,
    image,
    description,
    director,
    writers,
    stars,
  }) => (
    // <View style={styles.item}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Movie", {
          movie: {
            title: title,
            rating: rating,
            releaseYear: releaseYear,
            image: image,
            description: description,
            director: director,
            writers: writers,
            stars: stars,
          },
        })
      }
      style={styles.item}
    >
      <Text style={styles.text3}>{title}</Text>
      <Text style={styles.text}>IMDb rating: {rating}</Text>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image,
        }}
      />
    </TouchableOpacity>
    // </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      rating={item.rating}
      releaseYear={item.releaseYear}
      image={item.image}
      description={item.description}
      director={item.director}
      writers={item.writers}
      stars={item.stars}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTop} />
      <View style={styles.container}>
        <Text style={styles.text}>Watch Video</Text>
        <Button title={"Video"} onPress={() => navigation.navigate("Video")} />
        <Text style={styles.text2}>Movie List</Text>
      </View>

      <View style={styles.containerList}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={renderItem}
            // renderItem={({ item }) => (
            //   <Text>
            //     {item.title}, {item.releaseYear}
            //   </Text>
            // )}
          />
        )}
      </View>

      <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sing out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    // marginTop: 40,
  },
  button2: {
    backgroundColor: "#0782F9",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  containerList: {
    flex: 5,
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // height: 100,
    // padding: 20,
    // borderTopColor: "black",
    // borderBottomColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  text2: {
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    padding: 10,
  },
  text3: {
    fontWeight: "700",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
