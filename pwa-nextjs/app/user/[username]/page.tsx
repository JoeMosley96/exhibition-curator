import { getUserById, getUserIdByUsername } from "@/app/lib/data/users";
import { notFound } from "next/navigation";
import Image from "next/image";
import { list } from "@vercel/blob";
import { getChicArtworkById, getVAMArtworkById } from "@/app/lib/data/artworks";

export default async function Profile(props: {
  params?: Promise<{
    username: string;
  }>;
}) {
  const username = (await props.params)?.username;
  const userId = username && (await getUserIdByUsername(username));
  const userData = userId && (await getUserById(userId));

  if (userData) {
    return (
      <>
        <div>
          <p>{userData.userInfo.username}</p>
          <p>{userData.userInfo.first_name}</p>
          <p>{userData.userInfo.last_name}</p>
          <p>{userData.userInfo.bio}</p>
          <img
            key={userData.userInfo.username}
            src={userData.userInfo.avatar_img_url}
          />
        </div>
        <div>
          <p>{`${userData.userInfo.first_name} ${userData.userInfo.last_name}'s collections:`}</p>
          {userData.userCollections?.map((collection)=>{
            return (
              <div>
                <p>{collection.collectionInfo.title}</p>
                <p>{collection.collectionInfo.description}</p>
                {collection.collectionArtworks.map(async (artwork) => {
                  const fullArtwork = artwork.startsWith("O") ? await getVAMArtworkById(artwork) : await getChicArtworkById(artwork);
                  return (
                    <img src={fullArtwork?.imageURL} />
                  );
                })}
              </div>
            )
          })}
        </div>
      </>
    );
  } else {
    notFound();
  }
}
