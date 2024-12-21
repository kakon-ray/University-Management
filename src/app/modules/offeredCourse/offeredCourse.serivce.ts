import { semesterRegistrationRoutes } from './../semesterRegistration/semesterRegistration.route';

import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { date } from 'zod';
import { hasTimeConflict } from "./offeredCourse.utils";

// this is professional query builder
const createOfferedCourseFromDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime
  } = payload;

  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(400, "Semester Registration Not Found");
  }

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(400, "Academic Faculty Not Found");
  }

  const isAcademicDepertmentExists = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isAcademicDepertmentExists) {
    throw new AppError(400, "Academic Depertment Not Found");
  }

  const isCourseExists = await Course.findById(
    course
  );

  if (!isCourseExists) {
    throw new AppError(400, "Course Not Found");
  }


  const isFacultyExists = await Faculty.findById(
    faculty
  );

  if (!isFacultyExists) {
    throw new AppError(400, "Faculty Not Found");
  }


  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // if the depertment belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicfaculty: academicFaculty,
  })

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(400, `This ${isAcademicDepertmentExists.name} belong to the ${isAcademicFacultyExists.name}`);
  }

  // cehck it the same offered course same section in same registred semester exists

  const isSameOfferCourseExistsSameSectinSameRegisterSemester = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
  })

  if (isSameOfferCourseExistsSameSectinSameRegisterSemester) {
    throw new AppError(400, "The same offered course same section in same registred semester exists");
  }

  // get the schedules of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days }
  }).select('days startTime endTime')

  console.log(assignSchedules);

  const newShedule = {
    days,
    startTime,
    endTime
  }


  if (hasTimeConflict(assignSchedules, newShedule)) {
    throw new AppError(
      400,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }


  const result = OfferedCourse.create({ ...payload, academicSemester });
  return result;

  // return null
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => { };

const getSingleOfferedCourseFromDB = async (id: string) => { };

const updatedOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {


  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(400, "Offered Course is not exists");
  }

  const isFacultyExists = await Faculty.findById(isOfferedCourseExists.faculty);

  if (!isFacultyExists) {
    throw new AppError(400, "Faculty is not exists");
  }


  // get the schedules of the faculties

  const semesterRegistration = isOfferedCourseExists.semesterRegistration

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `You Can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days }
  }).select('days startTime endTime')

  console.log(assignSchedules);

  const newShedule = {
    days,
    startTime,
    endTime
  }


  if (hasTimeConflict(assignSchedules, newShedule)) {
    throw new AppError(
      400,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }


  const result = await OfferedCourse.findByIdAndUpdate(id, payload, { new: true, })

  return result

};

const deleteOfferedCourseFromDB = async (OfferedCourseId: string) => { };

export const OfferedCourseServices = {
  createOfferedCourseFromDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updatedOfferedCourseFromDB,
};
