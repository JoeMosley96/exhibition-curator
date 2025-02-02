export const users = [
  {
    user_id: 1,
    username: "artlover1",
    first_name: "Alice",
    last_name: "Smith",
    bio: "Avid collector of modern art.",
    password: "password123",
    email: "alice.smith@example.com",
    avatar_img_url: "https://example.com/avatar1.jpg",
  },
  {
    user_id: 2,
    username: "galleryguru",
    first_name: "Bob",
    last_name: "Jones",
    bio: "Curator and art historian.",
    password: "securepass456",
    email: "bob.jones@example.com",
    avatar_img_url: "https://example.com/avatar2.jpg",
  },
  {
    user_id: 3,
    username: "creativechris",
    first_name: "Chris",
    last_name: "Taylor",
    bio: "Artist and art enthusiast.",
    password: "chrispassword",
    email: "chris.taylor@example.com",
    avatar_img_url: null,
  },
  {
    user_id: 4,
    username: "collector4life",
    first_name: "Dana",
    last_name: "Lee",
    bio: "Lifelong art collector.",
    password: "mypassword",
    email: "dana.lee@example.com",
    avatar_img_url: "https://example.com/avatar4.jpg",
  },
  {
    user_id: 5,
    username: "visualvibes",
    first_name: "Ella",
    last_name: "Brown",
    bio: "Passionate about visual storytelling.",
    password: "ellapassword",
    email: "ella.brown@example.com",
    avatar_img_url: null,
  },
];

export const collections = [
  // Collections for User 1
  {
    collection_id: 1,
    title: 'Modern Art Favorites',
    user_id: 1,
    description: 'A collection of my favorite modern art pieces.',
    created_at: '2025-01-01 10:00:00'
  },
  {
    collection_id: 2,
    title: 'Cubism Inspirations',
    user_id: 1,
    description: 'Artworks that showcase the beauty of cubism.',
    created_at: '2025-01-06 11:00:00'
  },

  // Collections for User 2
  {
    collection_id: 3,
    title: 'Historic Masterpieces',
    user_id: 2,
    description: 'Famous artworks from the past.',
    created_at: '2025-01-02 14:30:00'
  },
  {
    collection_id: 4,
    title: 'Impressionist Wonders',
    user_id: 2,
    description: 'My favorite impressionist pieces.',
    created_at: '2025-01-07 13:15:00'
  },

  // Collections for User 3
  {
    collection_id: 5,
    title: 'Abstract Wonders',
    user_id: 3,
    description: 'Abstract artworks that inspire me.',
    created_at: '2025-01-03 16:45:00'
  },
  {
    collection_id: 6,
    title: 'Modern Minimalism',
    user_id: 3,
    description: 'A collection of minimalist artworks.',
    created_at: '2025-01-08 15:30:00'
  },

  // Collections for User 4
  {
    collection_id: 7,
    title: 'Rare Finds',
    user_id: 4,
    description: 'Unique and hard-to-find pieces.',
    created_at: '2025-01-04 09:20:00'
  },
  {
    collection_id: 8,
    title: 'Baroque Beauty',
    user_id: 4,
    description: 'Artworks that highlight the Baroque style.',
    created_at: '2025-01-09 10:45:00'
  },

  // Collections for User 5
  {
    collection_id: 9,
    title: 'Landscape Collection',
    user_id: 5,
    description: 'Beautiful landscapes from various artists.',
    created_at: '2025-01-05 12:15:00'
  },
  {
    collection_id: 10,
    title: 'Nature’s Best',
    user_id: 5,
    description: 'Artworks inspired by the beauty of nature.',
    created_at: '2025-01-10 17:20:00'
  }
];


export const collectionArtworks = [
  // Artworks for User 1's collections
  { collection_id: 1, artwork_id: "O1013201" },
  { collection_id: 1, artwork_id: "O1013202" },
  { collection_id: 1, artwork_id: "O1013203" },
  { collection_id: 2, artwork_id: "O1013204" },
  { collection_id: 2, artwork_id: "O1013205" },

  // Artworks for User 2's collections
  { collection_id: 3, artwork_id: "O273638" },
  { collection_id: 3, artwork_id: "O157156" },
  { collection_id: 3, artwork_id: "O260710" },
  { collection_id: 4, artwork_id: "O227420" },
  { collection_id: 4, artwork_id: "O118661" },

  // Artworks for User 3's collections
  { collection_id: 5, artwork_id: "242732" },
  { collection_id: 5, artwork_id: "230189" },
  { collection_id: 5, artwork_id: "229510" },
  { collection_id: 6, artwork_id: "229354" },
  { collection_id: 6, artwork_id: "234004" },

  // Artworks for User 4's collections
  { collection_id: 7, artwork_id: "35198" },
  { collection_id: 7, artwork_id: "234433" },
  { collection_id: 7, artwork_id: "142526" },
  { collection_id: 8, artwork_id: "28849" },
  { collection_id: 8, artwork_id: "234781" },

  // Artworks for User 5's collections
  { collection_id: 9, artwork_id: "93900" },
  { collection_id: 9, artwork_id: "16362" },
  { collection_id: 9, artwork_id: "4796" },
  { collection_id: 10, artwork_id: "111317" },
  { collection_id: 10, artwork_id: "1013192" }
];

