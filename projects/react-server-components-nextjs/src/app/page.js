import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <Link href="/my">My Notes</Link>
      <Link href="/write">Write a note</Link>
      <Link href="/teacher">Secret Teacher Feed</Link>
      <Link href="/who-am-i">Who Am I?!</Link>
    </ul>
  );
}
