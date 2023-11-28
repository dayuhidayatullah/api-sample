const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create(
      {
        email,
        password,
      },
      { returning: true }
    )
      .then((user) => {
        res.status(201).json({
          id: user.id,
          email: user.email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  static async login(req, res, next) {
    const email = req.body.email;
    console.log(req.headers);
    try {
      if (email) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
          throw {
            name: 'InvalidLogin',
            status: 400,
          };
        } else if (
          comparePassword(req.body.password, user.password) &&
          user.role === 'admin'
        ) {
          console.log('masuk-controller-else-if', '<<<<<<<<<<<<<<<<<<<<<<<<<');
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ access_token, email });
        } else {
          throw {
            name: 'InvalidLogin',
            status: 400,
          };
        }
      } else {
        console.log('<<<<<<<<<MASUK>>>>>>>>>>>>>');
        throw {
          name: 'InvalidLogin',
          status: 400,
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
