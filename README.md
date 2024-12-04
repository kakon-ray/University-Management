### All api and request json data

# http://localhost:5000/api/v1/users/create-student

{
"password": "SecurePass123",
"name": {
"firstName": "John",
"middleName": "Michael",
"lastName": "Doe"
},
"gender": "male",
"email": "john.doe@example.com",
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
"admissionSemester": "674fa6c991902589735b3556",
"profileImage": "https://example.com/profile-image.jpg"
}

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

# http://localhost:5000/api/v1/academic-faculty/create

{
  "name": "John Doe"
}

# http://localhost:5000/api/v1/academic-faculty/get