"use server";
import { sql } from "@vercel/postgres";
import { getCollectionsByUserId } from "./collections";

export async function getUserIdByUsername(username:string):Promise<number|undefined>{
    try{
        const sqlStr=`
        SELECT user_id FROM USERS
        WHERE username=$1`;

        const values=[username]
        const response = await sql.query(sqlStr, values)
        return response.rows[0].user_id
    } catch(error){
        console.log("Error fetching user id", error)
    }
}

export async function getUserById(user_id: number) {
  try {
    const sqlStr = `
        SELECT * FROM USERS
        WHERE user_id=$1`;

    const values = [user_id];

    const userResponse = await sql.query(sqlStr, values);

    const userCollections = await getCollectionsByUserId(user_id);

    return {
      userInfo: userResponse.rows[0],
      userCollections: userCollections,
    };
  } catch (error) {
    console.log("Error fetching user", error);
  }
}
