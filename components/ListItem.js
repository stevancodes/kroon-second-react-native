import React, { memo } from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Image, Text } from "react-native";
import { styles } from "../Styles/styles";

const getFilename = (file) => {
  if (file[Object.keys(file)[0]]) {
    return file[Object.keys(file)[0]].filename || "";
  }
};
///Worklets are functions that runs synchronously on the Native UI thread.
export const ListItem = memo(({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    /// Worklet function
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
    };
  }, []);

  //To use Animated style we must use Animated component
  return (
    <Animated.View style={[styles.row, rStyle]}>
      <Image style={styles.avatarImage} source={{ uri: item.owner.avatar_url }} />
      <Text style={styles.filenameText}>{getFilename(item.files)}</Text>
    </Animated.View>
  );
});
