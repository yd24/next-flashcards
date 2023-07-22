import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardContainer } from './CardContainer';
import { getCards } from '../utils/cards';

export default async function Home() {
  const cards = await getCards();

  return (
    <>
      <Header />
      <CardContainer cards={cards}/>
      <Footer />
    </>
  )
}
