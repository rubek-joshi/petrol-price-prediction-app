import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  }
});

const slides = [
  {
    key: "slide-i",
    title: "Daily Market Price",
    text: "View and stay updated with the current market price of petrol.",
    image: require("../assets/slides/1.png"),
    imageStyle: styles.image,
    backgroundColor: "#59b2ab"
  },
  {
    key: "slide-ii",
    title: "Petrol Calculator",
    text:
      "Use petrol calculator to quickly calculate petrol price according to litre or amount.",
    image: require("../assets/slides/2.png"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  },
  {
    key: "slide-iii",
    title: "History",
    text:
      "Check history of petrol prices and see what changes have occured in the past.",
    image: require("../assets/slides/3.png"),
    imageStyle: styles.image,
    backgroundColor: "#ea6767"
  }
];

export default slides;
