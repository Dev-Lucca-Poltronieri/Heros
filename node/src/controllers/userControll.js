const db = require('../config/db');
const { z } = require('zod');

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


    const { email, password, name } = result.data;


    try {
        await db.query("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, password, name])
        res.status(201).json({ message: ' You were registered ✅ ' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Server Error'
        })
    }
}


exports.validateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query(
            'select * from users where email = ? and password = ?',
            [email, password]
        )

        if (users.length === 0) {
            return res.status(401).json({
                mensagem: 'Invalid Login'
            })
        }


        return res.status(200).json({
            userId: users[0].id
        });
    } catch (error) {
        console.error(error);


        return res.status(500).json({
            mensagem: 'Server Error'
        });
    }
}



