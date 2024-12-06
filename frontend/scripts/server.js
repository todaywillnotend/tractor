const cp = require("child_process");
const express = require("express");
const app = express();
const fs = require("fs-extra");

const buildFolder = "./public";
const serverFolder = "./build";
let isBuilding = false;

// function to handle rebuilding
const rebuild = () => {
  isBuilding = true;
  console.log(`Start rebuilding Gatsby`);
  if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder);
  }
  const child = cp.exec("yarn clean && yarn build");

  // Handle stdout, stderr, and errors
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on("error", (error) => {
    console.error(`exec error: ${error}`);
  });

  child.on("exit", function (code) {
    console.log(`Gatsby rebuild finished with exit code ${code}`);
    isBuilding = false;
    if (code === 0) {
      // Очистка старого билда
      fs.emptyDirSync(serverFolder);

      // Копирование новой сборки
      fs.copySync(buildFolder, serverFolder);
    }
  });
};
// initial build
rebuild();

// endpoint to trigger rebuild
app.post("/__rebuild", (req, res) => {
  if (!isBuilding) {
    rebuild();
    res.send("Rebuild started");
  } else {
    res.send("Rebuild is already in progress");
  }
});

app.use(express.static(serverFolder));

app.use((req, res) => {
  console.error(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(`${serverFolder}/404.html`, { root: "." });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
