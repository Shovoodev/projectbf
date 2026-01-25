import React from "react";

function Paragraph() {
  return (
    <section className="py-8 w-full md:max-w-5xl mx-auto px-6">
      <div className="rounded-xl p-8">
        {/* Content */}
        <div className="w-full space-y-4 text-black text-center  font-medium  font-body leading-relaxed ">
          <p className="text-lg text-black ">
            I authorise{" "}
            <strong className="text-gray-900">BLACK TULIP FUNERALS</strong> to
            conduct the given funeral. I understand that I have been given a
            general quote on the entire service and note that there might be
            variations given the condition of the deceased once transferred into
            our care.
          </p>

          <p className="text-lg text-black ">
            All data that I provide in the “Firehawk Link” will be entered
            correctly and is true to the best of my knowledge. I will check all
            fields upon completion and note that I will be liable for any costs
            that incur if an error is presented and/or needs amendment.
          </p>

          <p className="text-lg text-black ">
            I consent to the transfer of the deceased by{" "}
            <strong className="text-gray-900">BLACK TULIP FUNERALS</strong> or
            their nominated transfer companies.
          </p>

          <p className="text-lg text-black ">
            I consent for the services to proceed without any delays and note
            that if I choose to delay the service, cost variations may occur.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Paragraph;
