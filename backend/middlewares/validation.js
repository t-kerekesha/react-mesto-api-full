const { celebrate, Joi } = require('celebrate');
const { regExpUrl } = require('../utils/constants');

const validateEmailPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Необходимо указать email',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Пароль не может быть пустым',
      'any.required': 'Необходимо ввести пароль',
    }),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Необходимо указать email',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Пароль не может быть пустым',
      'any.required': 'Необходимо ввести пароль',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля - 2 символа',
      'string.max': 'Максимальная длина поля - 30 символа',
      'string.empty': 'Поле не может быть пустым',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля - 2 символа',
      'string.max': 'Максимальная длина поля - 30 символа',
      'string.empty': 'Поле не может быть пустым',
    }),
    avatar: Joi.string().pattern(regExpUrl)
      .message('Не валидный url-адрес')
      .messages({
        'string.empty': 'Url-адрес не может быть пустым',
      }),
  }),
});

const validateNameAbout = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2 символа',
        'string.max': 'Максимальная длина поля - 30 символа',
        'string.empty': 'Поле не может быть пустым',
        'any.required': 'Необходимо указать имя пользователя',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2 символа',
        'string.max': 'Максимальная длина поля - 30 символа',
        'string.empty': 'Поле не может быть пустым',
        'any.required': 'Необходимо ввести описание',
      }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpUrl)
      .message('Не валидный url-адрес')
      .messages({
        'string.empty': 'Url-адрес не может быть пустым',
      }),
  }),
});

const validateNameLink = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2 символа',
        'string.max': 'Максимальная длина поля - 30 символа',
        'string.empty': 'Поле не может быть пустым',
        'any.required': 'Необходимо ввести название карточки',
      }),
    link: Joi.string().required().pattern(regExpUrl)
      .message('Не валидный url-адрес')
      .messages({
        'string.empty': 'Url-адрес не может быть пустым',
        'any.required': 'Необходимо ввести ссылку на картинку',
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex()
      .messages(({
        'string.hex': 'Невалидный id пользователя',
        'string.length': 'Невалидный id пользователя',
      })),
  }),
});

const validateСardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex()
      .messages(({
        'string.hex': 'Невалидный id карточки',
        'string.length': 'Невалидный id карточки',
      })),
  }),
});

module.exports = {
  validateEmailPassword,
  validateUserData,
  validateNameAbout,
  validateAvatar,
  validateNameLink,
  validateUserId,
  validateСardId,
};
