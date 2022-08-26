import dbConnect from "../../../utils/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
