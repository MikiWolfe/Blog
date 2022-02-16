const router = require("express").Router();
const { mainPage } = require("../models");

router.get("/", (req, res) => {
  mainPage.all((data) => {
    console.log("data", data);
    let dataObj = {
      comments: data,
    };

    res.render("index", dataObj);
  });
});
