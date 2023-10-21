import { Types } from 'mongoose';
import Details from '../models/detailsModel.js';
import ApiFeatures from '../utils/apiFeatures.js';


//create a new details
export async function createDetails(req,res) {

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
export async function getAllDetails(req,res) {

  try {
    // console.log(req.query.keyword1);
    const apiFeatures = new ApiFeatures(Details.find().sort({projName:-1}), req.query).search()
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
export async function getSingleDetail(req,res){

  
  try {
    const {id} = req.params;
    if(!Types.ObjectId.isValid(id)) {
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
export async function deleteDetails(req,res){

  const {id} = req.params;
  try {
    if(!Types.ObjectId.isValid(id)) {
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