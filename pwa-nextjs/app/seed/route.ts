import bcrypt from "bcrypt";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { db } from "@vercel/postgres";
import {
  users,
  collections,
  collectionArtworks,
} from "../lib/data/placeholder-data";
import path from "path";
import { list, del } from "@vercel/blob";
import fs from "fs/promises";

async function clearAllBlobs() {
  try {
    // List all blobs in your storage
    const { blobs } = await list();
    // Check if there are any blobs to delete
    if (blobs.length === 0) {
      console.log("No blobs to delete.");
      return;
    } else {
      const deletePromises = blobs.map((blob) => del(blob.url));
      await Promise.all(deletePromises);
      console.log("All blobs cleared successfully.");
    }
  } catch (err) {
    console.error("Error clearing blobs:", err);
  }
}

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
    `pwa-nextjs/app/lib/data/avatars/artlover1.jpg`;
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        let url;
        try {
          const imageBuffer = await fs.readFile(path.join(__dirname, '..', "..", "..","..","app",'lib', "data","avatars",`${user.username}.jpg`));
          const response = await put(`${user.username}.jpg`, imageBuffer, {
            access: "public",
          });
          url = response.url;
        } catch (err) {
          console.error("Error uploading file to Vercel Blob:", err);
          url = null; 
        }
        return client.sql`
                INSERT INTO users (username, first_name, last_name, bio, password, email, avatar_img_url)
                VALUES (${user.username}, ${user.first_name}, ${user.last_name}, ${user.bio}, ${hashedPassword}, ${user.email}, ${url})
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
            INSERT INTO collections(title, user_id, description, created_at)
            VALUES(${collection.title}, ${collection.user_id}, ${collection.description}, ${collection.created_at})`;
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
        collection_artwork_id SERIAL PRIMARY KEY,
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
    // Call this function at the start of your seeding script
    await clearAllBlobs();
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
