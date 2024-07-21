import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';
import { PlanTypes } from '../models/plan.model';





export const createPlanVal = [
  body('title').isString().exists().bail(),
  body('birthDay.price').isInt({min:1}).bail(),
  body('type').custom(val=>{
    if (val === PlanTypes.birthDay) return true;
    throw new Error(`can not create only ${PlanTypes.birthDay}`);
  }),
  validationMiddleware
];


// export const updatePlanVal = [
//   param('planId').isMongoId().bail,
//   body('title').optional().isString().exists().bail(),
//   body('type').optional().isIn(Object.values(PlanTypes)).custom((val) => {
//     if (val === PlanTypes.shared) {
//       return [
//         body('shared.hourOne').isInt({min:1}).bail().optional().withMessage('hourOne must be a number'),
//         body('shared.hourTwo').isInt({min:1}).bail().optional().withMessage('hourTwo must be a number'),
//         body('shared.hourThree').isInt({min:1}).bail().optional().withMessage('hourThree must be a number'),
//         body('shared.hourFour').isInt({min:1}).bail().optional().withMessage('hourFour must be a number'),
//       ];
//     }
  
//     if (val === PlanTypes.private) {
//       return [
//         body('private.price').isInt({min:1}).bail().optional().withMessage('price must be a number'),
//       ];
//     }
  
//     if (val === PlanTypes.birthDay) {
//       return [
//         body('birthDay.price').isInt({min:1}).bail().optional().withMessage('price must be a number'),
//       ];
//     }
  
//     return true;
//   }),
//   validationMiddleware
// ];


export const updatePlanVal = [
  param('planId').isMongoId(),
  body('title').optional().isString().exists(),
  body('type').optional().isIn(Object.values(PlanTypes)).custom((val, { req }) => {
    const requestBodyKeys = Object.keys(req.body);
  
    if (val === PlanTypes.shared) {
      if (requestBodyKeys.some(key => key.startsWith('private') || key.startsWith('birthDay'))) {
        throw new Error('Invalid fields for type shared');
      }
      return [
        body('shared.hourOne').isInt({min:1}).bail().optional().withMessage('hourOne must be a number'),
        body('shared.hourTwo').isInt({min:1}).bail().optional().withMessage('hourTwo must be a number'),
        body('shared.hourThree').isInt({min:1}).bail().optional().withMessage('hourThree must be a number'),
        body('shared.hourFour').isInt({min:1}).bail().optional().withMessage('hourFour must be a number'),
      ];
    }
  
    if (val === PlanTypes.private) {
      if (requestBodyKeys.some(key => key.startsWith('shared') || key.startsWith('birthDay'))) {
        throw new Error('Invalid fields for type private');
      }
      return [
        body('private.price').isInt({min:1}).bail().optional().withMessage('price must be a number'),
      ];
    }
  
    if (val === PlanTypes.birthDay) {
      if (requestBodyKeys.some(key => key.startsWith('shared') || key.startsWith('private'))) {
        throw new Error('Invalid fields for type birthDay');
      }
      return [
        body('birthDay.price').isInt({min:1}).bail().optional().withMessage('price must be a number'),
      ];
    }
  
    return true; 
  }),
  validationMiddleware
];

export const getPlan = [
  param('planId').isMongoId().bail(),
  validationMiddleware
];


export const getAll = [
  query('limit').optional().isInt({min:1}).bail(),
  query('page').optional().isInt({min:1}).bail(),
  query('type').optional().isIn(Object.values(PlanTypes)),
  validationMiddleware
];