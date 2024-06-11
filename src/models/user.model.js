import { Socket } from "socket.io";

const users = [];

export const addUser = (user) => {
  users.push(user);
};

// 유저가 접속 해제할때 사용할 함수
export const removeUser = (SocketId) => {
  const index = users.findIndex((user) => user.SocketId === SocketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = () => {
  return users;
};
