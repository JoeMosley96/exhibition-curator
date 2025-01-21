import {
  addArtworkToExistingCollection,
  getCollectionById,
  getCollectionsByUserId,
} from "@/app/lib/data/collections";

export default async function Profile() {
  // getCollectionById(1)
  // const collections = await getCollectionsByUserId(1);
  // console.log(collections)
  return (
    <>
      <p className="border-2 border-black ">Profile Page</p>

    </>
  );
}
