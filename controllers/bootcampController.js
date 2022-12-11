const Bootcamp = require("../models/bootcamp");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };
  const reqQuery = { ...req.query }; //to get query from url
  const removeFields = ["sort"]; //fspecify what field to remove ield we want to remove from url  ex: http://localhost:3001/api/v1/bootcamps?price[lte]=10&sort=-price we want to remove sort here
  // console.log(reqQuery);// here we are getting sort
  removeFields.forEach((val) => delete reqQuery[val]); //remove it from request query object for each of value in array if you find in obj that key matches that value (sort ) delete the value pair
  // console.log(reqQuery);

  const filterKeys = Object.keys(reqQuery); // makes an array of all the keys we get from our reqQuery {price,ranging}
  const filterValues = Object.values(reqQuery); // makes an array of all the values
  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  ); //we are setting our key valus which we get from reqquery to uiValues as key value pair
  let queryStr = JSON.stringify(reqQuery); // to convert to json string format
  // console.log(queryStr)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  ); //is it conteain any of this word than add $ sign with this to add $lte in query
  query = Bootcamp.find(JSON.parse(queryStr));
  //here we check if there is filtering then we will update filter state of url

  //we are doing all of these just to get data into the frontend part
  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    sortByArr.forEach((val) => {
      let order;
      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }
      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");
    query = query.sort(sortByStr); //sort( '-price  +salary')
  } else {
    query = query.sort("-price");
  }
  const bootcamps = await query;

const maxPrice=await Bootcamp.find().sort({price: -1}).limit(1).select("-_id price");
const minPrice=await Bootcamp.find().sort({price: 1}).limit(1).select("-_id price");
uiValues.maxPrice=maxPrice[0].price;
uiValues.minPrice=minPrice[0].price;


  res.status(200).json({
    success: true,
    data: bootcamps,
    uiValues,
  });
});

exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with ${req.params.id} not found`, 404)
    );
  }
  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    //when we add new value run vaalidator inside the modal new means for bootcamp we ewant newly updated version
  });
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with ${req.params.id} not found`, 404)
    );
  }
  await bootcamp.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
