import { getUserById, getUserIdByUsername } from "@/app/lib/data/users";
import { notFound } from "next/navigation";
import CollectionCard from "@/app/zui/CollectionCard";
import IKImageClient from "@/app/zui/IKImageClient";

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
        <div className="flex flex-col items-center">
          <div className="avatar pt-4 sm:pt-24 pb-2">
            <div className="w-56 rounded-full ">
              <IKImageClient
                alt="Profile image"
                key={userData.userInfo.username}
                src={userData.userInfo.avatar_img_url}
                width={600}
                height={600}
        
              />
            </div>
          </div>
          <article className="prose flex flex-col items-center">
            <h1 className="mb-0">{`${userData.userInfo.first_name} ${userData.userInfo.last_name}`}</h1>
            <p className="mb-0">{userData.userInfo.bio}</p>
            <p className="mb-0">{userData.userInfo.username}</p>
            {userId === 1 ? (
              <h2>Your Collections:</h2>
            ) : (
              <h2>{`${userData.userInfo.first_name} ${userData.userInfo.last_name}'s Collections:`}</h2>
            )}
          </article>
        </div>
        <div className="flex flex-wrap gap-7 justify-center mt-6 sm:mb-16 mb-20">
          {userData.userCollections?.map((collection) => <CollectionCard key={collection.collectionInfo.collection_id} collection={collection}/>
          )}
        </div>
      </>
    );
  } else {
    notFound();
  }
}
