import express, {
    RequestHandler,
    Request,
    Response,
  } from "express";
  import catchAsync from "../../utils/catchAsync";
  import { StatusCodes } from "http-status-codes";
  import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.serivce";
  
  const createOfferedCourse = catchAsync(async (req, res, next) => {
    const result =
      await OfferedCourseServices.createOfferedCourseFromDB(
        req.body
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Create Semester Registration Successfully!",
      data: result,
    });
  });
  
  const getAllOfferedCourses = catchAsync(async (req, res, next) => {
    const result =
      await OfferedCourseServices.getAllOfferedCourseFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Get Semester Registration Successfully!",
      data: result,
    });
  });
  
  const getSingleOfferedCourse = catchAsync(async (req:Request, res:Response) => {
    const {id} = req.params;
  
    const result =
      await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Get Single Semester Registration Successfully!",
        data: result,
      });
  });
  
  const deleteOfferedCourse = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;
    const result =
      await OfferedCourseServices.deleteOfferedCourseFromDB(
        studentId
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Delete Semeter Registration Successfully!",
      data: result,
    });
  });
  
  const updateOfferedCourse: RequestHandler = catchAsync(
    async (req, res, next) => {
      const {id} = req.params;
  
  
      const result =
        await OfferedCourseServices.updatedOfferedCourseFromDB(
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
  
  export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    deleteOfferedCourse,
    updateOfferedCourse,
  };
  