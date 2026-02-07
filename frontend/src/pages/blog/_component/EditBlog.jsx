import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const CORE = import.meta.env.VITE_API_URL;
import {
    FiShield,
    FiBook,
    FiTag,
    FiImage,
    FiCheck,
    FiUser,
} from "react-icons/fi";
import { FaUpload } from "react-icons/fa";
import BlogEditor from "./BlogEditor";
import { showToast } from "../../../utility/toast";
import ConfirmModal from "../../../components/ConfirmModal";

const EditBlog = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
        excerpt: "",
        image: "",
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${CORE}/single-blog-data/${id}`);
                const data = await res.json();

                const cleanedContent = data.content?.replace(
                    /<img[^>]+src="blob:[^"]+"[^>]*>/g,
                    ""
                );

                setBlogData({
                    title: data.title || "",
                    content: cleanedContent || "",
                    author: data.author || "Anonymous",
                    category: data.category || "blogs",
                    excerpt: data.excerpt || "",
                    image: data.images?.[0] || "",
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    console.log({ blogData });


    // Function to convert blob URLs to base64
    const processContentImages = async (content) => {
        if (!content || !content.includes("blob:")) {
            return content;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const imgElements = doc.querySelectorAll('img[src^="blob:"]');

        // If no blob images, return original content
        if (imgElements.length === 0) {
            return content;
        }

        const processPromises = Array.from(imgElements).map(async (img) => {
            const blobUrl = img.src;

            try {
                // Fetch the blob data
                const response = await fetch(blobUrl);
                const blob = await response.blob();

                // Convert blob to base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                // Replace blob URL with base64
                img.src = base64;
                return true;
            } catch (error) {
                console.warn("Failed to process blob image:", error);
                // Remove the broken image
                img.remove();
                return false;
            }
        });

        // Wait for all images to be processed
        await Promise.all(processPromises);

        // Return the processed HTML
        return doc.body.innerHTML;
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));
        setImages((prev) => [...prev, ...imageFiles]);
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });
        setError(null);
        showToast.error({ error })
        try {
            // Validate required fields
            if (!blogData.title?.trim() || !blogData.content?.trim()) {
                setMessage({
                    text: "Please fill in all required fields (Title and Content are required)",
                    type: "error",
                });
                setLoading(false);
                return;
            }

            // Process content to convert blob URLs to base64
            const processedContent = await processContentImages(blogData.content);

            // Create FormData
            const formData = new FormData();

            // Append text fields
            formData.append("title", blogData.title.trim());
            formData.append("content", processedContent);
            formData.append("author", blogData.author?.trim() || "Anonymous");
            formData.append("category", blogData.category || "Blogs");
            formData.append(
                "excerpt",
                blogData.excerpt?.trim() ||
                blogData.content.trim().substring(0, 150) +
                (blogData.content.length > 150 ? "..." : "")
            );

            // Append external image URL if provided
            if (blogData.image?.trim()) {
                formData.append("images", blogData.image.trim());
            }

            // Append uploaded images if any
            images.forEach((img) => {
                formData.append("images", img);
            });

            // Show processing message
            setMessage({
                text: "Updating blog...",
                type: "info",
            });

            // ✅ IMPORTANT: Change the endpoint and method for UPDATE
            const response = await fetch(`${CORE}/update-blog/${id}`, {
                method: "PUT", // or "PATCH" depending on your API
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || `Error ${response.status}: ${response.statusText}`
                );
            }

            // Success
            setMessage({
                text: "Blog updated successfully!",
                type: "success",
            });

            // Navigate after success
            setTimeout(() => {
                navigate("/blog");
            }, 2000);
        } catch (error) {
            console.error("Error updating blog:", error);

            let errorMessage = "An error occurred. Please try again.";

            if (error.message.includes("Title, content, and excerpt are required")) {
                errorMessage =
                    "Please fill in all required fields: Title, Content, and Excerpt.";
            } else if (error.message.includes("category")) {
                errorMessage = "Please select a valid category from the dropdown.";
            } else if (error.message.includes("413")) {
                errorMessage = "File too large. Please reduce image sizes.";
            } else {
                errorMessage = error.message || errorMessage;
            }

            setMessage({
                text: errorMessage,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteBlog = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${CORE}/delete-blog/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to delete blog");

            showToast.success("Blog deleted successfully");
            navigate("/blog");
        } catch (err) {
            showToast.error(err.message || "Delete failed");
        } finally {
            setLoading(false);
            setShowConfirm(false);
        }
    };

    // Function to remove selected image
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="flex justify-end px-6 pt-6">
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium
               flex items-center gap-2 hover:bg-red-800 transition-all
               active:scale-95 whitespace-nowrap disabled:opacity-50"
                >
                    <MdDelete />   Delete Blog
                </button>
            </div>

            <div className="section-container max-w-5xl mx-auto px-6 py-16">


                <form onSubmit={handleUpdateBlog} className="space-y-6">
                    <div className="space-y-4">
                        {/* Blog Title */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Blog Title *
                            </label>
                            <div className="relative">
                                <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={blogData.title}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Author Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Author
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Your name (default: Anonymous)"
                                    value={blogData.author}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            author: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Category *
                            </label>
                            <div className="relative">
                                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <select
                                    value={blogData.category}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white
                 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                 transition-all duration-300 appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="btf news">BTF News</option>
                                    <option value="uncetaglory">Uncategory</option>
                                    <option value="blogs">Blogs</option>
                                </select>
                            </div>
                        </div>

                        {/* External Image URL */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Featured Image URL (Optional)
                            </label>
                            <div className="relative">
                                <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    value={blogData.image}
                                    onChange={(e) =>
                                        setBlogData({ ...blogData, image: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                />
                            </div>
                            {blogData.image && (
                                <div className="mt-2">
                                    <img
                                        src={blogData.image}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            setMessage({
                                                text: "Unable to load image from URL. Please check the link.",
                                                type: "warning",
                                            });
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* OR separator */}
                        {(blogData.image || images.length > 0) && (
                            <div className="flex items-center justify-center">
                                <span className="text-gray-400 text-sm">OR</span>
                            </div>
                        )}

                        {/* Image Upload Section */}
                        <div className="pdf-signature-zone !py-4 border-2 border-dashed rounded-xl text-center">
                            <FaUpload className="text-gray-300 text-2xl mb-2 mx-auto" />
                            <input
                                id="sig-nominate"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            <label
                                htmlFor="sig-nominate"
                                className="pdf-upload-btn cursor-pointer inline-block mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                Upload Images
                            </label>

                            {images.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        {images.length} image(s) selected
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {images.map((img, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Excerpt/Short Description (Optional)
                            </label>
                            <textarea
                                placeholder="A brief summary of your blog post (2-3 sentences). Leave empty to auto-generate from content."
                                value={blogData.excerpt}
                                onChange={(e) =>
                                    setBlogData({
                                        ...blogData,
                                        excerpt: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[80px] resize-none"
                                rows="2"
                                maxLength="200"
                            />
                            <p className="text-xs text-gray-500 mt-1 text-right">
                                {blogData.excerpt?.length || 0}/200 characters
                            </p>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Blog Content *
                            </label>

                            <div className="w-full flex-1">
                                <BlogEditor
                                    key={id}
                                    value={blogData.content}
                                    onChange={(content) =>
                                        setBlogData(prev => ({ ...prev, content }))
                                    }
                                />

                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                Tip: Images added in the editor will be automatically converted
                                for permanent storage.
                            </p>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Updating Blog...</span>
                            </>
                        ) : (
                            <>
                                <span>Update Blog Post</span>
                                <FiCheck className="h-5 w-5" />
                            </>
                        )}
                    </button>

                    {/* Status Message */}
                    {message.text && (
                        <div
                            className={`mt-4 p-4 rounded-lg text-center font-medium transition-all duration-300 ${message.type === "error"
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : message.type === "warning"
                                    ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                    : message.type === "info"
                                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                                        : "bg-green-50 text-green-600 border border-green-200"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Help Text */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-center text-gray-600 text-sm">
                            * Required fields. Images from the editor are automatically
                            converted for permanent storage.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <FiShield className="h-4 w-4 text-blue-500" />
                        <span>Blog content is saved securely</span>
                    </div>
                </form>
            </div>
            <ConfirmModal
                isOpen={showConfirm}
                title="Delete Blog"
                message="Are you sure you want to delete this blog? This action cannot be undone."
                onConfirm={handleDeleteBlog}
                onCancel={() => setShowConfirm(false)}
                confirmText="Delete"
                loading={loading}
                variant="danger"
            />
        </div>
    );
};

export default EditBlog;
