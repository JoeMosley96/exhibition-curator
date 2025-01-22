"use server";
import { sql } from "@vercel/postgres";

export type Collection = {
  collectionInfo: {
    collection_id: number;
    title: string;
    user_id:number;
    description:string;
    created_at:string;
  };
  collectionArtworks:string[]
};

export async function getCollectionById(collection_id: number) {
  try {
    let sqlStr = `
        SELECT *
        FROM collections 
        WHERE collection_id=${collection_id}`;

    const collectionResponse = await sql.query(sqlStr);

    sqlStr = `
        SELECT artwork_id
        FROM collectionArtworks
        WHERE collection_id=${collection_id}
        ORDER BY collection_artwork_id
        `;
    const artworksResponse = await sql.query(sqlStr);

    const collectionObject:Collection = {
      collectionInfo: collectionResponse.rows[0],
      collectionArtworks: artworksResponse.rows.map(
        (artwork) => artwork.artwork_id
      ),
    };
    return collectionObject;
  } catch (error) {
    console.log("Data fetching error: ", error);
  }
}

export async function getCollectionsByUserId(user_id: number) {
  const sqlStr = `
    SELECT collection_id from collections
    WHERE user_id=$1
    `;
  const collectionResponse = await sql.query(sqlStr, [user_id]);
  const collectionIds = collectionResponse.rows.map(
    (collection) => collection.collection_id
  );

  const allCollections:Collection[] = (
    await Promise.all(
      collectionIds.map(async (id: number) => {
        const fullCollection = await getCollectionById(id);
        return fullCollection;
      })
    )
  ).filter((collection): collection is Collection => collection !== undefined);
  console.log(allCollections)
  return allCollections;
}

export async function addArtworkToExistingCollection(
  collection_id: number,
  artwork_id: string
) {
  let sqlStr = `
    INSERT INTO collectionArtworks (collection_id, artwork_id)
    VALUES ($1, $2)
    ON CONFLICT (collection_id, artwork_id) DO NOTHING
    RETURNING *;
    `;
  const values = [collection_id, artwork_id];
  const postedResponse = await sql.query(sqlStr, values);
  const newCollection = postedResponse.rows;

  return newCollection;
}
