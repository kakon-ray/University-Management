import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
import config from '../config'

cloudinary.config({
  cloud_name: 'dntmifdnn',
  api_key: '197433579167981',
  api_secret: 'RccqZOWrv1kEris84CXJVMqv5pM',
})

interface CloudinaryUploadResponse {
  url: string
  secure_url?: string
  public_id: string
  [key: string]: any // Other optional properties
}

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result as CloudinaryUploadResponse)
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log('File is deleted.')
          }
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.split('.')[0]
    const uniqueSuffix = originalName + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
