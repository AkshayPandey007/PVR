import userModal from "../schema/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';


const register = async (req, res) => {
  try{
  const { email, password }=req.body
  const emailCheck = await userModal.findOne({ email });
  if (emailCheck)
    return res.json({ message: "Email already used", status: false });
  const hash = await bcrypt.hash(password, 10);
  const user = new userModal({email,password:hash})
  await user.save()
   res.send({msg:"SignUp Success" ,status: true, user})
  }
  catch(err){
  console.log(err)
  res.send({msg:"something went wrong"})
}
}

const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await userModal.findOne({ email });
      if (!user)
        return res.json({ message: "Incorrect Email ", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ message: "Incorrect Password", status: false });
        const token = jwt.sign({name:'bar'} , 'secret' ,{expiresIn:'7d'})
      return res.json({ status: true, user ,token });
    } catch (err) {
      res.send({msg:"something went wrong"})
    }
  
}

const AuthController = {
  register,
  login
};

export default AuthController;



