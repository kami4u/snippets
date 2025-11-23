import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteSnippet } from '@/actions';

type SnippetShowPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetShowPage({
  params
}: SnippetShowPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { id } = await params;
  const snippet = await db.snippet.findFirst({
    where: { id: Number(id) }
  });

  if (!snippet) return notFound();

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippet.bind(null, snippet.id)}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-grey-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => ({
    id: snippet.id.toString()
  }));
}
