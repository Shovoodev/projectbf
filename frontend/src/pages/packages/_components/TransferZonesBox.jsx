import { sydney, urn } from "../../../images";

const TransferZonesBox = () => {

    return (
        <div className="flex flex-col gap-8 mt-10">
            {/* ZONES */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Zone 2 Box */}
                <div className="w-full md:w-1/2 bg-gray-50 border border-gray-100 rounded-xl p-5 sm:p-8">
                    <h4 className="font-body font-lato font-bold text-gray-900 mb-3">
                        Zone 2 (+ $220)
                    </h4>

                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li className="text-sm sm:text-base leading-relaxed">
                            Blue Mountains, Cessnock, Dungog, Bathurst Regional, Goulburn, Kiama,
                            Lithgow, Port Stephens, Shellharbour, Shoalhaven, Singleton,
                            Wingecarribee, Wollongong.
                        </li>
                    </ul>
                </div>

                {/* Zone 3 Box */}
                <div className="w-full md:w-1/2 bg-gray-50 border border-gray-100 rounded-xl p-5 sm:p-8">
                    <h4 className="font-body font-lato font-bold text-gray-900 mb-3">
                        Zone 3 (+ $385)
                    </h4>

                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li className="text-sm sm:text-base leading-relaxed">
                            Blayney, Coffs Harbour, Cootamundra-Gundagai, Cowra, Dubbo Regional,
                            Eurobodalla, Hilltops, Junee, Kempsey, Liverpool Plains, Mid-Coast,
                            Mid-Western Regional, Muswellbrook, Oberon, Orange, Port Macquarie –
                            Hastings, Queanbeyan – Palerang, Upper Hunter Shire, Upper Lachlan
                            Shire, Yass Valley, ACT
                        </li>
                    </ul>
                </div>
            </div>

            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 rounded-xl p-3 sm:p-8">
                    <img
                        src={sydney}
                        alt="Sydney"
                        className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl"
                    />
                </div>

                <div className="w-full md:w-1/2 rounded-xl p-3 sm:p-8">
                    <img
                        src={urn}
                        alt="Urn"
                        className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>

    );
};

export default TransferZonesBox