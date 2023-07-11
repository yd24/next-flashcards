import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex justify-between items-center">
            <h1>Simple Flashcards</h1>
            <ul>
                <li>
                    <Link href="/cards">Cards</Link>
                </li>
            </ul>
        </header>
    );
}