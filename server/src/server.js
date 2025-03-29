import { connectDB } from "./db/md.db.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Unable to start server ", err));
