//imported express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//declaring public (static)files
app.use(express.static("public"));
//for body parser
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit",async (req,res) =>{
    // console.log(req.body);
    const search = req.body.search;
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`);
        const result = response.data.items;
        console.log(result);
        res.render("index.ejs", { data: result });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
    // res.render("index.ejs",{data : data})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  