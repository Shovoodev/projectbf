const Hero = () => {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBCu1IkKJqU_-tCxTC6pGy-5awEkJjYXdUdvzRKqhXu8zz23wyAGekmZ54pdrljjZdmEbzq0GuXd7gQOwWSq5vfEFoGcJ6ue8SgOeI7AEHp96u0YFasYUUEFOe0r6iWaaiWbAYg_IMbGIoRLXAdOzfbH4iAPBM3YC9nIpgqA5Bb6WNx1vD4gPTJcIVq7exoRbifXBco6U2V31QviOsrsV9EbvyIvuk28lhWSJqgYVavcB7S_mLO67GqC8CK_M1vVQxJBLjXXEtZIfA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB4bjfa4c-aUlhpS3E-TYqW2tfnLjzAMoVne-5u9RZGUdVlfYE5VqylbVHhCh6h9qpXXKD4OeQs74aTvVMh2PXJreGExKts3HuYt8Yf4Uk5UbPlpxFaMOVGogqY1ARCiVAMTpwPi0gdLIPrk0vSgVH6BXekZ5a2XWPzQHj_3NAJgOMAH1YGBNIndYTg-Rt4qkAMnMTSY6BGI5UM_qrJ9NU4AVpnb3kVTO6LAbpwE2xBh7FnJBoqL4ilO9lCZWAxeef0IaUCT9pAC5Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDeeYzKJ0Ei2VANqVixtpH9BH80-nmkP6vDeHA0mqdHDF_jbDXjHQ3pxqbldTZn30d83Rcd_ItpAmW6dAdYy4-cByLDXJDAl7feAkoORrMQLIA6z_8kruMazv0WxMtCWmkG2Sf_Mj2l8poIlQfFg0aJrOsr0OYR2WcalWfhCcwqqYKZ8DLiZl1Jv1ExRddNWiaw09od9i4T6JYMJ9x2hINBPGUvfbXQjRW2ttdFwKQtT9G_SJ_FmO72OIyJ8Ob7EFgvjzVVzmA3eTs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC2KWxK0H3kktx_gq1PD3S8CmAlJdqqDfIlp-G9TII4RgzkwOXLPcCST5jEIyM6bRWF4MJBPz4UD8JctfXM0-aHzSjgYF8xw3N7-aR7CTHIYEuCQnl_ZYeS419wQytvRk-ylOJILJQRHzqkXc6IbOkSwuQGybJun3cm6e1r-Nws-u7yRcbUXCPl6NZctCxfm4VIZ6pQ1Rszxt0JQz-GjtxpaU2aVS7hl1NRflr-Upd6iGrZxGLgRM-twKWlFJhalDYhfX2Hx1J7d94",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC6idngbMwJ3ZUElKiwv9vCLz5xlJqjcWUxs8jhzYzSxUByB6swdee5pGPZJ6-uRs3tdaEO2kOHVdTgi3nGaEpAYnrUTkOJU_9M2lcIEkX9rNO0NevlF10bRKt3rcshsRpnIb3m85aeg2CUrpO3Wse64I2jvONP-FcwGSoiO4VZJ01A0ZmPqvmDfphipRIqReliqTj3dmQ_v1Q0shDbnxowdnyvcyL68wNLZR159vNEipNcr1dHyeOO4CentmeCn5jDsKBaUKfBBn8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAglgOV6z3kjFqFFZPxB5LYODsi8fDxiJJaNv7o9XzfOtY2YVodvR9TLIzDtBqJktw3g7MD4eCgw4p7vZt6Yv02bR97EOlrGhGOTjk7sN6SDJufRvZnPlgPpqOQzCBwRbkaxRh14lJVRW2hDY1MhjVpb-Y2t8uv0tgdI3r4SV72hta9d5stxIiSusoWGCdreE-_IarnGwl4tiQHb7TBTB3I7__71FH_5Cyp2DmK6p_HyKtubxYUK3vLJ33iBg98KR0jMxCVIaMWuPg",
  ];

  return (
    <section className="pt-16 pb-8 text-center bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="heading-xl text-red-500 ">Black Tulip Funerals</h1>
        <p className="text-lg md:text-xl text-gray-600 font-light mb-12 font-body">
          A place where you're treated like family
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        {/* Adjusted flex to grid for better control, but kept flex feel per design */}
        <div className="flex justify-center items-end gap-2 md:gap-6 flex-wrap opacity-90">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Funeral Moments"
              className={`object-cover rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all duration-500
                ${index % 2 === 0 ? "h-40 md:h-64" : "h-48 md:h-72"}
                ${index === 3 ? "h-56 md:h-80" : ""} 
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
