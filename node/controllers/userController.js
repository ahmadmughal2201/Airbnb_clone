const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const roomModel = require('../models/roomModel');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
})

const upload = multer({storage: storage});

async function addRoom (req, res){
    console.log(req.body);
    //const imageName = req.file.filename;
  
    /*try {
      await Images.create({ image: imageName });
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }*/

    try {
        console.log(req.body);
        const newRoom = await roomModel.create(req.body); // Product here is the schema
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function getUserIdByEmailAndPassword(req,res) {
    const {email, password} = req.body;
    try {
        console.log("In Find")
      // Assuming you have a 'users' collection/model
      const u = await user.findOne({ email, password });
  
      
      return u ? u._id : null;
      // Return the user ID
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Handle or log the error as needed
    }

}

/*async function signUp(req, res) {
    try {
        console.log(req.body);
        const newUser = await user.create(req.body); // Product here is the schema
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function signUp(req, res) {
    try {
        console.log(req.body);
        // Check if a user with the provided email already exists
        const existingUser = await user.findOne({ email: req.body.email });

        if (existingUser) {
            // Email is already registered, return an error response
            return res.status(400).json({ error: "Email is already registered" });
        }

        // If the email is not registered, create a new user
        const newUser = await user.create(req.body); // Assuming "user" is the schema
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}*/

async function signUp(req, res) {
    try {
        console.log(req.body);
        // Check if a user with the provided email already exists
        const existingUser = await user.findOne({ email: req.body.email });

        if (existingUser) {
            // Email is already registered, return an error response
            return res.status(400).json({ error: "Email is already registered" });
        }

        // If the email is not registered, create a new user
        const newUser = await user.create(req.body); // Assuming "user" is the schema
        return res.status(200).json({
            message: 'Signed Up successfully',
            id: newUser._id,
            email: email,
            firstName: newUser.firstName,
            role: newUser.role,
        });
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function logIn(req, res) {
    const { email, password } = req.body;
    try {
        const u = await user.findOne({ email });
        if (!u) return res.status(404).json({ error: 'User not found' });
        if (u.password != password) return res.status(401).json({ error: 'Invalid Credentials' });
        var token = GenerateToken(u);

        return res.status(200).json({
            message: 'Logged in successfull',
            id: u._id,
            email: email,
            firstName: u.firstName,
            role: u.role,
            token: token,
        });
         

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getUserIdByEmail(email) {
    try {
      const User = await user.findOne({ email });
      return User ? User._id : null;
    } catch (error) {
      console.error('Error while fetching user ID:', error);
      throw error;
    }
};

function welcome(req, res) {
    return res.status(200).json({
        message: "Welcome to the DASH BOARD",
    })
}

function GenerateToken(us) {
    const payload = {
        role: us.role,
        id: us._id,
    };

    const token = jwt.sign(payload, 'adsfasdfjkh$#asdfasdf.adsfxc');
    return token;
}




async function comparePassword(p1, p2) {
    if (p1 == p2) {
        return true;
    }
    return false;
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await user.findByIdAndRemove(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function allUsers(req, res) {
    try {
        const users = await user.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updateU = await user.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateU);
    }
    catch (error) {
        console.error("Error in update api:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
          toast.error("Someething Went Wrong");
    }
}

async function updateCard(req, res){
    try{
        const{ id } = req.params;
        const updateP = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updateP); 
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

/*async function createCard(req, res) {
    try {
        console.log(req.body);
        const newProduct = await Product.create(req.body); // Product here is the schema
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function updateCard(req, res){
    try{
        const{ id } = req.params;
        const updateP = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updateP); 
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

async function getAllCards(req,res){
    try{
        const cards = await Product.find();
        res.json(cards);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

async function deleteCard(req,res){
    try{
        const{ id } = req.params;
        await Product.findByIdAndRemove(id);
        res.sendStatus(204);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
*/
module.exports = {
    signUp,
    logIn,
    allUsers,
    updateUser,
    deleteUser,
    welcome,
    addRoom,
    getUserIdByEmailAndPassword
}
