const Musicians = () => {
  const instruments = [
    "Vocals",
    "Piano",
    "Violin",
    "Cello",
    "Harp",
    "Guitar",
    "Trumpet",
  ];

  const musicianImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ReYvqSgQNE__FoX0eqzjXh-uHRtoB2rmzYguu28P-lAHReWJIIDMkpOKR1hbHVokBAYahMzqNQvDqKFqrft9z0AwqSiT_J9hAfVsWtIjW8_rnTN0Q26LbKuJu4bKQlN23nDm6XD0SVy3t4HioamOZ8dPfEOqOH0SXuvP3E45P-AGqdq7CcitClINc6VG8UwVjQdKLmn_LTkhUAsff4IWXuqm74H5MKoZAuP-hiJUajLgWWxwHtALvAnXDcdk_HcTV399JqoRDQ4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA9brathtH4n5IXV8HraQAPtjBnXTcGnt6TydxqPku5MwrqjkVzUIlUuDMvYOwvgw3Ta0k9yjblqLCPRkq_YiWdNeoKhBlYPLQ5s6sGITLPo62HuHAjYg48edsxjcD3Y3pgc422jAYeFU4XIciRRQEBsHpPp_S0kvPbkVWBqL6nfkI2YTtDWj-QuDCAIYOpTThFQ2OHryuGu7cEhY1vKwJM0OzDtr-PVL-y6PmcV1SluEB5kGzvlUDH1MXJsP9ZGQK4adyPtecmF4k",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD56HtavHY3zvsKxrNK-9HJRzYwxg6tAhL9lfYB1ys9pVXi_N1o3G_NtFLTcRU1rxCnj0CK3-GrCJXD9vsclYgECkH2nPP-0lLYXF4ZK_uqvHWBq5zKuU2CDrprXJguLI7HLIetH1aQSgzD-CHeCsZRgnAKhUVime7vGy8wqAgdNw7veQn7t0s4Q2Bl3U13R9dctkqECGaCQ-Abj8HkT1vz42yIha9rUUqYBUYfvjBJoQBAjQlI8PeqmRiCCgK48s_Gxi66goASAYc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAOCCpFRjFWjoPbxUddeLDi1pd3plN_E_V0S7TDlhFnxWtMW4MRHIKtrmS_wc8WEg8-I2xjIt61jwalaRdgSsiCCCP7wMgpMcg5UfuI2Fo5DkRcnIQlYe1MkWj9casJQDPP6j0cmROJwwTq8dZGvkGpJPC56qyP6en0yDmmDdj3hRWT4okUqb7N8vC4mYyZLWn_aoskBtSDNX4y4AjtJbzhDZaLrMFtJKhrMNrcRjxBFGDB-9ZsJ2j87S42sx5Eb5pOJK6-rXaS670",
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="section-container">
        <h2 className="heading-lg text-center mb-12">
          LIVE MUSICIANS TO ENHANCE THE EXPERIENCE
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Video Placeholder */}
          <div className="w-full lg:w-3/5 bg-black rounded-xl overflow-hidden shadow-xl aspect-video relative group cursor-pointer">
            <iframe
              className="w-full h-full block"
              src="https://www.youtube.com/embed/Ut_Tho2HZ4o"
              title="Ave Maria (Catholic Hymn) – A Peaceful Funeral Song for Healing &amp; Remembrance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-2/5 space-y-6">
            <h3 className="text-2xl font-display font-bold text-gray-900">
              MUSIC TO YOUR EARS
            </h3>
            <p className="text-gray-600 font-body">
              Patrick Harrison and his amazing team offer a personalized live
              service, catering to your every need.
            </p>
            <div className="flex flex-wrap gap-2">
              {instruments.map((inst) => (
                <span key={inst} className="instrument-tag">
                  {inst}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Musician Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {musicianImages.map((img, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden h-40">
              <img
                src={img}
                alt="Musician"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Musicians;
