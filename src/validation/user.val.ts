import { body, check, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';


export const signUpVal = [
  body('username').isString().notEmpty().isLength({min: 3, max: 35}).trim().withMessage('Username must be between 3 and 35 characters'),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }).withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number'),
  body('birthdate').isISO8601().withMessage('Birthdate must be a valid ISO8601 date'),
  body('phone').isMobilePhone(['ar-EG']).withMessage('Phone number must be a valid Egyptian phone number'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('userType').not().exists().withMessage('you cant send user type here'),
  validationMiddleware
];

export const createUserVal = [
  body('username').isString().notEmpty().isLength({min: 3, max: 35}).trim().withMessage('Username must be between 3 and 35 characters'),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }).withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number'),
  body('birthdate').isISO8601().withMessage('Birthdate must be a valid ISO8601 date'),
  body('phone').isMobilePhone(['ar-EG']).withMessage('Phone number must be a valid Egyptian phone number'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('userType').optional().isIn(['manager' , 'stuff' , 'user' ]).withMessage('user must by one of this manager stuff user '),
  validationMiddleware
];

export const updateUserVal = [
  param('userId').isMongoId().withMessage('invalid user id format'),
  body('username').optional().isString().notEmpty().isLength({min: 3, max: 35}).trim().withMessage('Username must be between 3 and 35 characters'),
  body('password').optional().isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }).withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number'),
  body('birthdate').optional().isISO8601().withMessage('Birthdate must be a valid ISO8601 date'),
  body('phone').optional().isMobilePhone(['ar-EG']).withMessage('Phone number must be a valid Egyptian phone number'),
  body('email').optional().isEmail().withMessage('email address required'),
  body('userType').optional().isIn(['manager' , 'stuff' , 'user' ]).withMessage('user must by one of this manager stuff user '),
  validationMiddleware
];

export const verifyUserVal = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('code').isLength({min: 6, max: 6}).withMessage('Verification code must be 6 characters long'),
  validationMiddleware
];

export const signInVal = [ // Corrected the name from `sigInVal` to `signInVal`
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').exists().withMessage('Password is required'),
  validationMiddleware
];

export const askForgetPasswordVal = [
  body('email').isEmail().withMessage('Invalid email address'),
  validationMiddleware
];

export const updateForgetPasswordVal = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('newPassword').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }).withMessage('New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number'),
  validationMiddleware
];

export const changePasswordVal = [
  body('oldPassword').exists().withMessage('Old password is required'),
  body('newPassword').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }).withMessage('New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number'),
  validationMiddleware
];

export const updateLoggedUserVal = [
  body('username').optional().isString().notEmpty().isLength({min: 3, max: 35}).trim().withMessage('Username must be between 3 and 35 characters'),
  body('birthdate').optional().isISO8601().withMessage('Birthdate must be a valid ISO8601 date'),
  body('phone').optional().isMobilePhone(['ar-EG']).withMessage('Phone number must be a valid Egyptian phone number'),
  body('email').not().exists().withMessage('Email cannot be updated'),
  body('password').not().exists().withMessage('Password cannot be updated'),
  body('isVerified').not().exists().withMessage('Verification status cannot be updated'),
  check('verificationCode').not().exists().withMessage('Verification code cannot be updated'),
  body('userType').not().exists().withMessage('you cant send user type here'),

  validationMiddleware
];

export const updateEmailVal = [
  body('newEmail').isEmail().withMessage('Invalid email address'),
  validationMiddleware
];

export const resendCodeVal = [
  body('email').isEmail().withMessage('Invalid email address'),
  validationMiddleware
];

export const getUsersVal = [
  query('username')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username must not be empty'),
  query('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address'),
  query('phone')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Phone number must not be empty'),
  query('isVerified')
    .optional()
    .isBoolean()
    .withMessage('isVerified must be a boolean'),
  query('birthdateFrom')
    .optional()
    .isISO8601()
    .withMessage('Birthdate from must be a valid ISO 8601 date'),
  query('birthdateTo')
    .optional()
    .isISO8601()
    .withMessage('Birthdate to must be a valid ISO 8601 date'),
  query('limit').optional().isInt({min:1}).withMessage('Limit must be an integer greater than 0'),
  query('page').optional().isInt({min:1}).withMessage('Page must be an integer greater than 0'),
  validationMiddleware
];

export const deleteUserVal = [
  param('userId').isMongoId().withMessage('invalid user id format'),
  validationMiddleware
];