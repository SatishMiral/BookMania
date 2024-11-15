import dotenv from 'dotenv';
dotenv.config();

//imported express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();

//for database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "collections",
  password: "Satish2512",
  port: 5432
});

db.connect();

//declaring public (static)files
app.use(express.static("public"));

//for body parser
app.use(express.urlencoded({ extended: true }));

//for home page
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

//for search page to get the books from the api
app.post("/",async (req,res) =>{
    // console.log(req.body);
    const search = req.body.search;
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.APIKEY}&maxResults=40`);
        const result = response.data.items;
        // console.log(result);
        res.render("index.ejs", { data: result });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
    // res.render("index.ejs",{data : data})
})

//for view page to get more details about the book (leads to google books webpage)
app.post('/view', async (req, res) => {
  // console.log(req.body);
  const desc = req.body;
  try{
    res.render('view.ejs', {data : desc});
  }catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

//for collection page (to add a book in collection)
app.post('/collection', async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  try{
    const query = 'INSERT INTO collections (title, author, description, thumbnail, date, prelink) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [data.title, data.author, data.description, data.thumbnail, data.date, data.previewLink];
    await db.query(query, values);

    const result = await db.query('SELECT * FROM collections ORDER BY id DESC');
    // console.log(result.rows);
    res.render('collection.ejs', {data : result.rows});
  }catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

//for collection page (to get collection from home page)
app.get('/collection', async (req, res) => {
  //res.render('collection.ejs');
  try{
    const result = await db.query('SELECT * FROM collections ORDER BY id DESC');
    // console.log(result.rows);
    res.render('collection.ejs', {data : result.rows});
  }catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

//to delete a book from collection
app.post('/delete', async (req,res)=>{
  // console.log(req.body);
  const id = req.body.title;
  try{
    await db.query('DELETE FROM collections WHERE id = $1',[id]);
    const result = await db.query('SELECT * FROM collections');
    const data = result.rows;
    res.render("collection.ejs",{data : data});
  }
  catch(error){
    console.error("Failed to make request:", error.message);
    res.render("collection.ejs", {
      error: error.message,
    });
  }
})

//to edit a book from collection
app.post('/edit', async (req,res) =>{

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });