const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
require("dotenv").config();

const categories = [
  { name: "Tech", slug: "tech", description: "Technology and programming related posts" },
  { name: "Lifestyle", slug: "lifestyle", description: "Lifestyle and personal development posts" },
  { name: "Health", slug: "health", description: "Health and wellness related content" },
  { name: "Politics", slug: "politics", description: "Political discussions and news" },
  { name: "Entertainment", slug: "entertainment", description: "Entertainment and media content" },
  { name: "Sports", slug: "sports", description: "Sports news and discussions" },
  { name: "Travel", slug: "travel", description: "Travel experiences and tips" },
  { name: "Food", slug: "food", description: "Food recipes and culinary content" },
  { name: "Education", slug: "education", description: "Educational content and learning" },
  { name: "Finance", slug: "finance", description: "Financial advice and money management" },
  { name: "Fashion", slug: "fashion", description: "Fashion trends and style guides" },
  { name: "Art", slug: "art", description: "Art and creative expression" },
  { name: "Science", slug: "science", description: "Scientific discoveries and research" },
  { name: "Other", slug: "other", description: "Miscellaneous topics" },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert new categories one by one to trigger pre-save hooks
    const insertedCategories = [];
    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
      insertedCategories.push(category);
    }
    console.log(`Seeded ${insertedCategories.length} categories`);

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

seedCategories();
