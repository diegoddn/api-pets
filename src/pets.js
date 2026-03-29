import { randomUUID } from 'crypto';

export const pets = [
    {
        id: randomUUID(),
        nome: "Bidu",
        raça: "Caramelo",
        idade: 6,
        tutor: "Mateus"
    },

    {
        id: randomUUID(),
        nome: "Dudu",
        raça: "Chuau-chau",
        idade: 3,
        tutor: "Maria"
    }
]