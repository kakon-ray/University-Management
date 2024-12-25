### All api and request json data

# http://localhost:5000/api/v1/students

# http://localhost:5000/api/v1/students/2024020001 // delete request use id

<!-- How to do raw filtering ,sorting and limiting start -->

# http://localhost:5000/api/v1/students?limit=1

# http://localhost:5000/api/v1/students?page=1&limit=1

# http://localhost:5000/api/v1/students?searchTerm=Kakon&email=kaonray.cse@gmail.com

# http://localhost:5000/api/v1/students?fields=name,email

# http://localhost:5000/api/v1/students?sort=name,dateOfBirth

# http://localhost:5000/api/v1/students?fields=name,email&page=1&limit=2

<!-- How to do raw filtering ,sorting and limiting end -->

# http://localhost:5000/api/v1/students/67507059b0171e1fc4adb092 //get single student use id

# http://localhost:5000/api/v1/students/2024020001 //update student use id

{
"student":{
"email": "kaonray.cse@gmail.com"
}
}

# http://localhost:5000/api/v1/users/create-student

{
"password": "SecurePass123",
"name": {
"firstName": "John",
"middleName": "Michael",
"lastName": "Doe"
},
"gender": "male",
"email": "john.doe3@example.com",
"dateOfBirth": "2000-05-15",
"contactNo": "0123456789",
"emerganceyContactNo": "0987654321",
"bloodGroop": "A+",
"presentAddress": "123 Main Street, Springfield",
"permanentAddress": "456 Elm Street, Springfield",
"guardian": {
"fatherName": "Robert Doe",
"fatherOccupation": "Engineer",
"fatherContactNo": "01122334455",
"motherName": "Jane Doe",
"motherOccupation": "Teacher",
"motherContactNo": "01155667788"
},
"localGuardian": {
"name": "Uncle Ben",
"occupation": "Businessman",
"contactNo": "02233445566",
"address": "789 Oak Street, Springfield"
},
"admissionSemester": "674fe1db79eda92c6f1458e0",
"academicDepartment": "67502d8f7fa34ea8457115ec",
"profileImage": "https://example.com/profile-image.jpg"
}

### Academic Semester

# http://localhost:5000/api/v1/academic-semester/create

{
"name": "Fall",
"year": "2024",
"code": "03",
"startMonth": "August",
"endMonth": "December"
}

# http://localhost:5000/api/v1/academic-semester/update/674fa6c991902589735b3556

{
"name": "Fall",
"year": "2024",
"code": "03",
"startMonth": "August",
"endMonth": "December"
}

# http://localhost:5000/api/v1/academic-semester/get

# http://localhost:5000/api/v1/academic-semester/get/674f83da735221c8085f0a38

### Academic Faculty

# http://localhost:5000/api/v1/academic-faculty/create-faculty

{
"name":"Kakon 2"
}

# http://localhost:5000/api/v1/academic-faculty/get

# http://localhost:5000/api/v1/academic-faculty/get/67500d26d9bf0f4b2c9cc218

# http://localhost:5000/api/v1/academic-faculty/update/F-0001

{
"name": "John Doe"
}

### Academic Department

# http://localhost:5000/api/v1/academic-department/get

# http://localhost:5000/api/v1/academic-department/create

{
"name": "John Doe",
"academicfaculty": "67500d26d9bf0f4b2c9cc218"
}

# http://localhost:5000/api/v1/academic-department/get/67502d3f1ed03efdd647a86e

# http://localhost:5000/api/v1/academic-department/update/67502d3f1ed03efdd647a86e (Patch Request)

{
"name": "Kakon",
"academicfaculty": "675014aa751883d502ec975a"
}

# Faculty Routes

## http://localhost:5000/api/v1/users/create-faculty

{

    "password": "securePass123",
    "faculty": {
      "designation": "Professor",
      "name": {
        "firstName": "Dddd dfgs",
        "middleName": "A.asdf",
        "lastName": "Dddfasd"
      },
      "gender": "male",
      "dateOfBirth": "1980-01-15",
      "email": "john44a4sdf.doe@example.com",
      "contactNo": "1234567890",
      "emergencyContactNo": "0987654321",
      "bloodGroup": "A+",
      "presentAddress": "123 Main Street, Cityville",
      "permanentAddress": "456 Elm Street, Hometown",
      "academicDepartment": "63f76c9c2f1b4c6f7a3f0b23",
      "profileImg": "https://example.com/images/john_doe.png"
    }

}

## http://localhost:5000/api/v1/faculty

<!-- single faculty -->

