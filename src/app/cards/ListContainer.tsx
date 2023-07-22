import { CardManager } from './CardManager'
import { prisma } from '../../db'

export async function ListContainer() {
    const cards = await prisma.card.findMany();

    const createCard = async () => {
        'use server'

        const createdCard = await prisma.card.create({
            data: {
                question: 'New Flashcard',
                answer: 'Fill out your answer here.',
                learned: false,
            },
        })
        return createdCard
    }

    const deleteCard = async (cardID: string) => {
        'use server'

        const deletedCard = await prisma.card.delete({
            where: { id: cardID },
        })
        return deletedCard
    }

    return (
        <div className="flex flex-col justify-flex-start grow pr-12">
            <h1 className="px-12 text-3xl mb-10 pt-5">Manage Cards</h1>
            <CardManager deleteCard={deleteCard} createCard={createCard} cards={cards} />
        </div>
    )
}
