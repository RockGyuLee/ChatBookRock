import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";


const convertAlign = {
    "horizontal" : true,
    "vertical" : false
}

/* 
    @params
*/
function Carousel({ align, scrollHeight, imageHeight, imageUri = [] }){
  const scrollX = useRef(new Animated.Value(0)).current;
  const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

  const { width: windowWidth } = useWindowDimensions();

  console.log("style",convertAlign[align])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer(scrollHeight)}>
        <ScrollView
          horizontal={convertAlign[align]}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ], {useNativeDriver: false})}
          scrollEventThrottle={1}
        >
          {imageUri.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: imageHeight || 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {imageUri.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: (scrollHeight)=> {
    return ({
        height: scrollHeight || 260,
        alignItems: "center",
        justifyContent: "center"
      })
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Carousel;