const mongoose = require('mongoose');
const Details = require('../models/detailsModel');
const ApiFeatures = require('../utils/apiFeatures');


//create a new details
exports.createDetails = async (req,res) => {

  try {
    const details = await Details.create(req.body);

    if(!details) {
      return res.status(404).json({
        success: false,
        error: 'failed to create',
      });
    }
    res.status(200).json({
      success: true,
      message: 'successfully created',
      details
    });
    
  } catch (error) {
    res.status(404).json({error:error.message});
    console.log(error);
  }
}

//get all details with search by userID
exports.getAllDetails= async (req,res)=> {

  try {
    const apiFeatures = new ApiFeatures(Details.find().sort({name:-1}), req.query).search()
    const details = await apiFeatures.query;

    if(!details) {
      return res.status(404).json({
        success: false,
        message: 'failed to get the files',
      });
    }
    res.status(200).json({
      success: true,
      count: details.length,
      message: 'successfully got the files',
      details
    });

  } catch (error) {
    res.status(404).json({error:error.message});
    console.log(error);
  }

}

//get a single details
exports.getSingleDetail = async (req,res)=>{

  
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'No such a detail file',
      });
    }

    const details = await Details.findById(id);

    if(!details) {
      return res.status(404).json({
        success: false,
        message: 'No such a detail file',
      });
    }
    res.status(200).json({
      success: true,
      message: 'successfully got a single file',
      details
    });

  } catch (error) {
    res.status(404).json({error:error.message});
    console.log(error);
  }

}

//delete a details
exports.deleteDetails = async (req,res)=>{

  const {id} = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'No such detail file',
      });
    }
    
    const details = await Details.findByIdAndDelete(id);

    if(!details) {
      return res.status(404).json({
        success: false,
        message: 'failed to delete',
      });
    }
    res.status(200).json({
      success: true,
      message: 'successfully deleted',
      details
    });
    
  } catch (error) {
    res.status(404).json({error:error.message});
    console.log(error);
  }
}