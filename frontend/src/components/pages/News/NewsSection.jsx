import {
  FaArrowRight,
  FaCalendarDays,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa6";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay for hover effect (optional, adds polish) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
          {news.title}
        </h3>

        {/* Meta Data */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5">
            <FaUser className="text-gray-400" />
            <span>By {news.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCalendarDays className="text-gray-400" />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaFolderOpen className="text-gray-400" />
            <span>{news.category}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 text-justify">
          {news.excerpt}
        </p>

        {/* Button */}
        <div className="mt-auto">
          <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95">
            Read More <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const newsData = [
    {
      id: 1,
      title: "An Overview of Black Tulip Funerals: Services and Support",
      author: "Erica",
      date: "November 15, 2025",
      category: "BTF News",
      excerpt:
        "When a family experiences the loss of a loved one, the need for guidance, compassion, and clarity becomes more important than ever. At Black Tulip Funerals, we understand the emotional weight...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC4RiPMRsmpNihyDsXb9lg0y-CgEjICTXpbghonk2F4boK8ZrCcrOcVnjlJ9TkwoHH3wgl9sfuWJUSUC1GL3iBWi_I5l0-54MriEmj7OMQo3xs4fE5sRc7qpDI9OjshTQVgH_oDJrnWueUwYK2YbupAn87vxAaRwkXzzkA4TFvdHtaJUG3Rugh4KqClsn-3X1yX04hO24owdECnOFSYA0tAxOjFrBrSJAlrmLhyy65F0bnh4YEbZilWEZqfbJ5bhTdzjtpOWSgJTM0", // Placeholder: Flowers/Candle
    },
    {
      id: 2,
      title:
        "Affordable Mortuary Services: Black Tulip Funerals' Options for Families",
      author: "Erica",
      date: "November 14, 2025",
      category: "BTF News",
      excerpt:
        "When families experience the loss of a loved one, one of the first considerations is how to ensure their loved one is cared for with dignity while managing costs. Black Tulip Funerals provides affordable...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aK2ofWZD91BdNdJ8VScVM_dmrdfvgqOt9EBnZuNo5O2vhAUkYfjKV5xW0805I1t5TtEFOq1XprvFfJUi2kWCtkYnrqxnzLM_DBETeb7X0xA0aGFLikzIIJ0HcspOfQW4xGkay4gtngf1kMncHP4Mwqrv_4y2AJy6OFLlAVj6IBezJZhLOiedetAj_RoHSfjrN9FANwKy1KwChHB5saYHusOFZK-wVHQyFrIblwDUdPHc9IFC5r86nq7B-HVtdlwXjZaLeMGuLoI", // Placeholder: Mortuary/Room
    },
    {
      id: 3,
      title: "How Much Does a Prepaid Funeral Cost?",
      author: "Erica",
      date: "November 11, 2025",
      category: "BTF News",
      excerpt:
        "Planning Ahead with Peace of Mind. Thinking about your own funeral may feel uncomfortable, but planning ahead can be one of the most thoughtful gifts you leave for your family...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCc70EEoAxlmw7ad19vm2IrbRZL4s3zUsg3RhWJbY0lh-8Zxsye0bvqnI3JxR0FEnh1kDLzIB5-AKMPZvoKx6SPrQB3t7e3e50GSdCSpjtjQ-33NHMiDVqsS0gQy0Z6iwaBQT6-2e6TdL0i0S6sAo31hkiXFdkRW78ERmxa9-37HoMV9hOZCA2BXuOlWd7pPGTQZXLqK0kH0_zhtF7L86jXZGl6z0uvS1xmoywkD9OXQaB6Dw-P6VLpO2--iLGfAapXeIxhlIfW8tA", // Placeholder: Planning/Calculator
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* Section Header (Optional, remove if not needed) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Latest News & Insights
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay updated with our latest articles, guides, and company
            announcements.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
