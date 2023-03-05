import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  list = [];
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState("");

  const loadList = async () => {
    setTodo(JSON.parse(await AsyncStorage.getItem("todoList")));
  };

  loadList();

  const addTodo = async () => {
    list = [...todo];
    if (list.length >= 10) {
      list.shift();
    }
    if (text.trim() === "" && description.trim() === "") {
      Alert.alert("Alert!", "Please Fill All the fields", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return;
    }
    list.push({
      id: text + Math.random(),
      item: text,
      description: description,
    });
    console.log(list);
    await AsyncStorage.setItem("todoList", JSON.stringify(list));
    loadList();
    setText("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#79008e",
        }}
      >
        <Text
          style={{
            marginTop: 20,
            padding: 12,
            fontSize: 20,
            marginLeft: 7,
            color: "#ffffff",
          }}
        >
          TODO LIST
        </Text>
      </View>
      <TextInput
        label="Add Todo Item"
        value={text}
        placeholder="Item"
        onChangeText={(text) => setText(text)}
        style={{
          margin: 10,
          padding: 10,
          borderWidth: 2,
          fontSize: 15,
          marginTop: 20,
        }}
      />
      <TextInput
        label="Add Description"
        value={description}
        placeholder="Description"
        onChangeText={(description) => setDescription(description)}
        style={{ margin: 10, padding: 10, borderWidth: 2, fontSize: 15 }}
      />
      <TouchableOpacity
        onPress={addTodo}
        style={{
          backgroundColor: "#79008e",
          margin: 10,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          elevation: 10,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>

      <FlatList
        data={todo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 2,
              margin: 10,
              padding: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 20 }}>Item - {item.item} </Text>
              <Text style={{ fontSize: 20 }}>
                Description - {item.description}
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={async () => {
                list = [...todo];
                let newArray = list;
                list = newArray.filter((todo) => {
                  return todo.id !== item.id;
                });
                await AsyncStorage.setItem("todoList", JSON.stringify(list));
                loadList();
              }}
            >
              <Icon name="trash" size={30} color="#79008e" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