## http://localhost:5000/api/v1/faculty/F-0002

<!-- delete -->

## http://localhost:5000/api/v1/faculty/F-0002

## http://localhost:5000/api/v1/faculty?page=1&limit=2

<!--  ======================= Admin Routes ======================-->

## http://localhost:5000/api/v1/users/create-admin

{

    "password": "adminSecurePass123",
    "admin": {
      "designation": "Superintendent",
      "name": {
        "firstName": "John d",
        "middleName": "A.",
        "lastName": "Doe"
      },
      "gender": "male",
      "dateOfBirth": "1985-05-15",
      "email": "jodhsn.ddoe@example.com",
      "contactNo": "1234567890",
      "emergencyContactNo": "0987654321",
      "bloodGroup": "O+",
      "presentAddress": "123 Main Street, Cityville",
      "permanentAddress": "456 Elm Street, Hometown",
      "profileImg": "https://example.com/images/john_doe_profile.png"
    }

}

## http://localhost:5000/api/v1/admin

## http://localhost:5000/api/v1/admin/A-0001

<!-- update admin -->

## http://localhost:5000/api/v1/admin/A-0001

{

    "admin": {
      "designation": "Engineer",
      "name": {
        "firstName": "Kakon",
        "middleName": "A.",
        "lastName": "Doe"
      }
    }

}

## http://localhost:5000/api/v1/admin/A-0001

<!-- ============ Course Route ================ -->

## http://localhost:5000/api/v1/course/create

{
"course": {
"title": "Introduction to Programming",
"prefix": "CS",
"code": 101,
"credits": 3,
"preRequisiteCourses": [
{
"course": "6757e3e1b21dd10ed04dada0",
"isDeleted": false
}
],
"isDeleted": false
}
}

## http://localhost:5000/api/v1/course

<!-- get single course -->

## http://localhost:5000/api/v1/course/6757e40eb21dd10ed04dada2

<!-- course delete -->

## http://localhost:5000/api/v1/course/6757e3e1b21dd10ed04dada0

<!-- course update -->

## http://localhost:5000/api/v1/course/675829bcb1fcfcad9eeaf2c8

{
"course": {
"title": "Full Stack Web Developement",
"prefix": "CS",
"code": 343,
"preRequisiteCourses": [
{
"course": "675828c1b1fcfcad9eeaf2b7",
"isDeleted": false
}
]
}
}

<!-- put request -->

## http://localhost:5000/api/v1/course/675829bcb1fcfcad9eeaf2c8/assign-faculties

{
"faculties":["675730b86d68eb73bbca691b","67572a8c1625657f3142a4d5"]
}

<!-- delete course faculty -->

## http://localhost:5000/api/v1/course/675829bcb1fcfcad9eeaf2c8/remove-faculties

{
"faculties":["675730b86d68eb73bbca691b"]
}


<!-- ============== Semester Registration =================== -->

## http://localhost:5000/api/v1/semester-registration/create

{
  "academicSemester": "674fa6c991902589735b3556",
  "status": "UPCOMING",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-05-15T00:00:00Z",
  "minCredit": 3,
  "maxCredit": 15
}

## http://localhost:5000/api/v1/semester-registration

## http://localhost:5000/api/v1/semester-registration/67642cde0ea024ee0157c002



<!-- offered course created successfully -->

## http://localhost:5000/api/v1/offered-course/create

{
  "semesterRegistration": "67642cde0ea024ee0157c002",
  "academicSemester": "674fa6c991902589735b3556",
  "academicFaculty": "675721639c363f54158dbd15",
  "academicDepartment": "675414ba9e1ce3730845937a",
  "course": "675828c1b1fcfcad9eeaf2b7",
  "faculty": "675730b86d68eb73bbca691b",
  "maxCapacity": 40,
  "section": 16,
  "days": ["Sat", "Tue"],
  "startTime": "20:00",
  "endTime": "21:30"
}

## http://localhost:5000/api/v1/offered-course/67642cde0ea024ee0157c002
{

  "faculty": "675730b86d68eb73bbca691b",
  "days": ["Sat", "Tue"],
  "startTime": "20:00",
  "endTime": "21:30"
}

## http://localhost:5000/api/v1/auth/login
http://localhost:5000/api/v1/faculty       // test
{
  "id": "A-0001",
  "password":"kakonray1234"
}


## http://localhost:5000/api/v1/auth/change-password

{
    "oldPassword" : "kakonray1234",
    "password": "kakonray1235"
}

## http://localhost:5000/api/v1/auth/refresh-token
