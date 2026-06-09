const db = require('../config/db');
const { z } = require('zod');

const userSchema = z.object({
    email: z.string("O e-mail deve ser uma string")
        .email("E-mail inválido"),

    password: z.string("A senha deve ser uma string")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex( /^(?=.*[A-Za-z])(?=.*\d).+$/,  "A senha deve conter pelo menos uma letra e um número"),
    
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



