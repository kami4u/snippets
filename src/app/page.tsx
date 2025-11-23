import { db } from '@/db';
import Link from 'next/link';

// don't want to disable caching for the home page
// export const dynamic = 'force-dynamic';
export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <Link
      key={snippet.id}
      href={`/snippets/${snippet.id}`}
      className="flex justify-between items-centre p-2 border rounded"
    >
      <div>
        <h3>{snippet.title}</h3>
      </div>
      <div>View</div>
    </Link>
  ));
  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link
          href="/snippets/new"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Snippet
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
