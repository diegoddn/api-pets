import { pets } from './pets.js';

export const validarCampoPet = (req, res, next) => {
try {
    const { nome, raca, idade, nomeTutor } = req.body;

    if (!nome) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo nome é obrigatório"
        });
    }

    if (!raca) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo raca é obrigatório"
        });
    }
    if (!idade) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo idade é obrigatório"
        });
    }
    if (!nomeTutor) {
        return res.status(400).json({
            ok: false,
            messagem: "O campo nomeTutor é obrigatório"
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