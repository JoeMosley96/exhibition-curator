"use server";
import { sql } from "@vercel/postgres";
import { Artwork, getChicArtworkById, getVAMArtworkById } from "./artworks";

export type Collection = {
  collectionInfo: {
    collection_id: number;
    title: string;
    user_id: number;
    description: string;
    created_at: string;
  };
  collectionArtworks: Artwork[];
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
      collectionArtworks: (await Promise.all(artworksResponse.rows.map(
        async (artwork) => {
          const artworkId = artwork.artwork_id
          return artworkId.startsWith("O")
              ? await getVAMArtworkById(artworkId)
              : await getChicArtworkById(artworkId);
    }))).filter((artwork)=> artwork !== undefined && artwork !== null)
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

export async function addArtworkToNewCollection(
  artworkId: string,
  collectionName: string,
  description: string,
  userId: number
) {
  try {
    // create new collection
    let sqlStr = `
    INSERT INTO collections(title, user_id, description)
    VALUES($1, $2, $3)
    RETURNING *`;
    let values = [collectionName, userId, description];
    const collectionResponse = await sql.query(sqlStr, values);

    //add artwork to newly created collection
    sqlStr = `
    INSERT INTO collectionArtworks(collection_id, artwork_id)
    VALUES($1,$2)
    RETURNING *`;
    values = [collectionResponse.rows[0].collection_id, artworkId];
    const artworksResponse = await sql.query(sqlStr, values);
    return {
      collectionInfo: collectionResponse.rows[0],
      collectionArtworks: artworksResponse.rows.map(
        (artwork) => artwork.artwork_id
      ),
    };
  } catch (error) {
    console.log("Error adding item to new collection", error);
  }
}

export async function getCollectionsBySearch(
  pageNumber: number,
  query: string
) {
  try{
    const sqlStr = `
    SELECT collection_id 
    FROM collections
    WHERE UPPER(title) LIKE UPPER($1)
    ORDER BY collection_id 
    OFFSET $2 ROWS FETCH NEXT 20 ROWS ONLY;`
    const values = [`%${query}%`, (pageNumber-1)*20]
    const collectionsResponse = await sql.query(sqlStr, values)
    const allCollections = await Promise.all(collectionsResponse.rows.map(async(collection)=>{
      const fullCollection = await getCollectionById(collection.collection_id)
      return fullCollection
    }))
    
    const filteredCollections=allCollections.filter((collection)=>collection?.collectionArtworks.length !==0 )
    return filteredCollections
  } catch(error){
    console.log("Error searching for collections", error)
  }
}

export async function deleteCollection(collection_id:number){
  try{
    const sqlStr=`
    DELETE FROM collections
    WHERE collection_id = $1
    RETURNING *`
    const values = [collection_id]
    const deletedResponse = await sql.query(sqlStr, values)
    const deletedCollection = deletedResponse.rows[0]

    return deletedCollection
  } catch(error){
    console.log("Error deleting collection", error)
  }
}

export async function fetchLatestCollections(){
  try{
    const sqlStr=`
    SELECT c.collection_id, COUNT(ca.artwork_id)
    FROM collectionArtworks ca
    JOIN collections c ON ca.collection_id=c.collection_id
    GROUP BY c.collection_id
    HAVING COUNT(ca.artwork_id) > 0
    ORDER BY c.created_at DESC
    LIMIT 6;
    `
    const collectionResponse = await sql.query(sqlStr);
      const collectionIds = collectionResponse.rows.map(
        (collection) => collection.collection_id
      );
      const recentCollections: Collection[] = (
        await Promise.all(
          collectionIds.map(async (id: number) => {
            const fullCollection = await getCollectionById(id);
            return fullCollection;
          })
        )).filter(
          (collection): collection is Collection => collection !== undefined
        );
      return recentCollections
  } catch(error){
    console.log("Error fetching recent collections",error)
  }
}

export async function fetchAllCollectionNames(){
  try{
    const sqlStr=`
    SELECT title FROM collections;
    `
    const collectionResponse = await sql.query(sqlStr)
    const collectionsList = collectionResponse.rows.map((collection)=>collection.title)
    return collectionsList
  } catch(error){
    console.log("Error fetching collections", error)
  }
}



