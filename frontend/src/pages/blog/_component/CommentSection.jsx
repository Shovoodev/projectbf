import { useEffect, useState } from "react";

const CommentSection = ({ onSubmit }) => {
    const [form, setForm] = useState({
        comment: "",
        name: "",
        email: "",
        website: "",
        remember: false,
    });

    // Load saved values (optional)
    useEffect(() => {
        const saved = localStorage.getItem("comment_form");
        if (saved) {
            const parsed = JSON.parse(saved);
            setForm((prev) => ({
                ...prev,
                name: parsed.name || "",
                email: parsed.email || "",
                website: parsed.website || "",
                remember: true,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (matches screenshot: Name* Email*)
        if (!form.comment.trim()) return alert("Please write a comment.");
        if (!form.name.trim()) return alert("Name is required.");
        if (!form.email.trim()) return alert("Email is required.");

        // Save to localStorage if user checked remember
        if (form.remember) {
            localStorage.setItem(
                "comment_form",
                JSON.stringify({
                    name: form.name,
                    email: form.email,
                    website: form.website,
                })
            );
        } else {
            localStorage.removeItem("comment_form");
        }

        // Pass data up if parent wants to send API request
        onSubmit?.(form);

        // Reset comment only (keep name/email if remember is checked)
        setForm((prev) => ({
            ...prev,
            comment: "",
        }));
    };

    return (
        <section className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Leave a Comment
            </h2>

            <p className="text-gray-600 mb-8">
                Your email address will not be published. Required fields are marked{" "}
                <span className="text-red-600">*</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Comment textarea */}
                <div>
                    <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Type here.."
                        className="w-full min-h-[260px] p-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white"
                    />
                </div>

                {/* Name / Email / Website */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name*"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email*"
                        type="email"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    />

                    <input
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="Website"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    />
                </div>

                {/* Remember checkbox */}
                <label className="flex items-center gap-3 text-gray-700 select-none">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300"
                    />
                    <span>
                        <span className="font-semibold">Save my name</span>, email, and
                        website in this browser for the next time I comment.
                    </span>
                </label>

                {/* Submit button */}
                <div>
                    <button
                        type="submit"
                        className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 transition-all active:scale-95"
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CommentSection;
