import { Router } from 'express';
import { pets } from './pets.js'
import { randomUUID } from 'crypto';
import { validarPet } from './middlewares.js';
const routes = Router();

// GET /pets - Listar pets
routes.get('/pets', (req, res) => {
    try {
        res.status(200).send({
        ok: true,
        messagem: "Pets listados com sucesso",
        dados: pets
    })
    } catch (error) {
        console.error(error);
            res.status(500).send({
            ok: false,
            messagem: error.toString()
        })
    }
})

// POST /pets - Criar um pet
routes.post('/pets', [validarPet], (req, res) => {
    try {
        // 1- Entrada de dados
        const { nome, raca, idade, nomeTutor} = req.body;

        const novoPet = { 
            id: randomUUID(), 
            nome, 
            raca,
            idade,
            nomeTutor
        };

        // 2- Processamento
        pets.push(novoPet);

        // 3- Saida
            res.status(201).send({
            ok: true,
            messagem: "Pet criado com sucesso",
            dados: pets
        });

    } catch (error) {
        console.error(error);
            res.status(500).send({
            ok: false,
            messagem: error.toString()
        })
    }
})

// GET /pets/:id - Obter um pet por ID
routes.get('/pets/:id', (req, res) => {
    try {
        //1- entrada
        const { id } = req.params;

        //2 - processamnento
        const pet = pets.find(p => p.id === id);

        if (!pet) {
            return res.status(404).send({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

            //3- saida
            res.status(200).send({
            ok: true,
            messagem: "Pet obtido com sucesso",
            dados: pet
        });
    } catch (error) {
        console.error(error);
            res.status(500).send({
            ok: false,
            messagem: error.toString()
        });
    }
})

//PUT /pets/:id - Atualizar um pet por ID
routes.put('/pets/:id', [validarPet], (req, res) => {
    try {
        const { id } = req.params;
        const {nome, raca, idade, nomeTutor} = req.body;

        const pet = pets.find(p => p.id === id);
        if (!pet) {
                res.status(404).send({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

        pet.nome = nome;
        pet.raca = raca;
        pet.idade = idade;
        pet.nomeTutor = nomeTutor;

            res.status(200).send({
            ok: true,
            messagem: "Pet atualizado com sucesso",
            dados: pet
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            ok: false,
            messagem: error.toString()
        });
    }
})

// DELETE /pets/:id - Excluir um pet por ID
routes.delete('/pets/:id', (req, res) => {
    try {

        // 1- entrada
        const { id } = req.params;

        //2 - processamento
        const petIndex = pets.findIndex(p => p.id === id);

        if (petIndex < 0) {
            return res.status(404).send({
                ok: false,
                messagem: "Pet não encontrado"
            });
        }

        pets.splice(petIndex, 1);

        //3 - saida
            res.status(200).send({
            ok: true,
            messagem: "Pet excluído com sucesso",
            dados: pets
        });
    } catch (error) {
        console.error(error);
            res.status(500).send({
            ok: false,
            messagem: error.toString()
        });
    }
})

export default routes;