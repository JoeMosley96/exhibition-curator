import bcrypt from "bcrypt";
import { put } from "@vercel/blob";
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
    const { blobs } = await list();
    if (blobs.length === 0) {
      console.log("No blobs to delete.");
      return;
    }
    await Promise.all(blobs.map((blob) => del(blob.url)));
    console.log("All blobs cleared successfully.");
  } catch (err) {
    console.error("Error clearing blobs:", err);
    throw err;
  }
}

const client = await db.connect();

async function seedUsers() {
  try {
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

    // Explicitly set user_id and reset sequence
    await client.sql`TRUNCATE users RESTART IDENTITY CASCADE;`;

    await Promise.all(
      users.map(async (user, index) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        let url;
        try {
          const imageBuffer = await fs.readFile(
            path.join(
              __dirname,
              "..",
              "..",
              "..",
              "..",
              "app",
              "lib",
              "data",
              "avatars",
              `${user.username}.jpg`
            )
          );
          const response = await put(`${user.username}.jpg`, imageBuffer, {
            access: "public",
          });
          url = response.url;
        } catch (err) {
          console.error("Error uploading file to Vercel Blob:", err);
          url = null;
        }

        return client.sql`
          INSERT INTO users (user_id, username, first_name, last_name, bio, password, email, avatar_img_url)
          VALUES (${index + 1}, ${user.username}, ${user.first_name}, ${
          user.last_name
        }, ${user.bio}, ${hashedPassword}, ${user.email}, ${url})
        `;
      })
    );

    console.log("Users seeded successfully");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function seedCollections() {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS collections (
        collection_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        user_id INT REFERENCES users(user_id) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Explicitly set user_id and reset sequence
    await client.sql`TRUNCATE collections RESTART IDENTITY CASCADE;`;

    await Promise.all(
      collections.map(async (collection) => {
        return client.sql`
          INSERT INTO collections (title, user_id, description, created_at)
          VALUES (${collection.title}, ${collection.user_id}, ${collection.description}, ${collection.created_at})
        `;
      })
    );

    console.log("Collections seeded successfully");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function seedCollectionArtworks() {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS collectionArtworks (
        collection_artwork_id SERIAL PRIMARY KEY,
        collection_id INT REFERENCES collections(collection_id) ON DELETE CASCADE NOT NULL,
        artwork_id VARCHAR(255) NOT NULL
      );
        ALTER TABLE collectionArtworks
        ADD CONSTRAINT unique_collection_artwork
        UNIQUE (collection_id, artwork_id);
    `;

    // Explicitly set user_id and reset sequence
    await client.sql`TRUNCATE collectionArtworks RESTART IDENTITY;`;

    await Promise.all(
      collectionArtworks.map(async (collectionArtwork) => {
        return client.sql`
          INSERT INTO collectionArtworks (collection_id, artwork_id)
          VALUES (${collectionArtwork.collection_id}, ${collectionArtwork.artwork_id})
        `;
      })
    );

    console.log("Collection artworks seeded successfully");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function GET() {
  try {
    await clearAllBlobs();
    await client.sql`BEGIN`;
    await client.sql`DROP TABLE IF EXISTS collectionArtworks `;
    await client.sql`DROP TABLE IF EXISTS collections CASCADE`;
    await client.sql`DROP TABLE IF EXISTS users CASCADE`;
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
