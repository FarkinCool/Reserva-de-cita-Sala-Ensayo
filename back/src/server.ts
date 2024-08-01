import  express  from "express";
import router from "./routes/indexRouter";
import cors from "cors";
import morgan from "morgan";
import path from "path";

const app = express();

app.use(express.json({limit:"2mb"}));
app.use(cors());
app.use(express.static("src/public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(router);




export default app;