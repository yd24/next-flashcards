import { CardList } from './CardList';
import { CardData } from './CardData';
import { prisma } from '../../db';

export async function ListContainer() {
    const cards = await prisma.card.findMany();

    const getSelectedCard = () => {

    };

    const addCard = () => {

    };

    const deleteCard = () => {

    };

    const updateCard = () => {

    };

    return (
      <div className="flex items-center grow">
        <div className="flex justify-flex-start items-flex-start grow px-12">
            <CardList cards={cards}/>
            <CardData />
        </div>
      </div>
    )
}
