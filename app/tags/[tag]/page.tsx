import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return [];

  const tags = new Set(posts.map((post) => post.tags).flat());

  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `Posts about ${tag}`,
  };
}

export default async function TagPage({ params: { tag } }: Props) {
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available</p>;
  }

  const postsByTag = posts.filter((post) => post.tags.includes(tag));

  return (
    <>
      {postsByTag.length > 0 ? (
        <>
          <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
          <section className="mt-6 max-w-2xl">
            <ul className="w-full list-none p-0">
              {postsByTag.map((post) => (
                <ListItem key={post.id} post={post} />
              ))}
            </ul>
          </section>
        </>
      ) : (
        <div className="text-center">
          <p className="pt-10">Sorry, no posts for that keyword</p>
          <Link href="/">Back To Home</Link>
        </div>
      )}
    </>
  );
}
