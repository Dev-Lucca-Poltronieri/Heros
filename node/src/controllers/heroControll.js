const db = require('../config/db');
const { z } = require('zod');

const heroSchema = z.object({
    nome: z.string("The 'name' Needes to be a string"),
    classe: z.string().min(3, "The 'class' Request min. 3  lyrics . Needs to be a string"),
    status: z.string("The 'status' Needes to be a string"),
    // imagem: z.string()
})

exports.heroRegister = async (req, res) => { // precisa inserir a fk do usuario tambem - pegar do local storage
    const result = heroSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.format()
        });
    }

    const {nome, classe, status, imagem} = result.data;

    try {
        await db.query("INSERT INTO heros (nome, classe, status, imagem) VALUES (?, ?, ?, ?)", [nome, classe, status, imagem])
        res.status(201).json({message: '✅ Hero registered successfully'})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Server Error'
        })
    }
    
}

exports.deleteHero = async (req, res) => {

    const { id } = req.params;
    try {

        await db.query(
            "UPDATE heros SET render = ? WHERE id = ?",
            [false, id]
        );

        res.status(200).json({
            message: 'Hero was Deleted'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: 'Server Error'
        });

    }

}

exports.updateHero = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        await db.query("UPDATE heros SET status = (?) WHERE id = (?) ", [status, id])
        res.status(201).json({message: '✅ Hero was updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).error.json()
    }
}

exports.getHero = async (req, res) => {
    const {userId} = req.params
    try {
        const [rows] = await db.query("SELECT id, nome, classe, status FROM heros WHERE render = true and fk_usuarioId = ? ", [userId])

        return res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500).error.json({
            error: 'Server error'
        })
        
    }
    
}

