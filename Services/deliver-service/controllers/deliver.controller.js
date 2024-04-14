import Deliver from '../models/deliver.model.js';
import createError from '../utils/createError.js';

//create a new delivery for sellers
export const createDeliver = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, 'Only sellers can create  delivery option!'));

  const newDeliver = new Deliver({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedDeliver = await newDeliver.save();
    res.status(201).json(savedDeliver);
  } catch (err) {
    next(err);
  }
};

//create delete function for sellers' deliverys
export const deleteDeliver = async (req, res, next) => {
  try {
    const deliver = await Deliver.findById(req.params.id);

    if (deliver.userId !== req.userId)
      return next(createError(403, 'You can Delete your delivery details only!'));
    await Deliver.findByIdAndDelete(req.params.id);
    res.status(200).send('Delivery Option has been deleted!');
  } catch (err) {
    next(err);
  }
};

//get seleted delivery from delivery model
export const getDeliver = async (req, res, next) => {
  try {
    const deliver = await Deliver.findById(req.params.id);
    if (!deliver) return next(createError(404, 'Deliver record Not Found!'));
    res.status(200).send(deliver);
  } catch (err) {
    next(err);
  }
};





// Get deliveries by address
export const getDeliveriesByAddress = async (req, res, next) => {
  try {
    const address = req.params.address;

    // Find all delivery records with the specified address
    const deliveries = await Deliver.find({ address });

    if (!deliveries || deliveries.length === 0) {
      return next(createError(404, 'No Deliveries Found for the Address!'));
    }

    res.status(200).send(deliveries);
  } catch (err) {
    next(err);
  }
};




//create update selected product
export const updateDelivers = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find product by ID and update product details
    const updatedProduct = await Deliver.findByIdAndUpdate(
      productId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return next(createError(404, 'product not found'));
    }

    if (updatedProduct.userId !== req.userId) {
      return next(createError(403, 'You can update your own delivery product only'));
    }

    return res.json({
      message: 'Product details updated successfully',
      product: updatedProduct,
    });

  } catch (err) {
    next(err);
  }
};

