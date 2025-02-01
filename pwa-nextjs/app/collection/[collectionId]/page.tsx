import { getCollectionById } from "@/app/lib/data/collections";
import { getUserById } from "@/app/lib/data/users";
import FullCollection from "@/app/zui/FullCollection";
import Spinner from "@/app/zui/Spinner";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function Page(props: {
  params: Promise<{
    collectionId: number;
  }>;
}) {
  const params = await props.params;
  const collectionId = params.collectionId;
  const collection = await getCollectionById(collectionId);
  if (collection) {
    const collectionArtworks = collection?.collectionArtworks;
    const username = (await getUserById(collection.collectionInfo.user_id))
      ?.userInfo.username;
    const timeSincePosted = formatDistanceToNow(
      collection.collectionInfo.created_at,
      { addSuffix: true }
    );
    console.log(timeSincePosted);
    return (
      <Suspense fallback={<Spinner />}>
        <div className="sm:pt-16 pt-8">
          <article className="prose flex flex-col items-center text-center mx-auto">
            <h1>{collection.collectionInfo.title}</h1>
            <p>{collection.collectionInfo.description}</p>
            <p className="mb-20">Created by <Link href={`/user/${username}`}>{username}</Link> {timeSincePosted}</p>
          </article>
          <FullCollection artworks={collectionArtworks} />
        </div>
      </Suspense>
    );
  } else {
    notFound();
  }
}
