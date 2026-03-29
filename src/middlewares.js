import { pets } from './pets.js';

export const validarCampoPet = (req, res, next) => {
try {
    const { nome, raca, idade, nomeTutor } = req.body;

    if (!nome) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo nome não foi informado"
        });
    }

    if (!raca) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo raca não foi informado"
        });
    }
    if (!idade) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo idade não foi informado"
        });
    }
    if (!nomeTutor) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo nomeTutor não foi informado"
        });
    }

    next();
} catch (error) {
    res.status(500).send({
        ok: false,
        messagem: error.toString()
    });
}
};