import { FlashCard } from '../components/FlashCard';
import { FlashCardButtons } from '../components/FlashCardButtons'

export function CardContainer() {
    return (
      <div
        className='flex flex-col justify-center items-center grow bg-gray-50 gap-6'
      >
        <FlashCard />
        <FlashCardButtons />
      </div>
    );
}
