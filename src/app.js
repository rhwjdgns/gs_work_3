import express from "express";
import { createServer } from "http";
import initSocket from "./init/socket.js";
import { loadGameAssets } from "./init/assets.js";

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
initSocket(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, async () => {
  console.log(`${PORT}번 포트로 서버가 열렸습니다.`);

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log("엑세스를 성공적으로 불러왔습니다.");
  } catch (e) {
    console.error("게임 에셋을 불러오는 중 오류가 발생했습니다.", e);
  }
});
