import { getGameAssets } from "../init/assets.js";
import { createStage, getStage, setStage } from "../models/stage.model.js";
import { getUser, removeUser } from "../models/user.model.js";
import handlerMappings from "./handlerMapping.js";
import { CLIENT_VERSION } from "../constants.js";

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected: ${socket.id}`);
  console.log("Current users:", getUser());
};

export const handleConnection = (socket, uuid) => {
  console.log(`새로운 유저가 접속했습니다!: ${uuid} 소켓 아이디: ${socket.id}`);
  console.log("접속중인 유저정보:", getUser());

  createStage(uuid);

  socket.emit("connection", { uuid });
};

export const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit("response", { status: "fail", message: "Client version mismatch" });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit("response", { status: "fail", message: "Handler not found" });
    return;
  }

  const response = handler(data.userId, data.payload);

  if (response.broadcast) {
    io.emit("response", "broadcast");
    return;
  }

  socket.emit("response", response);
};
