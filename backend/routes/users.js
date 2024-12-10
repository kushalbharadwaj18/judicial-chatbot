import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/signup.js';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.post('/signup', async (req, res) => {
    try {
		const { name, email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).send({ message: 'User Already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, password: hashedPassword, email });
		newUser.save();
		return res.status(200).send({ message: 'User Created Successfully', data: newUser });
	} catch (error) {
		res.status(500).send({ message: 'An Error Occurred' });
	}
});
router.post('/login', async (req, res) => {
    try {
		const { email, password } = req.body;
		const data = await User.findOne({ email });
		if (!data) {
			return res.status(404).send({ message: 'Invalid Email' });
		}
		const validPassword = await bcrypt.compare(password, data.password);
		if (!validPassword) {
			return res.status(404).send({ message: 'Invalid Password' });
		}
		const token = jwt.sign({
			id: data._id,
			name: data.name
		}, process.env.SECRET_KEY,
	    { expiresIn: '1d' });
		res.status(200).send({ name: data.name, token: token });
	} catch (error) {
		res.status(500).send({ message: 'An Error Occurred' });
	}
});
router.post('/query', verifyToken, async (req, res) => {
    try {
        // console.log(req.body);
	}
	catch (error) {
        console.log(error);
	}
})
export default router; 