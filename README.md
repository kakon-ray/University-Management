### All api and request json data

# http://localhost:5000/api/v1/students/student-get

# http://localhost:5000/api/v1/students/2024020001 // delete request

# http://localhost:5000/api/v1/students/67507059b0171e1fc4adb092

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

# http://localhost:5000/api/v1/academic-faculty/create

{
"name": "John Doe"
}

# http://localhost:5000/api/v1/academic-faculty/get

# http://localhost:5000/api/v1/academic-faculty/get/67500d26d9bf0f4b2c9cc218

# {{ph-local-url}}/academic-faculty/update/675014aa751883d502ec975a

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
