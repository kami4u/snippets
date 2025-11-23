'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};
export default function ErrorSnippetCreatePage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
