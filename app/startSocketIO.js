import { Component } from "react";
import socketIO from "socket.io-client";
import { connect } from "react-redux";
import { Alert } from "react-native";

const socketUtil = {
  socketFunc(socket, userId) {
    console.log("props id in socket func: ", userId);
    const data = { userId: userId };
    socket.emit("join-room", data); // send userId to socket
    socket.on("like-matched", ({ matchedId, header, content }) => {
      Alert.alert(
        "Notification",
        header + ". " + content,
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    });
  }
};

export default socketUtil;
