const { uploadimageToCloudinary } = require("../config/cloudinary");
const Property = require("../model/Property");

const addProperty = async (req, res) => {
  try {
    const { name, desc, address, lat, lon } = req.body;

    if (!name || !desc || !address || !lat || !lon) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!req.files || !req.files.propertyImage) {
      return res.status(400).json({ error: "Property image is required." });
    }

    const propertyImage = req.files.propertyImage;
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!fileTypes.includes(propertyImage.mimetype)) {
      return res.status(400).json({
        error:
          "Invalid file type. Only JPEG, PNG, and JPG formats are allowed.",
      });
    }

    const cloudFile = await uploadimageToCloudinary(propertyImage.tempFilePath);

    const newLat = parseFloat(lat);
    const newLon = parseFloat(lon);

    const newProperty = await Property.create({
      name,
      address,
      img: {
        url: cloudFile.secure_url,
        label: propertyImage.name,
      },
      description: desc,
      coordinates: {
        lat: newLat,
        lon: newLon,
      },
    });

    if (!newProperty) {
      return res.status(400).json({ error: "Failed to add property." });
    }

    const properties = await Property.find({});

    return res.status(200).send({
      success: true,
      message: "Property added successfully",
      property: properties,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Property ID is required." });
    }

    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Property not found." });
    }

    const newProperty = await Property.find({});

    return res.status(200).send({
      success: true,
      message: "Property deleted.",
      property: newProperty,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).send({
      success: true,
      message: "All properties",
      properties,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { addProperty, deleteProperty, showAllProperties };
