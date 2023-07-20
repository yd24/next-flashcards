import { CardList } from './CardList';
import { CardData } from './CardData';
import { prisma } from '../../db';

export async function ListContainer() {
    const cards = await prisma.card.findMany();

    const createCard = async() => {
      'use server'
      const createdCard = await prisma.card.create({
        data: {
          question: 'New Flashcard',
          answer: 'Fill out your answer here.',
          learned: false,
        }
      });
      return createdCard;
    };

    const deleteCard = () => {
    };

    return (
      <div className="flex items-center grow">
        <div className="flex justify-flex-start items-flex-start grow px-12">
            <CardList cards={cards} createCard={createCard}/>
            <CardData />
        </div>
      </div>
    )
}
