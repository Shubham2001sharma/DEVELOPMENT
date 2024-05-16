const express = require("express");
const cors = require("cors");
const app = express();
const mongoDB = require("./mongoDB"); 
const collection = require("./mongoDB");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendData", async (req, res) => {
    const { title, description } = req.body;

    try {
        
        await mongoDB.collection.insertOne({
            TITLE: title,
            DESCRIPTION: description,
        });
const allData = await collection.find({});
        res.json(allData);
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(5000, () => {
    console.log("The app is running on port 5000");
});
