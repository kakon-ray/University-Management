import { Date } from 'mongoose'

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicaSemesterName = 'Autumn' | 'Sammar' | 'Fall'

export type TAcademicaSemesterCode = '01' | '02' | '03'

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string
}

export type TAcademicSemester = {
  name: TAcademicaSemesterName
  year: string
  code: TAcademicaSemesterCode
  startMonth: TMonths
  endMonth: TMonths
}
