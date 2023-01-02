const { createCustomError } = require("../Errors/custom-error");

const User = require("../Models/User.model");

module.exports = {
  getUser: (req, res) => {
    console.log(req);
    if (req.params.userAge > 18) {
      return res.send(`Hello ${req.params.userName} ${req.params.userSurname}`);
    }
    res.status(401).send("Too young");
  },
  setUser: async (req, res, next) => {
    const { email, userName: name, userSurname: surname } = req.params;

    if (req.params.userAge > 18) {
      try {
        const user = new User({ email, name, surname });
        const result = await user.save();
        return res.send("Done");
      } catch (error) {
        console.log(error.message);
        if (error.name === "ValidationError") {
          return next(createCustomError(error.message, 422));
        }
        return next(error);
      }
    }
    return next(createCustomError("Too young", 401));
  },
  getUsersSurnameByEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const users = await User.find({ email }).select({
        surname: 1,
        name: 1,
        _id: 0,
      });

      if (!users) {
        return next(createCustomError("Users does not exist", 404));
      }
      res.send(users);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createCustomError("Invalid users request", 400));
      }
      next(error);
    }
  },
};
