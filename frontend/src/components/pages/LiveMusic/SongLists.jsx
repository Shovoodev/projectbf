import React from "react";
import { FaArrowRight, FaMusic } from "react-icons/fa6";

const SongLists = () => {
  const hymns = [
    "How Great Thou Art",
    "Hear I Am Lord",
    "The Old Rugged Cross",
    "Abide with Me",
    "Great Is Thy Faithfulness",
    "The Lord's My Shepherd",
    "Gentle Woman",
    "Be Not Afraid",
    "Prayer of St Francis",
  ];

  const songs = [
    "You Raise Me Up",
    "Hallelujah",
    "Fields of Gold",
    "See You Again",
    "My Way",
    "What a Wonderful World",
    "Danny Boy",
    "Candle in the Wind",
  ];

  return (
    <section className="bg-white pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Hymns */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm h-full">
            <h2 className="text-3xl font-bold font-display mb-6 text-gray-900">
              Popular Church Hymns
            </h2>
            <ul className="space-y-3 text-gray-700 font-body">
              {hymns.map((hymn, idx) => (
                <li key={idx} className="flex items-center">
                  <FaArrowRight className="text-xs mr-3 text-gray-400" /> {hymn}
                </li>
              ))}
            </ul>
          </div>

          {/* Contemporary Songs */}
          <div className="bg-black text-white rounded-lg p-8 shadow-lg h-full">
            <h2 className="text-3xl font-bold font-display mb-6 text-white">
              Popular Contemporary Songs
            </h2>
            <ul className="space-y-3 text-gray-300 font-body">
              {songs.map((song, idx) => (
                <li key={idx} className="flex items-center">
                  <FaMusic className="text-xs mr-3 opacity-70" /> {song}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SongLists;
