import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationFromDB(
      req.body
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Create Semester Registration Successfully!",
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Get Semester Registration Successfully!",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req:Request, res:Response) => {
  const {id} = req.params;

  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Get Single Semester Registration Successfully!",
      data: result,
    });
});

const deleteSemesterRegistration = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result =
    await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(
      studentId
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Delete Semeter Registration Successfully!",
    data: result,
  });
});

const updateSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const {id} = req.params;


    const result =
      await SemesterRegistrationServices.updatedSemesterRegistrationFromDB(
        id,
        req.body
      );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Semester Registration Successfully!',
    data: result,
  })
  }
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  deleteSemesterRegistration,
  updateSemesterRegistration,
};
