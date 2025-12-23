import {
  FaApple,
  FaArrowRightLong,
  FaCircleCheck,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

// Reusable Card Component for the main grid
const LinkCard = ({ title, theme, listType, items, children }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`
      rounded-lg p-8 border h-full flex flex-col
      ${
        isDark
          ? "bg-black text-white border-black"
          : "bg-white text-gray-900 border-gray-300"
      }
    `}
    >
      <h3 className="text-2xl font-bold font-display uppercase mb-6 tracking-wide">
        {title}
      </h3>

      <ul className="space-y-4 flex-1">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-lg leading-relaxed"
          >
            {/* Icon Selection based on listType */}
            <span className="mt-1 flex-shrink-0">
              {listType === "arrow" && (
                <FaArrowRightLong
                  className={isDark ? "text-white" : "text-gray-500"}
                />
              )}
              {listType === "check" && (
                <FaCircleCheck
                  className={isDark ? "text-white" : "text-black"}
                />
              )}
            </span>
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              {item.link ? (
                <a href={item.link} className="hover:underline">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* For App Store Buttons or extra content */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

// Reusable Social Card Component
const SocialCard = ({ platform, icon: Icon, theme, items }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`
      rounded-lg p-8 border h-full text-center
      ${
        isDark
          ? "bg-black text-white border-black"
          : "bg-white text-gray-900 border-gray-300"
      }
    `}
    >
      <div className="flex flex-col items-center mb-6">
        <div
          className={`
          w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3
          ${isDark ? "border-white text-white" : "border-black text-black"}
        `}
        >
          <Icon className="text-xl" />
        </div>
        <h3 className="text-2xl font-bold font-display">{platform}</h3>
      </div>

      <ul className="space-y-4 text-left">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-lg leading-relaxed"
          >
            <FaCircleCheck
              className={`mt-1 flex-shrink-0 ${
                isDark ? "text-white" : "text-black"
              }`}
            />
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UsefulLinksSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container space-y-16">
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Stationery */}
          <LinkCard
            title="Black Tulip Funeral Stationery"
            theme="light"
            listType="arrow"
            items={[{ text: "Funeral Poems", link: "#" }]}
          />

          {/* 2. Obituaries */}
          <LinkCard
            title="Obituaries"
            theme="dark"
            listType="check"
            items={[
              { text: "The Sydney Morning Herald Death Notices", link: "#" },
              { text: "My Tributes", link: "#" },
            ]}
          />

          {/* 3. Births, Deaths & Marriages */}
          <LinkCard
            title="Births, Deaths & Marriages NSW"
            theme="light"
            listType="arrow"
            items={[
              { text: "Apply online for a Death Certificate", link: "#" },
              { text: "Apply via Mail for a Death Certificate", link: "#" },
            ]}
          />

          {/* 4. NSW Coroners */}
          <LinkCard
            title="NSW Coroners - Forensic Medicine Support"
            theme="dark"
            listType="check"
            items={[
              { text: "Sydney (02) 9563 9000", link: "tel:0295639000" },
              { text: "Newcastle (02) 4935 9700", link: "tel:0249359700" },
              { text: "Wollongong (02) 4222 5466", link: "tel:0242225466" },
              {
                text: "Initial steps after a death is reported to the Coroner (Brochure)",
                link: "#",
              },
            ]}
          />

          {/* 5. Prayers */}
          <LinkCard
            title="Prayers"
            theme="light"
            listType="check"
            items={[
              { text: "The Lord's Prayer", link: "#" },
              { text: "The Lord's Prayer (Catholic)", link: "#" },
              { text: "Psalm 23", link: "#" },
              { text: "The Funeral Directors Prayer", link: "#" },
            ]}
          />

          {/* 6. Software Applications */}
          <LinkCard
            title="Software Applications"
            theme="dark"
            listType="check"
            items={[
              {
                text: "PHOTOMYNE - Scan & keep memories alive for generations",
                link: "#",
              },
            ]}
          >
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-black border border-gray-600 rounded px-3 py-1.5 text-xs text-white hover:bg-gray-900 transition-colors">
                <FaApple className="text-xl" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[0.6rem]">Download on the</span>
                  <span className="font-bold">App Store</span>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-black border border-gray-600 rounded px-3 py-1.5 text-xs text-white hover:bg-gray-900 transition-colors">
                <FaGooglePlay className="text-xl" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[0.6rem]">GET IT ON</span>
                  <span className="font-bold">Google Play</span>
                </div>
              </button>
            </div>
          </LinkCard>
        </div>

        {/* --- SOCIAL MEDIA SECTION --- */}

        <div>
          <h2 className="text-3xl font-display font-bold text-center uppercase mb-12 text-gray-900">
            Social Media Accounts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SocialCard
              platform="Facebook"
              theme="dark"
              icon={FaFacebookF}
              items={[
                "How to Memorialise a Facebook Account",
                "How to Close a Facebook Account When Someone Dies",
              ]}
                      />
                      
            <SocialCard
              platform="Instagram"
              theme="light"
              icon={FaInstagram}
              items={[
                "How to Memorialise and close an Instagram Account when Someone Dies",
              ]}
            />
            <SocialCard
              platform="Twitter"
              theme="dark"
              icon={FaXTwitter}
              items={["How to Close a Twitter Account When Someone Dies"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsefulLinksSection;




