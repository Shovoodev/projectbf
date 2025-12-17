import React from "react";

const Stationery = () => {
  const items = [
    {
      title: "In Loving Memory",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc70EEoAxlmw7ad19vm2IrbRZL4s3zUsg3RhWJbY0lh-8Zxsye0bvqnI3JxR0FEnh1kDLzIB5-AKMPZvoKx6SPrQB3t7e3e50GSdCSpjtjQ-33NHMiDVqsS0gQy0Z6iwaBQT6-2e6TdL0i0S6sAo31hkiXFdkRW78ERmxa9-37HoMV9hOZCA2BXuOlWd7pPGTQZXLqK0kH0_zhtF7L86jXZGl6z0uvS1xmoywkD9OXQaB6Dw-P6VLpO2--iLGfAapXeIxhlIfW8tA",
    },
    {
      title: "Cherished",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe4hR_dtyh6Zh9uRgkvqbhJKUiJSSLEP3NybVuwJGukTVsc0w9CJPSfAvQddg1HiHricvA2Qj9dU5aIgWs7p9X_5z4EKs_nuO-EriuFODaS01nZ0RCoZviK3mRRE0GAE-hsjv5SukAtd8jYkauCe4JPQ0mN0e4ozjyNErh1j20LNfYTUJF1UYmJ3c2t-xtJ4v-_CfW-a2FjyZ4VFgCsHRZYU0qcie5PvYG9UDG5daE534SFJ3yW-Fpf2ln0fIMjC0b1B-ILlcc-vM",
    },
    {
      title: "Remembered",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpMaPWodA3hw0S_3MRm28rzH3-uBNnZrcHo2i5jzzgmTqQwJ62ugmZEUBZey93Ej6fVaBpdm4hvamhBJ3es-nSJZ2Vh7VSIoNaWIB0IWk9xpHkYYTD_I3ehg-KvxM6GlDCtcp9ctM022l7_yiMoEOa9_7dTBvtPEFzvkiOYCykrAJ5YBsI5vEgorC_kTC0CKOumuQCInD6OhkzXeCo7nUlv3BmNAp992f4wBaXPEdZGxgOnz2aorFR6uAtr3P1evbp8GYUoYFJBT4",
    },
    {
      title: "Forever",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpE7OtP5RJnCEt2yX-j1-Zn6uERCWZ4DSq1_73kEykTivr1lG0DxmAJPkzGduGeCGxe7qq5RkFMrrahIQYWEouFOaHoHzVKwYVKlBEpvtJ6L4tqKSKfye3aHjMM4CWkDiHf-ncgtrjbyW8e9YQPMIxLSptGwSsdOML0KKb9MUxPOeVgNGXUkdcjKVvNHjdDOEI7MQqtgqFooNPlxDlMtTEpDw0ZflvRbsHJgzdXaD6kjTUfKJBJ2RVxzw1mmKGMzyXt-i4-J89FTo",
    },
    {
      title: "Legacy",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuU4KmtKfLpo5gZijWwjrZEetc6voFSr2kvggUegf3K_98iRKZRfEagDoSrY8iKkP0cFkexzvrty9tLxSI2_hYGEMd_s7Zswe7m5sA3_xD5sQz8uKDItdrYcrCmNXBmSFqsNX14Jb5bhW7Eh0eeW3AS6m8jTdf1hDTIOBZZ88NMm63QhIHchC-qpZpijgvbSdOw7q7qdLD0trYN2cW5nkqILMrMat5UFDfYNH-pv8dKJzXG1YL5H-k_pbmoR1BtWTxOGnii3SQD3I",
    },
  ];

  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-4">
          SYDNEY'S LARGEST RANGE OF FUNERAL STATIONERY
          <br />
          TISSUE PACKS & COFFIN WRAPS
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="aspect-[3/4] rounded-lg overflow-hidden shadow-md group relative"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-display text-lg font-bold">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500 max-w-4xl mx-auto font-body">
          Preserve the legacy of your loved one with thoughtfully designed
          funeral stationery from Sydney's leading funeral parlours. From
          elegant service booklets to heartfelt thank you cards, each piece
          honours their memory.
        </p>
      </div>
    </section>
  );
};

export default Stationery;
