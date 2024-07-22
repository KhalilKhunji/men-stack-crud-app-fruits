const Fruit =  require('../models/fruit');

const landing = (req, res, next) => {
    res.render("index.ejs");
};

const fruitNew = (req, res, next) => {
    res.render('fruits/new.ejs');
};

const fruitsPost = async (req, res, next) => {
    // Converting data from checkbox ('on' or 'off') to Boolean
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    };
    await Fruit.create(req.body);
    res.redirect("/fruits");
};

const fruitsGet = async (req, res, next) => {
    const fruits = await Fruit.find();
    res.render('fruits/index.ejs', {fruits});
};

const fruitIdGet = async (req, res, next) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
};

const fruitDelete = async (req, res, next) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
};

const fruitEdit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
};

const fruitUpdate = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    };
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
};

module.exports = {
    landing,
    fruitNew,
    fruitsPost,
    fruitsGet,
    fruitIdGet,
    fruitDelete,
    fruitEdit,
    fruitUpdate
};
