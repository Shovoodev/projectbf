import { useState } from "react";
import { Card, List, Select } from "./common/Reusables";

export function Content() {
  const [hearse, setHearse] = useState("");
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-10">
      <Card title="Required Services">
        <List
          items={[
            "Phone or Zoom Consultation",
            "Administration Fees",
            "Registration of Death",
            "Celebrant or Host",
            "Cremation Fee",
            "Transfers from Place of Passing (Sydney Metro 24/7)",
          ]}
        />
      </Card>

      <Card title="Disbursements">
        <List
          items={[
            "Medical Referee Certificate",
            "Cremation Risk Advice",
            "NSW Government Services Levy",
            "Official Death Certificate Issued by BDM",
          ]}
        />
      </Card>

      <Card title="Included Services">
        <List
          items={[
            "Live Video Streaming",
            "SMS Photo Invitation",
            "Photo Slideshow",
            "Photo for Screens in Chapel",
          ]}
        />
      </Card>

      <Card title="Included Variables">
        <Select label="Funeral Stationery" value="50 Memoriam Cards" />
        <Select
          label="Body Preparation"
          value="General Wash | Dress | Makeup"
        />
        <Select label="Coffin" value="Richmond Matt Teak" />
        <Select label="Flowers" value="100cc Mixed Coffin Cover" />
      </Card>

      <Card title="Options">
        <Select
          label="Hearse"
          value={hearse}
          onChange={setHearse}
          options={[
            "No Hearse - Coffin in place",
            "Standard Hearse",
            "Premium Hearse",
          ]}
        />
        <Select label="Bottled Water 600ml" value="Not Required" />
        <Select label="Personalised Tissue Packs" value="Not Required" />
      </Card>
    </div>
  );
}
