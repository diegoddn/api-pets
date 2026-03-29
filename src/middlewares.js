import { pets } from './pets.js';

export const validarPet = (req, res, next) => {
    const { nome, raca, idade, tutor } = req.body;

    if (!nome || !raca || !idade || !tutor) {
        return res.status(400).json({
            ok: false,
            messagem: "Todos os campos são obrigatórios"
        });
    }

    next();
};