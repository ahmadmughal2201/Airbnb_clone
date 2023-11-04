const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
    try {
        console.log(req.body);
        const newUser = await user.create(req.body); // Product here is the schema
        res.status(201).json(newUser);
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
            email: email,
            firstName: u.firstName,
            role: u.role,
            token: token,
        });
         

    } catch (error) {
        res.status(500).json({ message: error.message });
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
    catch (err) {
        res.status(500).json({ error: err.message });
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
    welcome
}
