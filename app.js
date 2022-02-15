//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//TODO
////////////////////////////////////REQUEST TARGETING ALL ARTICLES////////////////////////////////
app
  .route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, founditems) {
      if (err) {
        res.send(err);
      } else {
        res.send(founditems);
      }
    })
  })
  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);

    const article1 = new Article({
      title: req.body.title,
      content: req.body.content,
    })
    article1.save(function (err, founditems) {
      if (err) {
        res.send(err);
      } else {
        res.send(founditems);
      }
    })
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("deleted sucessfully");
      }
    });
  })

////////////////////////////////////REQUEST TARGETING ALL ARTICLES/sOMETHING////////////////////////////////

app.route("/articles/:setTitle")
.get(function (req,res) {
   
   Article.findOne({title:req.params.setTitle},function (err,founditems) {
     if(founditems)
     {
      res.send(founditems)
     }
     else 
     {
      res.send("No Articles with that name found");      
     }
     })
  })
.put(function (req,res) {
  Article.updateOne(
    {title:req.params.setTitle},
    {title:req.body.title,content:req.body.content}
    ,function (err) {
    if (!err) {
      res.send("Sucessfully updated");
    }
    else
    {
      console.log(err);
      res.send("the article with given name not found")
    }
    })
  })
.patch(function (req,res) {
  Article.updateOne({title:req.params.setTitle},{$set:req.body },function (err) {
    if (!err) {
      res.send("Sucessfully updated");
    }
    else
    {
      console.log(err);
      res.send("the article with given name not found")
    }
    })
  })
  .delete(function (req,res) {
   const count=Article.deleteOne({title:req.params.setTitle},function (err) {
      
      })
      console.log(count);
      if(count===0)
      {
        res.send("Article not found")
      }
      else
      {
        res.send("Deleted")
      }
    })


app.listen(3000, function () {
  console.log("Server started on port 3000");
});


