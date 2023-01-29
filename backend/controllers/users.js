const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  MONGO_DUPLICATE_ERROR_CODE,
  SOLT_ROUNDS,
} = require('../utils/constants');
const { generateToken } = require('../utils/generateToken');

// Cоздание пользователя
module.exports.createUser = (request, response, next) => {
  const {
    email, password, name, about, avatar,
  } = request.body;

  bcrypt.hash(password, SOLT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => response.status(STATUS_CODE_CREATED).send({
      data: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при создании пользователя: ${error.message}`));
      } else if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(error);
      }
    });
};

// Аутентификация пользователя
module.exports.login = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные email или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password) // сравнивнение пароля и хеша из базы
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные email или пароль'); // хеши не совпали
          }

          const token = generateToken({ _id: user._id });
          response.status(STATUS_CODE_OK).cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            sameSite: true,
            httpOnly: true,
          })
            .send({
              _id: user._id,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
            });
        })
        .catch(next);
    })
    .catch(next);
};

// Возвращение всех пользователей
module.exports.getUsers = (request, response, next) => {
  User.find({})
    .then((users) => response.status(STATUS_CODE_OK).send(users))
    .catch(next);
};

// Поиск пользователя по id
async function findUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    return user;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new BadRequestError(`Некорректный id: ${error.message}`);
    }
    throw error;
  }
}

// Возвращение пользователя по _id
module.exports.getUserById = (request, response, next) => {
  findUser(request.params.userId)
    .then((user) => response.status(STATUS_CODE_OK).send(user))
    .catch(next);
};

// Возвращение информации о текущем пользователе
module.exports.getCurrentUser = (request, response, next) => {
  findUser(request.user._id)
    .then((user) => response.status(STATUS_CODE_OK).send(user))
    .catch(next);
};

// Обновление профиля
module.exports.updateUser = (request, response, next) => {
  const { name, about } = request.body;

  User.findByIdAndUpdate(
    request.user._id,
    { name, about },
    {
      new: true, // передать обновлённый объект на вход обработчику then
      runValidators: true, // валидировать новые данные перед записью в базу
    },
  )
    .orFail(new NotFoundError('Пользователь с указанным id не найден'))
    .then((user) => response.status(STATUS_CODE_OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${error.message}`));
      } else if (error.name === 'CastError') {
        next(new BadRequestError(`Некорректный id: ${error.message}`));
      } else {
        next(error);
      }
    });
};

// Обновление аватара
module.exports.updateAvatar = (request, response, next) => {
  const { avatar } = request.body;

  User.findByIdAndUpdate(
    request.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь с указанным id не найден'))
    .then((user) => response.status(STATUS_CODE_OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении аватара: ${error.message}`));
      } else if (error.name === 'CastError') {
        next(new BadRequestError(`Некорректный id: ${error.message}`));
      } else {
        next(error);
      }
    });
};

module.exports.logout = (request, response, next) => {
  try {
    response.status(STATUS_CODE_OK).clearCookie('jwt')
      .send({ message: 'Успешный выход из учетной записи' });
  } catch (error) {
    next(error);
  }
};
