const db = require('../config/db');
const { z } = require('zod');
const { setUser, getUser, getUserById, updateUserDataBase } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = z.object({
    email: z.string()
        .email("Invalid E-mail, check the '@' "),

    password: z.string()
        .min(8, "You must have 8 caracters in you password")
        .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "You need to put letters and numbers"),

    name: z.string()
        .min(3, "You must have 3 letters in you name"),

})



exports.saveUser = async (req, res) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.format()
        });
    }


    const { name, email, password } = result.data;

    try {
        await setUser(name, email, password);

        return res.status(201).json({
            message: ' You were registered ✅ '
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        })
    }



}


exports.validateUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await getUser(email, password);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )


        return res.status(200).json({
           token,
           user: {
            id: user.id,
            email: user.email
           }
        });
    } catch (error) {
        console.error(error);


        return res.status(500).json({
            mensagem: 'Server Error'
        });
    }
}

exports.getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        return res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}



exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, oldPassword, newPassword } = req.body;

    try {
        const user = await getUserById(userId);

        if (oldPassword || newPassword) {
            const senhaCorreta = await bcrypt.compare(oldPassword, user.password);
            if (!senhaCorreta) {
                return res.status(400).json({ error: "Senha antiga incorreta" });
            }
        }

        const passwordFinal = newPassword
            ? await bcrypt.hash(newPassword, 10)
            : user.password;

        await updateUserDataBase(userId, { name, email, password: passwordFinal });

        return res.status(200).json({ message: "Perfil atualizado ✅" });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}



