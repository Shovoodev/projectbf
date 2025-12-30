const MediaGallery = () => {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGeTchwIIQiaoaW4jPq8tDHCYeAkk36l_IoKlLgBArX-3AWRmiuum31M4_FWX30Bn9SmJQwVDB3Q7ipbmRCkZgDtY_6ihzQoNaUoZ2_QxQ0z5w_WkaAX0h18RRDz187FIaO47_pFFqMDiI1fOx808dokjHgjw9nMIPB7O_kU8y_tGTozvX5Kvv8jjQ42D0FnMG6-ICP7tZHJJ_KPQKW65MHGdK1sFdmpP6cUQqnXAQ8Axh70GTyKyTcighsrAAdm9gOwZTDf6Kri4Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDFZtOdtm9e5SRlXNM_jWl6QUj2-VZRKugusGSQQHomvcB-CJOu6sl6ahcOpPZMYK4YC3nbJs4jgEoqB11xzJGpuWxzBVMYNTxjHT2VibxgNEH_xxXG-fRpgv2J6Foc3qYEKPKVdjALhM52Xn5Ad3CC6T80LKxpe8sMB4fUK_Gxj2IjtWzqaQrF1Hem9PNTUjr3Jk0LKsnPJZ7hY4hlB321ePYl7NOTb8NSZojM4-UDxM5pnqR3RADqpgywW9HSuht6qRWecVuWTdva",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCPPmt-XsnkjYE9xP1YHBoiejd_sz0-eoCBQ0rLt_PdynjO4AMO-R65F7EnaZr3Jra70HVzzDfgcy6NewWVmge6qfa_LGwNtWfObbm44adEAqni_OzmVVjwg_JaCoiQju2J2J-FWnX79SCof_aYLAJWbbXsCYtxZdifJURsNXV1DyikcL5UxxviXF1aFueRjj5aVIJBR1Vd8hB7TZvsC2QgDzuHXHFpTImXFOyzn_kqxfVEjRj3rVn5WSsQlxBG_WkEHespdwp42F",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3O7cvPPgfe_6nB7jHBUmOnfmd76E2XaPJzYaEMbKtnW0nvPopjfS2IwSW3-7B3daDzSTpTpddbfIcpf5Torr1aXZJxtjQ1KLmgw5qxslR4jth8DWih5F-FXGZdKOt3Cn3DtFWYg5O6R1mmFmgPO3pLtpetL5jZv-dBQjy8ly3QcBdFZABc9x8RjfVhWF5i1HJD1Fvo7cFCWlHMcUai_4nGh0jiU2zlBMIjV36MhwXNkYWtnmPWzqB6b0wd7lCYqM-ToOR8bLSSrKb",
  ];

  const videos = [
    {
      src: "https://www.youtube.com/embed/dmDyZ0-ldow",
      title: "Amazing Grace – Timeless Funeral Music for Memorial Services",
    },
    {
      src: "https://www.youtube.com/embed/Ut_Tho2HZ4o",
      title:
        "Ave Maria (Catholic Hymn) – A Peaceful Funeral Song for Healing & Remembrance",
    },
  ];

  return (
    <section className="bg-white pb-16">
      <div className="section-container space-y-12">
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg overflow-hidden shadow-md group"
            >
              <img
                src={src}
                alt="Musician playing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg relative"
            >
              <iframe
                src={video.src}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
