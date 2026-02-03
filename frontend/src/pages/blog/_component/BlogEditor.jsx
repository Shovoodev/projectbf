import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import { useRef, useState } from "react";
import { Node } from "@tiptap/core";
import { FaAlignLeft, FaAlignRight, FaAlignCenter, FaUndo, FaRedo, FaLink } from "react-icons/fa";

export const Iframe = Node.create({
  name: "iframe",

  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "100%" },
      height: { default: "400" },
      allowfullscreen: { default: true },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "relative aspect-video w-full my-4" },
      [
        "iframe",
        {
          ...HTMLAttributes,
          class: "w-full h-full rounded-lg",
          frameborder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        },
      ],
    ];
  },
});

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
          ({ chain }) =>
            chain().setMark("textStyle", { fontSize }).run(),

      unsetFontSize:
        () =>
          ({ chain }) =>
            chain()
              .setMark("textStyle", { fontSize: null })
              .removeEmptyTextStyle()
              .run(),
    };
  },
});

const fontSizeOptions = [
  { label: "12px", value: "12px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
  { label: "48px", value: "48px" },
];

const ToolbarButton = ({
  onClick,
  active,
  children,
  title = "",
  className = "",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`px-3 py-1 rounded-lg text-sm border transition flex items-center justify-center
      ${active ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      ${className}
    `}
    type="button"
  >
    {children}
  </button>
);

const ToolbarSelect = ({
  value,
  onChange,
  options,
  title = "",
  className = "",
}) => (
  <select
    value={value}
    onChange={onChange}
    title={title}
    className={`px-3 py-1 rounded-lg text-sm border bg-white hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const BlogEditor = ({ value, onChange }) => {
  const imageInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [showEmbedInput, setShowEmbedInput] = useState(true);
  const [embedUrl, setEmbedUrl] = useState("")

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const imageUrl = URL.createObjectURL(file);

      // 1️⃣ Store preview
      newPreviews.push({
        file,
        url: imageUrl,
      });

      // 2️⃣ Insert into editor (optional)
      editor.chain().focus().setImage({ src: imageUrl }).run();
    });

    setPreviewImages((prev) => [...prev, ...newPreviews]);

    e.target.value = ""; // reset input
  };

  const handleEmbedVideo = () => {
    if (!embedUrl.trim()) {
      alert("Please enter a video URL");
      return;
    }

    // Convert YouTube URL to embed URL
    let embedCode = embedUrl;

    // Handle YouTube URLs
    if (embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be")) {
      let videoId = "";

      if (embedUrl.includes("youtube.com/watch?v=")) {
        videoId = embedUrl.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (embedUrl.includes("youtu.be/")) {
        videoId = embedUrl.split("youtu.be/")[1];
        const questionPosition = videoId.indexOf("?");
        if (questionPosition !== -1) {
          videoId = videoId.substring(0, questionPosition);
        }
      }

      if (videoId) {
        embedCode = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Insert iframe
    editor
      .chain()
      .focus()
      .insertContent({
        type: "iframe",
        attrs: {
          src: embedCode,
          width: "100%",
          height: "400",
          allowfullscreen: true,
        },
      })
      .run();

    // Reset
    setEmbedUrl("");
    setShowEmbedInput(false);
  };


  const editor = useEditor({
    extensions: [
      StarterKit,
      Iframe,
      TextStyle, // ✅ REQUIRED
      FontSize,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 font-samibold hover:text-blue-800",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[400px] p-4 focus:outline-none prose prose-lg max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="border-2 border-gray-200 rounded-xl min-h-[400px] p-4 bg-white">
        <div className="animate-pulse">Loading editor...</div>
      </div>
    );
  }

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);

  //   files.forEach((file) => {
  //     if (!file.type.startsWith("image/")) return;

  //     const imageUrl = URL.createObjectURL(file);

  //     editor.chain().focus().setImage({ src: imageUrl }).run();
  //   });

  //   e.target.value = ""; // reset input
  // };

  // Get current font size
  const getCurrentFontSize = () => {
    const attrs = editor.getAttributes("textStyle");
    return attrs.fontSize || "16";
  };

  const setFontSize = (size) => {
    if (size === "16px") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(size).run();
    }
  };

  // Reset font size
  const resetFontSize = () => {
    editor.chain().focus().unsetFontSize().run();
  };

  // Text alignment functions
  const setTextAlign = (alignment) => {
    editor.chain().focus().setTextAlign(alignment).run();
  };

  return (
    <div className="border-2 border-gray-200 flex rounded-xl bg-white">
      <div>

        <div className=" flex gap-2">
          <ToolbarButton
            onClick={() => imageInputRef.current.click()}
            title="Insert Image"
          >
            Add Images
          </ToolbarButton>
          <ToolbarButton
            title="Embed Video"
            onClick={() => setShowEmbedInput((prev) => !prev)}
          >
            Add Videos
          </ToolbarButton>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50 items-center
                sticky top-0 z-10">

          {/* Font Size Control */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600 mr-1">Size:</span>
            <ToolbarSelect
              value={getCurrentFontSize()}
              onChange={(e) => setFontSize(e.target.value)}
              options={fontSizeOptions}
            />
            <ToolbarButton
              onClick={resetFontSize}
              title="Reset Font Size"
              className="ml-1"
            >
              {<FaUndo size={12} />}
            </ToolbarButton>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Text Formatting */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold (Ctrl+B)"
            >
              <span className="font-bold">B</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic (Ctrl+I)"
            >
              <span className="italic">I</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
              title="Strikethrough"
            >
              <span className="line-through">S</span>
            </ToolbarButton>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Headings */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
              className="min-w-[40px]"
            >
              <span className="font-bold text-lg">H1</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
              className="min-w-[40px]"
            >
              <span className="font-bold">H2</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
              className="min-w-[40px]"
            >
              <span className="font-bold text-sm">H3</span>
            </ToolbarButton>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Lists */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <span>• List</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <span>1. List</span>
            </ToolbarButton>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Text Alignment */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => setTextAlign("left")}
              active={editor.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              {<FaAlignLeft size={20} />}
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setTextAlign("center")}
              active={editor.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              {<FaAlignCenter size={20} />}
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setTextAlign("right")}
              active={editor.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              {<FaAlignRight size={20} />}
            </ToolbarButton>
          </div>

          {/* Media */}
          <div className="flex gap-1">


            <ToolbarButton
              onClick={() => {
                const url = prompt("Enter link URL");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              title="Insert Link"
            >
              {<FaLink size={20} />}
            </ToolbarButton>
          </div>

          {/* Undo/Redo */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo"
            >
              {<FaUndo size={20} />}
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo"
            >
              {<FaRedo size={20} />}
            </ToolbarButton>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={imageInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Editor */}
        <div className="max-h-[500px] overflow-y-auto">
          <EditorContent editor={editor} />


        </div>
      </div>
      <div
        className={`${previewImages.length > 0
          ? "w-[15%] border-l bg-gray-50 overflow-y-auto max-h-[700px]"
          : ""
          }`}
      >
        {previewImages.length > 0 && (
          <div className="p-2 space-y-2">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt={`Preview ${index}`}
                  className="w-[60px] h-[60px] rounded-lg border object-contain"
                />

                <button
                  type="button"
                  onClick={() =>
                    setPreviewImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white
              rounded-full w-6 h-6 flex items-center justify-center
              text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {showEmbedInput && (
          <div className="p-3 border-b bg-blue-50 flex gap-2 items-center">
            <input
              type="text"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="Enter YouTube or video embed URL..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEmbedVideo();
              }}
            />
            <button
              onClick={handleEmbedVideo}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Embed
            </button>
            <button
              onClick={() => {
                setShowEmbedInput(false);
                setEmbedUrl("");
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default BlogEditor;
