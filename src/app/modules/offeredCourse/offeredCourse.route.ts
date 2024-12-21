import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { createOfferedCourseValidationSchema, OfferedCourseValidations, updateOfferedCourseValidationSchema } from './offeredCourseValidations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get(
  '/:id',
  OfferedCourseController.getSingleOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(
    updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateOfferedCourse,
);

router.get(
  '/:id',
  OfferedCourseController.getSingleOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseController.deleteOfferedCourse,
);

router.get('/', OfferedCourseController.getAllOfferedCourses);

export const OfferedCourseRoutes = router;