import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { errorResponse } from '../utils/response';

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {

      const flattenedErrors = result.error.flatten();
      let topLevelMessage = 'Validation failed. Please check your input.';


      if (flattenedErrors.formErrors.length > 0) {
        topLevelMessage = flattenedErrors.formErrors[0];
      } else if (Object.keys(flattenedErrors.fieldErrors).length > 0) {
        const firstField = Object.keys(flattenedErrors.fieldErrors)[0];
        if (firstField && flattenedErrors.fieldErrors[firstField] && flattenedErrors.fieldErrors[firstField].length > 0) {
          topLevelMessage = `${firstField}: ${flattenedErrors.fieldErrors[firstField][0]}`;
        }
      }

      res.status(400).json(errorResponse(topLevelMessage, flattenedErrors));
      return;
    }

    req.body = result.data;
    next();
  };
};
