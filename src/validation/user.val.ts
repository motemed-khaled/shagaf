import { body, check, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';




export const signUpVal = [
  body('username').isString().notEmpty().isLength({min:3 , max:35}).trim(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  body('birthdate').isISO8601(),
  body('phone').isMobilePhone(['ar-EG']),
  body('email').isEmail(),
  validationMiddleware
];

export const verifyUserVal = [
  body('email').isEmail(),
  body('code').isLength({min:6 , max:6}),
  validationMiddleware
];

export const sigInVal = [
  body('email').isEmail(),
  body('password').exists(),
  validationMiddleware
];

export const askForgetPasswordVal = [
  body('email').isEmail(),
  validationMiddleware
];

export const UpdateForgetPasswordVal = [
  body('email').isEmail(),
  body('newPassword').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  validationMiddleware
];

export const changePasswordVal = [
  body('oldPassword').exists(),
  body('newPassword').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  validationMiddleware
];

export const updateLoggedUserVal = [
  body('username').optional().isString().notEmpty().isLength({min:3 , max:35}).trim(),
  body('birthdate').optional().isISO8601(),
  body('phone').optional().isMobilePhone(['ar-EG']),
  body('email').not().exists(),
  body('password').not().exists(),
  body('isVerified').not().exists(),
  check('verificationCode').not().exists(),
  validationMiddleware
];

export const updateEmailVal = [
  body('newEmail').isEmail(),
  validationMiddleware
];

export const resendCodeVal = [
  body('email').isEmail(),
  validationMiddleware
];

export const getUsersVal = [
  query('username')
    .optional()
    .isString()
    .withMessage('Username must be a string')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username cannot be empty'),

  query('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address'),

  query('phone')
    .optional()
    .isString()
    .withMessage('Phone must be a string')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Phone cannot be empty'),

  query('isVerified')
    .optional()
    .isBoolean()
    .withMessage('isVerified must be a boolean'),

  query('birthdateFrom')
    .optional()
    .isISO8601()
    .withMessage('birthdateFrom must be a valid ISO 8601 date'),

  query('birthdateTo')
    .optional()
    .isISO8601()
    .withMessage('birthdateTo must be a valid ISO 8601 date'),
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];