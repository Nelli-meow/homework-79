import express from "express";
import cors from 'cors';
import resourcesRouter from "./routers/things";
import fileDb from "./fileDb";


const app = express();
const port =  8000;

app.use(express.json());
app.use(cors());
app.use('/things', resourcesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
