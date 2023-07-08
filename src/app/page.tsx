import Link from 'next/link';

export default function Home() {
  return (
    <header className="flex justify-between items-center">
      <h1>Simple Flashcards</h1>
      <ul>
        <li>
          <Link href='/create'>Create Card</Link>
        </li>
      </ul>
    </header>
  )
}
