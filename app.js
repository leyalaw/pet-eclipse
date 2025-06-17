import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(process.cwd(), "dist")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
