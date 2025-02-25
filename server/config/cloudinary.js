const cloudinary = require("cloudinary").v2;

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadimageToCloudinary = async (file) => {
  const image = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });

  return image;
};

module.exports = {
  uploadimageToCloudinary,
  cloudinaryConnect,
};
