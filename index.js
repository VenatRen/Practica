// Популярный и быстрый фреймворк
import express from "express";
// bodyParser для, Middleware для парсинга, взаимодействия с json
import bodyParser from "body-parser";
import { Books } from "./database/models.js";


const app = express();

app.use(bodyParser.json({ limit: "50bm" })); //для парсинга данных в формате JSON из тела запроса.
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); //обрабатывает данные с запросов в формате urlencoded, extended для парсинга более сложных запросов

app.get('/books', async (req, res) => {
    res.send(await Books.findAll());
});

app.get("/books/:id", async (req, res) => {
    res.send(await Books.findOne({ where: { Id: req.params.id } }));
});

app.post("/books", async (req, res) => {
    res.send(await Books.create({
        Name: req.body.name
    }));
});

app.put('/books/:id', async (req, res) => {
    const data = await Books.update(
        { Name: req.body.name },
        { where: { Id: req.params.id } }
    );
    res.send(data ? "Success" : "Error");
});

app.delete('/books/:id', async (req, res) => {
    const data = await Books.destroy({
        where: { Id: req.params.id }
    });
    res.send(data ? "Success" : "Error");
});

app.listen(3000);
