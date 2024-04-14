import User from '../models/user.model.js';
import createError from '../utils/createError.js';

//create delete user controller
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, 'You can delete only your account!'));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send('Deleted successfully!.');
};

//create get user controller
export const getUser = async (req, res, next) => {
  console.log('test');

  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

//create update user controller
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user by ID and update details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
