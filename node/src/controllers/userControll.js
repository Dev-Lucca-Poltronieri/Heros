const db = require('../config/db');
const { z } = require('zod');

const userSchema = z.object({
    email: z.string()
        .email("Invalid E-mail, check the '@' "),

    password: z.string()
        .min(8, "You need to have 8 caracters in you password")
        .regex( /^(?=.*[A-Za-z])(?=.*\d).+$/,  "You need to put letters and numbers"),

    name: z.string("Invalid name") 
            .min(3, "You need to have 3 letters in you name"),
    
})


    
exports.saveUser = async (req, res) => {
    const result = userSchema.safeParse(req.body);

     if (!result.success) {
        return res.status(400).json({
            error: result.error.format()
        });
    }

    
    const {email, password} = result.data;


    try {
            await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password])
            res.status(201).json({message: ' You were registered ✅ '})
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: 'Server Error'
            })
        }
}



