import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Modal,
  Platform,
  Vibration,
} from "react-native";
import * as Haptics from "expo-haptics"; // Module for Haptic response
import Ripple from "react-native-material-ripple"; // Module for Ripple effect after press event

import { useSharedValue } from "react-native-reanimated";
import { ListItem } from "./components/ListItem";
import { styles } from "./styles/styles";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const viewableItems = useSharedValue([]); /// Changing this value Worklet function is triggered

  const per_page = 30;

  const onViewableItemsChanged = useCallback(({ viewableItems: items }) => {
    viewableItems.value = items;
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.github.com/gists/public?page=${page}&per_page=${per_page}`
    );
    const data = await response.json();
    if (Boolean(data.length)) setData((prevData) => [...prevData, ...data]);
  };

  const handleEnd = () => {
    setPage((page) => page + 1);
    fetchData();
  };

  const openModal = useCallback((url) => {
    setImagePath(url);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      {Platform.OS === "android" && <StatusBar barStyle="light-content" />}
      <FlatList
        data={data}
        onEndReached={handleEnd}
        onEndReachedThreshold={2}
        ListHeaderComponentStyle={styles.headerContainer}
        ListHeaderComponent={<Text style={styles.headerText}>Gists</Text>}
        keyExtractor={(x, i) => i}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <Ripple
            rippleColor="gray"
            rippleOpacity={0.9}
            rippleDuration={700}
            style={styles.rowContainer}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              openModal(item.owner.avatar_url);
            }}
          >
            <ListItem item={item} viewableItems={viewableItems}></ListItem>
          </Ripple>
        )}
      />
      {modalVisible && (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000075",
            }}
          >
            <View style={{ padding: 15, backgroundColor: "white", borderRadius: 10 }}>
              <Image style={{ width: 200, height: 200 }} source={{ uri: imagePath }} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default App;
