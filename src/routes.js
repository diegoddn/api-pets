import { Router } from 'express';
import { pets } from './pets.js'
import { randomUUID } from 'crypto';
import { validarPet } from './middlewares.js';
const routes = Router();

// GET /pets - Listar pets
routes.get('/pets', (req, res) => {
    try {
        return res.json({
        ok: true,
        messagem: "Pets listados com sucesso",
        dados: pets
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            messagem: "Erro ao listar pets"
        })
    }
})

// POST /pets - Criar um pet
routes.post('/pets', [validarPet], (req, res) => {
    try {
        // 1- Entrada de dados
        const body = req.body;

        const novoPet = { 
            id: randomUUID(), 
            nome: body.nome, 
            raca: body.raca,
            idade: body.idade,
            tutor: body.tutor
        };

        // 2- Processamento
        pets.push(novoPet);

        // 3- Saida
        return res.status(201).json({
            ok: true,
            messagem: "Pet criado com sucesso",
            dados: pets
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            messagem: "Erro ao criar pet"
        })
    }
})

// GET /pets/:id - Obter um pet por ID
routes.get('/pets/:id', (req, res) => {
    try {
        const { id } = req.params;
        const pet = pets.find(p => p.id === id);

        if (!pet) {
            return res.status(404).json({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

        return res.json({
            ok: true,
            messagem: "Pet obtido com sucesso",
            dados: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            messagem: "Erro ao buscar pet"
        });
    }
})

//PUT /pets/:id - Atualizar um pet por ID
routes.put('/pets/:id', [validarPet], (req, res) => {
    try {
        const { id } = req.params;
        const {nome, raca, idade, tutor} = req.body;

        const pet = pets.find(p => p.id === id);
        if (!pet) {
            return res.status(404).json({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

        pet.nome = nome;
        pet.raca = raca;
        pet.idade = idade;
        pet.tutor = tutor;

        return res.json({
            ok: true,
            messagem: "Pet atualizado com sucesso",
            dados: pet
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            messagem: "Erro ao atualizar pet"
        });
    }
})

// DELETE /pets/:id - Excluir um pet por ID
routes.delete('/pets/:id', (req, res) => {
    try {
        const { id } = req.params;
        const petIndex = pets.findIndex(p => p.id === id);

        if (petIndex < 0) {
            return res.status(404).json({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

        pets.splice(petIndex, 1);

        return res.json({
            ok: true,
            messagem: "Pet excluído com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            messagem: "Erro ao excluir pet"
        });
    }
})

export default routes;