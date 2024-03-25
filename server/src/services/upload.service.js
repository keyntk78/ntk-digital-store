const cloudinary = require('~/configs/cloudinary2.config')

const uploadImageFromUrl = async () => {
  try {
    const urlImage =
      'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg'
    const folderName = 'digital_store',
      newfilename = 'demo'

    const rs = await cloudinary.uploader.upload(urlImage, {
      folder: folderName
    })
    console.log(rs)
  } catch (error) {
    throw new Error(error)
  }
}

//2. upload image form local
const uploadImageFromLocal = async ({ path, foldername = 'digital_store' }) => {
  try {
    const rs = await cloudinary.uploader.upload(path, {
      folder: foldername
    })
    return rs.secure_url
  } catch (error) {
    throw new Error(error)
  }
}

const uploadImageFromLocalFiles = async ({
  files,
  foldername = 'digital_store'
}) => {
  try {
    if (!files.length) return
    const uploadUrlds = []
    for (const file of files) {
      const rs = await cloudinary.uploader.upload(file.path, {
        folder: foldername
      })
      uploadUrlds.push(rs.secure_url)
    }

    return uploadUrlds
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  uploadImageFromLocal,
  uploadImageFromLocalFiles
}
