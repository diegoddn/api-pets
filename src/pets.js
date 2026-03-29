import { randomUUID } from 'crypto';

export const pets = [
    {
        id: randomUUID(),
        nome: "Bidu",
        raça: "Vira-lata",
        idade: 6,
        nomeTutor: "Mateus"
    },

    {
        id: randomUUID(),
        nome: "Dudu",
        raça: "Chuau-chau",
        idade: 3,
        nomeTutor: "Maria"
    }
]