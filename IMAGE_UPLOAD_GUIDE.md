# Image Upload Guide

## Backend Setup (✅ Completed)

The backend is now configured to handle image uploads for blog posts. Here's what was implemented:

### Files Modified/Created:

1. **`Server/middleware/uploadImage.js`** - Multer configuration for image uploads
   - Accepts only image files (jpeg, jpg, png, gif, webp)
   - 5MB file size limit
   - Stores images in `Server/uploads/` directory with unique filenames

2. **`Server/models/postModel.js`** - Updated image field
   - Changed default image from static URL to `null`
   - Ready to store file paths or URLs

3. **`Server/controllers/postController.js`** - Enhanced controller methods
   - `createPost()` - Handles image uploads and stores file path
   - `updatePost()` - Updates posts with new images, deletes old ones
   - `deletePost()` - Deletes posts and their associated images

4. **`Server/routes/postRoutes.js`** - Added multer middleware
   - Routes now accept image files via multipart/form-data

5. **`Server/app.js`** - Static file serving
   - Images are served from `http://YOUR_SERVER/uploads/filename.jpg`

## Frontend Implementation

### 1. Update CreatePosts Component

```jsx
// client/src/Pages/CreatePosts.jsx
const [formData, setFormData] = useState({
  title: "",
  category: "uncategorized",
  content: "",
});
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

// Handle image selection
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("content", formData.content);
  if (image) {
    formDataToSend.append("image", image);
  }

  try {
    const response = await authApi.post("/post/createPost", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// In JSX, add image input:
<input type="file" accept="image/*" onChange={handleImageChange} />;
{
  imagePreview && (
    <img src={imagePreview} alt="Preview" style={{ maxWidth: "200px" }} />
  );
}
```

### 2. Update UpdatePost Component

Similar implementation as CreatePosts, with the ability to keep existing image or upload a new one.

### 3. Update PostCard Component

```jsx
// Display the image
<img
  src={
    post.image
      ? post.image.startsWith("http")
        ? post.image
        : `${import.meta.env.VITE_API_BASE_URL}/${post.image}`
      : "default-image-url.jpg"
  }
  alt={post.title}
/>
```

## API Endpoints

### Create Post with Image

```
POST /api/post/createPost
Content-Type: multipart/form-data

Body:
- title (text)
- content (text)
- category (text)
- image (file) - optional
```

### Update Post with Image

```
PUT /api/post/update/:postId
Content-Type: multipart/form-data

Body:
- title (text) - optional
- content (text) - optional
- category (text) - optional
- image (file) - optional
```

### Delete Post (also deletes image)

```
DELETE /api/post/deletePost/:postId/:userId
```

## Image Access

Uploaded images can be accessed via:

```
http://your-server-url/uploads/filename.jpg
```

## Troubleshooting

1. **Images not saving?**
   - Ensure `Server/uploads/` directory exists (should be auto-created)
   - Check file permissions on the uploads folder

2. **"Only image files allowed" error?**
   - Make sure you're uploading image files (jpg, png, gif, webp)
   - File size should not exceed 5MB

3. **Images not displaying in frontend?**
   - Update the image src to include the full path `/uploads/filename.jpg`
   - Ensure CORS is properly configured in app.js

## Next Steps

1. Update the CreatePosts component to include image upload UI
2. Update the UpdatePost component to handle image updates
3. Update PostCard and other display components to show images
4. Test the upload functionality end-to-end
