export function Header() {
  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-10">
      <div>
        <h1 className="font-serif text-4xl mb-4">
          Attending Service Cremation
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Black Tulip Funerals offers a respectful and simple farewell, allowing
          family and close friends to be present during the cremation service.
          It provides a meaningful opportunity to honor your loved one in a
          calm, dignified, and supportive setting.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg px-8 py-6 text-center">
        <div className="text-sm text-gray-500">Price</div>
        <div className="text-4xl font-bold">$4899</div>
      </div>
    </div>
  );
}
