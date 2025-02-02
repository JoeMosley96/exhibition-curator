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

export async function getUsersBySearch(
  pageNumber: number,
  query: string
) {
  try{
    const sqlStr = `
    SELECT * 
    FROM users
    WHERE UPPER(username) LIKE UPPER($1)
    OR UPPER(first_name) LIKE UPPER($1)
    OR UPPER(last_name) LIKE UPPER($1)
    ORDER BY user_id 
    OFFSET $2 ROWS FETCH NEXT 20 ROWS ONLY;`
    const values = [`%${query}%`, (pageNumber-1)*20]
    const usersResponse = await sql.query(sqlStr, values)
    const allUsers = usersResponse.rows
        
    return allUsers
  } catch(error){
    console.log("Error searching for users", error)
  }
}
