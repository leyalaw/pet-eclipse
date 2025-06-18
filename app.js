import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());

app.use(express.static(path.join(process.cwd(), "dist")));

/* --------------------------------- Routes --------------------------------- */

// данные в public/data
app.get("/lines", sendLocalJsonData("lines"));
app.get("/works", sendLocalJsonData("works"));

/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});

/* -------------------------------------------------------------------------- */

/**
 * Отправление данных из локального JSON-файла
 *
 * @param {string} fileName - Имя JSON-файла
 * @param {string} [directory="public/data"] - Папка, в которой находится JSON-файл
 */
function sendLocalJsonData(fileName, directory = "public/data") {
  return (req, res) => {
    const filePath = path.join(
      process.cwd(),
      ...directory.split("/").filter(Boolean),
      `${fileName}.json`
    );

    fs.readFile(filePath, "utf8", (error, jsonData) =>
      res.json(JSON.parse(jsonData))
    );
  };
}
