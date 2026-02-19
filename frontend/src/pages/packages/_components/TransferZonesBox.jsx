import { sydney, urn } from "../../../images";

const TransferZonesBox = () => {

    return (
        <div className="flex-col gap-8 mt-10">
            <div className=" flex  ">
                {/* Zone 2 Box */}
                <div className="w-1/2 bg-gray-50 border border-gray-100 rounded-xl p-8">
                    <h4 className="font-body font-lato font-bold text-gray-900 mb-3">
                        Zone 2 (+ $220)
                    </h4>
                    <ul className="list-disc text-gray-700 space-y-1">
                        <h3>Blue Mountains, Cessnock, Dungog, Bathurst Regional, Goulburn, Kiama, Lithgow, Port Stephens, Shellharbour, Shoalhaven, Singleton, Wingecarribee, Wollongong. </h3>
                    </ul>
                </div>
                {/* Zone 3 Box */}
                <div className="w-1/2 bg-gray-50 border border-gray-100 rounded-xl p-8">
                    <h4 className="font-body font-lato font-bold text-gray-900 mb-3">
                        Zone 3 (+ $385)
                    </h4>
                    <ul className="list-disc text-gray-700 space-y-1">
                        <h3> Blayney, Coffs Harbour, Cootamundra-Gundagai, Cowra, Dubbo Regional, Eurobodalla, Hilltops, Junee, Kempsey, Liverpool Plains, Mid-Coast, Mid-Western Regional, Muswellbrook, Oberon, Orange, Port Macquarie – Hastings, Queanbeyan – Palerang, Upper Hunter Shire, Upper Lachlan Shire, Yass Valley, ACT</h3>
                    </ul>
                </div>
            </div>
            <div className=" flex">
                <div className="w-1/2 rounded-xl p-8 flex" >
                    <img src={sydney} className=" object-cover" />
                </div>
                <div className="w-1/2 rounded-xl p-8 flex" >
                    <img src={urn} className=" object-fit" />
                </div>
            </div>
        </div>
    );
};

export default TransferZonesBox