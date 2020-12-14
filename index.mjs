import express from "express";
import * as path from "path";
import hbs from "express-handlebars";
import cookieParser from "cookie-parser";

const rootDir = process.cwd();
const port = 3000;
const app = express();
app.use(cookieParser());

app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(rootDir, "/views/layouts/"),
    partialsDir: path.join(rootDir, "/views/partials/"),
  })
);

app.use('/static', express.static('static'))

app.get("/", (_, res) => {
  res.redirect('/menu');
});

const games = [
  {
    name: "Зажги все огоньки",
    image: "/static/img/ChristmasTree.png",
  },
  {
    name: "Memory",
    image: "/static/img/memory_logo.png",
  }
]

const memoryCards = [
  { imageName: "Tree" },
  { imageName: "Sleigh" },
  { imageName: "SantaReindeer" },
  { imageName: "Gift" },
  { imageName: "Bells" },
  { imageName: "SantaClaus" },
]

app.get("/menu", (_, res) => {
  res.render("menu", {
    layout: "default",
    items: games,
  });
});


app.get("/games/:name", (req, res) => {
  let address = "sequence";
  for(let i of games) {
    if(i.name == req.params["name"]) {
      console.log(i.name)
    }
    switch(req.params["name"]){
      case "Зажги все огоньки":
        address = "sequence";
        break;
      case "Memory":
        address = "memory";
        break;
    }
  }
  res.redirect(`/${address}`);
});

app.get("/memory", (req, res) => {
  res.render("memoryIndex", {
    layout: "default",
    items: memoryCards,
  });
})

app.get("/sequence", (req, res) => {
  res.render("sequence", {
    layout: "default",
    count: [...Array(13).keys()],
  });
});

app.post("/:name", (req, res) => {
  let cart = getCart(req, res);
  cart.splice(0, cart.length);
  res.redirect("/menu");
});

// app.get("*", (_, res) => {
//   res.redirect('/menu');
// });


app.listen(port, () => console.log(`App listening on port ${port}`));

