const { dataCollection } = require("../mongo/collections");

const uploadProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Optional: Adding validation for the productData here

    const result = await dataCollection.insertOne(productData);

    if (result.acknowledged) {
      res.status(201).send({
        message: "Product uploaded successfully",
        productId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to upload product" });
    }
  } catch (error) {
    // console.error("Error uploading product:", error);
    res.status(500).send({ message: "Server error while uploading product" });
  }
};

module.exports = { uploadProduct };
