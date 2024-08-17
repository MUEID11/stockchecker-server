const { dataCollection } = require("../mongoDB/collections");

const allProduct = async (req, res) => {
  const search = req?.query?.search || "";
  const sort = req?.query?.sort || "";
  const category = req?.query?.category;
  const price = req?.query?.price;
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(category);
  // Build the query object
  //   let query = {
  //     $or: [
  //       { name: { $regex: String(search), $options: "i" } },
  //     //   { category: { $regex: String(search), $options: "i" } },
  //     //   { brandName: { $regex: String(search), $options: "i" } },
  //       {category:category}
  //     ],
  //   };

  let query = {};
  if (search) {
    query.name = new RegExp(search, "i");
  }
  if (category) {
    query.category = category;
  }
  // Build the sort query
  let sortQuery = {};
  switch (sort) {
    case "priceLowToHigh":
      sortQuery = { price: 1 };
      break;
    case "priceHighToLow":
      sortQuery = { price: -1 };
      break;
    case "dateNewestFirst":
      sortQuery = { creationDate: -1 }; // Ensure this field matches your MongoDB schema
      break;
    default:
      sortQuery = {}; // Default sort (can be omitted if not needed)
  }

  try {
    const totalProduct = await dataCollection.countDocuments(query);
    const result = await dataCollection
      .find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.send({
      data: result,
      totalProduct,
      currentPage: page,
      totalPages: Math.ceil(totalProduct / limit),
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { allProduct };
