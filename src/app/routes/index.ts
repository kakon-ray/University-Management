import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { StudentRoutes } from '../modules/students/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { CourseRoutes } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route'
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.route'
import { AuthRoutes } from '../modules/Auth/auth.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },

  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})


export default router
