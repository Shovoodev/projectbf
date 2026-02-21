import mongoose from "mongoose";


const landingAgreementSchema = new mongoose.Schema(
    {
        userid: { type: String, required: true },
        salutation: { type: String, },
        givenName: { type: String, },
        surname: { type: String, },
        dateofdeath: { type: String },
        dateofbirth: { type: String },
        deceasedpersonaddress: { type: String },
        deceasedPassedReason: { type: String },
        deceasedNow: { type: String },
        batterypowereddevices: { type: String },
        regulardoctoraddress: { type: String },
        photo: [{ type: String }],
        kin_salutation: {
            type: String,
            required: true,
        },
        kin_givenName: { type: String, required: true },
        kin_surname: { type: String, required: true },
        kin_currentAddress: { type: String, required: true },
        kin_mobile: { type: String, required: true },
        kin_email: { type: String, required: true },
        kin_relation: { type: String, required: true },
        kin_photo: { type: String },
        kin_sign: { type: String },
        fixedPrice: { type: Number }
    },
    {
        timestamps: true,
    });


export const landingAgreementModel = mongoose.model(
    "landingagreement",
    landingAgreementSchema,
);
export const createDeceasedpersondetail = (values: Record<string, any>) =>
    new landingAgreementModel(values).save().then((user) => user.toObject());

export const getDeceasedByUserId = (userId: string) =>
    landingAgreementModel.findOne({ userid: userId });

export const updateDeceasedByUserId = (
    id: string,
    values: Record<string, any>,
) => landingAgreementModel.findByIdAndUpdate(id, values);

