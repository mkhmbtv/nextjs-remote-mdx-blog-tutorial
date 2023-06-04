import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Date from "../../components/Date";
import "highlight.js/styles/github-dark.css";

export const revalidate = 86400;

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return [];

  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params: { id } }: Props) {
  const post = await getPostByName(`${id}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { id } }: Props) {
  const post = await getPostByName(`${id}.mdx`);
  if (!post) {
    notFound();
  }

  const {
    meta: { title, date, tags },
    content,
  } = post;

  const tagLinks = tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h2 className="text-3xl mt-4">{title}</h2>
      <div className="text-sm">
        <Date dateString={date} />
      </div>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex gap-4">{tagLinks}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}
