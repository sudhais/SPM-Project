import userModel from '../models/userModel.js';

//login callback
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        res.status(200).json({
            succsess:true,
            //error,
            user
        });

    } catch (error) {
        res.status(500).json({
            succsess: false,
            //error
            message: 'Internal Server Error'
        })
    }
};

//Register Callabck
export const registerController = async(req,res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            succsess:true,
            newUser,
        });
    } catch (error) {
        res.status(400).json({
            succsess:false,
            error,
        });
    }
 };

export default { loginController, registerController };
