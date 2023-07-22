import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardContainer } from './CardContainer';
import { prisma } from '../db';
import FlashCard from './common/FlashCard';

export default async function Home() {
  const cards: FlashCard[] = await prisma.card.findMany()

  return (
    <>
      <Header />
      <CardContainer cards={cards}/>
      <Footer />
    </>
  )
}
