/**
 * Helper function to build image URLs
 * Handles both local uploads and external URLs
 * @param {string} image - Image path or URL from the database
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (image) => {
  if (!image) {
    return "https://via.placeholder.com/400x300";
  }

  // If it's already a full URL (starts with http), use it as is
  if (image.startsWith("http")) {
    return image;
  }

  // If it's a local path (from uploads folder), prepend the server URL
  return `http://localhost:5000/${image}`;
};
