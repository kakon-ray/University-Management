import { TAcademicaSemesterCode, TAcademicaSemesterName, TAcademicSemesterNameCodeMapper, TMonths } from "./academicSemester.interface";


export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  export const AcamedicSemesterName : TAcademicaSemesterName[] = [
    'Autumn',
    'Sammar',
    'Fall'
  ]

  export const AcamedicSemesterCode : TAcademicaSemesterCode[] = [
    '01',
    '02',
    '03'
  ]

 export const academicSemesterNameCodeMapper:TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Sammar: '02',
    Fall:'03'
}
