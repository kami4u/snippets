import SnippetEditForm from '@/components/snippet-edit-form';
import { db } from '@/db';
import { notFound } from 'next/navigation';

type SnippetEditProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetEditProps(props: SnippetEditProps) {
  const { id } = await props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: Number(id) }
  });

  if (!snippet) return notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
