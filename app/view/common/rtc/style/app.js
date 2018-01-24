import {StyleSheet} from 'react-native';
import config from "../config/app.js";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: config.screenWidth,
    height: config.screenHeight,
    //borderWidth: 1, borderColor: "red"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: config.screenWidth,
    height: config.screenHeight
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: config.screenWidth,
    height: config.screenHeight,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },

  joinContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: config.screenWidth,
    height: config.screenHeight,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1, borderColor: "white"
  },

  joinLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  joinName: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    textAlign: "center",
    color: "white"
  },
  joinButton: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#337ab7",
    padding: 10
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});
