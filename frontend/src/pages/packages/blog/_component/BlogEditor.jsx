import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import { useRef } from "react";

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

  const editor = useEditor({
    extensions: [
      StarterKit,
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const imageUrl = URL.createObjectURL(file);

      editor.chain().focus().setImage({ src: imageUrl }).run();
    });

    e.target.value = ""; // reset input
  };

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
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50 items-center">
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
            ↺
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
            ⎸
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setTextAlign("center")}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            ⎹
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setTextAlign("right")}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            ⎸
          </ToolbarButton>
        </div>

        {/* Media */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => imageInputRef.current.click()}
            title="Insert Image"
          >
            🖼
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter link URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            title="Insert Link"
          >
            🔗
          </ToolbarButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            ↶
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            ↷
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
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;
