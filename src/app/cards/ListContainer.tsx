import { CardManager } from './CardManager'
import { prisma } from '../../db'
import { getCards } from '../../utils/cards'
import { createCard, deleteCard } from './actions';

export async function ListContainer() {
    /*const cards = await prisma.card.findMany();*/
    const cards = await getCards();

    return (
        <div className="flex flex-col justify-flex-start grow pr-12">
            <h1 className="px-12 text-3xl mb-10 pt-5">Manage Cards</h1>
            <CardManager deleteCard={deleteCard} createCard={createCard} cards={cards} />
        </div>
    )
}
