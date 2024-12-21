import path from "path";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../users/user.model";
import { object } from "zod";
import QueryBuilder from "../../builder/QueryBuilder";
import { SemesterRegistration } from "./semesterRegistration.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";

// this is professional query builder
const createSemesterRegistrationFromDB = async (
  payload: TSemesterRegistration
) => {

  // check if theare any registered semester that is already "UPCOMMING" | "ONGOING"
  const isThereAnyUpcommingOrOngogingSemester = await SemesterRegistration.findOne({
    $or:[
      {status:"UPCOMING"},
      {status:"ONGOING"}
    ]
  })

  if(isThereAnyUpcommingOrOngogingSemester){
    throw new AppError(400, `There is already running ${isThereAnyUpcommingOrOngogingSemester.status}`);
  }
  const academicSemester = payload?.academicSemester;

  // check if the semester is exists
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(404, "The Academic Semester not Found");
  }

  // check Already Exists Semester Registration
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(422, "Already Exists Semester Registration");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const SemesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query)
  .filter()
  .sort()
  .paginate()
  .fields()

  const result = await SemesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (
  id: string
) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updatedSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const requestedSemesterStatus = await SemesterRegistration.findById(id)

  // Check if the semester is alredy registered
  if(!requestedSemesterStatus){
    throw new AppError(400,'Semester registration not found');
  }

   if(requestedSemesterStatus?.status === RegistrationStatus.ENDED){
     throw new AppError(400,'The Semester requested already ended');
   }

  //  Upcomming --> Ongoing --> Ended

  if(requestedSemesterStatus?.status === RegistrationStatus.UPCOMING && payload?.status === RegistrationStatus.ENDED){
    throw new AppError(400,`You can not directly status form ${requestedSemesterStatus?.status} to ${payload?.status}`);
  }

  if(requestedSemesterStatus?.status === RegistrationStatus.ONGOING && payload?.status === RegistrationStatus.UPCOMING){
    throw new AppError(400,`You can not directly status form ${requestedSemesterStatus?.status} to ${payload?.status}`);
  }

  const result = SemesterRegistration.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
  return result;

};

const deleteSemesterRegistrationFromDB = async (
  SemesterRegistrationId: string
) => {};

export const SemesterRegistrationServices = {
  createSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB,
  updatedSemesterRegistrationFromDB,
};
