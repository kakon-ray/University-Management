import { TAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.model"

const createAcademicDepartmentFromDB = async (
    academicDepartmentData: TAcademicDepartment,
  ) => {
    const academicDepartment = await AcademicDepartment.create(academicDepartmentData)
    return academicDepartment
  }


  const getAcademicDepartmentFromDB = async () => {
    const academicDepartment = await AcademicDepartment.find()
    return academicDepartment
  }


  const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const academicDepartment = await AcademicDepartment.findById({ _id: id })
    return academicDepartment
  }
  
  
  const updateAcademicDepartmentFromDB = async (
    id: string,
    payload: TAcademicDepartment,
  ) => {
 
    const academicDepartment = await AcademicDepartment.findById({ _id: id })
  
    if (!academicDepartment) {
      throw new Error(`Academic Department with id ${id} not found`)
    }
  
    academicDepartment.name = payload.name
    academicDepartment.academicfaculty = payload.academicfaculty
    await academicDepartment.save()
  
    return academicDepartment
  }
  

export const AcademicDepartmentService = {
    createAcademicDepartmentFromDB,
    getAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB
}
