"use server";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { sql } from "@vercel/postgres";

export type Collection = {
  collectionInfo: {
    collection_id: number;
    title: string;
    user_id: number;
    description: string;
    created_at: string;
  };
  collectionArtworks: string[];
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

    const collectionObject: Collection = {
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
  try {
    const sqlStr = `
    SELECT collection_id from collections
    WHERE user_id=$1
    `;
    const collectionResponse = await sql.query(sqlStr, [user_id]);
    const collectionIds = collectionResponse.rows.map(
      (collection) => collection.collection_id
    );

    const allCollections: Collection[] = (
      await Promise.all(
        collectionIds.map(async (id: number) => {
          const fullCollection = await getCollectionById(id);
          return fullCollection;
        })
      )
    ).filter(
      (collection): collection is Collection => collection !== undefined
    );
    return allCollections;
  } catch (error) {
    console.log("Data fetching error: ", error);
  }
}

export async function addArtworkToExistingCollection(
  collection_id: number,
  artwork_id: string
): Promise<{ collection_id: number; artwork_id: string }[] | undefined> {
  try {
    const sqlStr = `
    INSERT INTO collectionArtworks (collection_id, artwork_id)
    VALUES ($1, $2)
    ON CONFLICT (collection_id, artwork_id) DO NOTHING
    RETURNING *;
    `;
    const values = [collection_id, artwork_id];
    const postedResponse = await sql.query(sqlStr, values);
    const newArtwork = postedResponse.rows;

    return newArtwork;
  } catch (error) {
    console.log("Error uploading data: ", error);
  }
}

export async function removeArtworkFromCollection(
  collectionId: number,
  artworkId: string
): Promise<{ collection_id: number; artwork_id: string }[] | undefined> {
  try {
    const sqlStr = `
    DELETE FROM collectionArtworks 
    WHERE collection_id=$1
    AND artwork_id=$2
    RETURNING *;`;
    const values = [collectionId, artworkId];
    const deletedResponse = await sql.query(sqlStr, values);
    const deletedArtwork = deletedResponse.rows;
    return deletedArtwork;
  } catch (error: unknown) {
    console.log("Error deleting data: ", error);
  }
}

export async function checkSaved(
  userId: number,
  artworkId: string
): Promise<{ saved: boolean; collectionId: number } | undefined> {
  try {
    const sqlStr = `
    SELECT ca.collection_id, ca.artwork_id, c.user_id
    FROM collectionArtworks ca
    JOIN collections c ON ca.collection_id = c.collection_id
    WHERE user_id = $1
    AND artwork_id = $2
    `;
    const values = [userId, artworkId];
    const checkRes = await sql.query(sqlStr, values);
    return {
      saved: checkRes.rows.length ? true : false,
      collectionId: checkRes.rows.length ? checkRes.rows[0].collection_id : 0,
    };
  } catch (error) {
    console.log("Data checking error", error);
  }
}
