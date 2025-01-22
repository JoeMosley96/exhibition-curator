import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {
  users,
  collections,
  collectionArtworks,
} from "../lib/data/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  try {
    //   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
          CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            bio VARCHAR(255),
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            avatar_img_url VARCHAR(255)
          );
        `;

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (user_id , username, first_name, last_name, bio, password, email, avatar_img_url)
                VALUES (${user.user_id}, ${user.username}, ${user.first_name}, ${user.last_name}, ${user.bio}, ${hashedPassword}, ${user.email}, ${user.avatar_img_url})
              `;
      })
    );
    console.log("Users seeded successfully");
    return insertedUsers;
  } catch (err) {
    console.log(err);
    return Response.json({ error: err });
  }
}

async function seedCollections() {
  try {
    await client.sql`
        CREATE TABLE IF NOT EXISTS collections(
        collection_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        user_id INT REFERENCES users(user_id) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
        );
        `;
    const insertedCollections = await Promise.all(
      collections.map(async (collection) => {
        return client.sql`
            INSERT INTO collections(collection_id, title, user_id, description, created_at)
            VALUES(${collection.collection_id}, ${collection.title}, ${collection.user_id}, ${collection.description}, ${collection.created_at})`;
      })
    );
    console.log("Collections seeded successfully");
    return insertedCollections;
  } catch (err) {
    console.log(err);
    return Response.json({ error: err });
  }
}

async function seedCollectionArtworks() {
  try {
    await client.sql`
        CREATE TABLE IF NOT EXISTS collectionArtworks(
        collection_id INT REFERENCES collections(collection_id) NOT NULL,
        artwork_id VARCHAR(255) NOT NULL
        );
        ALTER TABLE collectionArtworks
        ADD CONSTRAINT unique_collection_artwork
        UNIQUE (collection_id, artwork_id)`;

    const insertedCollectionArtworks = await Promise.all(
      collectionArtworks.map(async (collectionArtwork) => {
        return client.sql`
            INSERT INTO collectionArtworks(collection_id, artwork_id)
            VALUES(${collectionArtwork.collection_id},${collectionArtwork.artwork_id})`;
      })
    );
    console.log("Collection artworks seeded successfully");
    return insertedCollectionArtworks;
  } catch (err) {
    console.log(err);
    return Response.json({ error: err });
  }
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await client.sql`DROP TABLE IF EXISTS users CASCADE`;
    await client.sql`DROP TABLE IF EXISTS collections CASCADE`;
    await client.sql`DROP TABLE IF EXISTS collectionArtworks`;
    await seedUsers();
    await seedCollections();
    await seedCollectionArtworks();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
