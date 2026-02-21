import express from "express";
import { claudinaryConfig } from "../config/cloudinary";
import {
    landingAgreementModel,
    createDeceasedpersondetail,
} from "../db/landingAgreement"; // adjust path
import { AuthenticatedRequest } from "../lib/types";

export const fixedPriceLandingAgreement = async (
    req: AuthenticatedRequest,
    res: express.Response
): Promise<any> => {
    try {
        if (!req.identity) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const existingResponse = await landingAgreementModel.findOne({
            userid: req.identity._id,
        });

        const {
            salutation,
            givenName,
            surname,
            dateofdeath,
            dateofbirth,
            deceasedpersonaddress,
            deceasedPassedReason,
            deceasedNow,
            batterypowereddevices,
            regulardoctoraddress,

            kin_salutation,
            kin_givenName,
            kin_surname,
            kin_currentAddress,
            kin_mobile,
            kin_email,
            kin_relation,
        } = req.body;

        // ✅ Handle multer fields upload
        // Expecting: upload.fields([{name:'photo'},{name:'kin_photo'},{name:'kin_sign'}])
        const files = (req.files || {}) as {
            [fieldname: string]: Express.Multer.File[];
        };

        // multiple deceased photos
        const deceasedPhotos: string[] = [];
        const photoFiles = files?.photo || [];
        for (const file of photoFiles) {
            const uploaded = await claudinaryConfig().uploader.upload(file.path, {
                folder: "landing-agreement/deceased",
            });
            deceasedPhotos.push(uploaded.secure_url);
        }

        // single kin photo
        let kinPhotoUrl: string | undefined;
        const kinPhotoFile = files?.kin_photo?.[0];
        if (kinPhotoFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinPhotoFile.path, {
                folder: "landing-agreement/kin",
            });
            kinPhotoUrl = uploaded.secure_url;
        }

        // single kin sign
        let kinSignUrl: string | undefined;
        const kinSignFile = files?.kin_sign?.[0];
        if (kinSignFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinSignFile.path, {
                folder: "landing-agreement/sign",
            });
            kinSignUrl = uploaded.secure_url;
        }

        let savedResponse;

        if (existingResponse) {
            // update fields
            existingResponse.salutation = salutation;
            existingResponse.givenName = givenName;
            existingResponse.surname = surname;
            existingResponse.dateofdeath = dateofdeath;
            existingResponse.dateofbirth = dateofbirth;
            existingResponse.deceasedpersonaddress = deceasedpersonaddress;
            existingResponse.deceasedPassedReason = deceasedPassedReason;
            existingResponse.deceasedNow = deceasedNow;
            existingResponse.batterypowereddevices = batterypowereddevices;
            existingResponse.regulardoctoraddress = regulardoctoraddress;

            existingResponse.kin_salutation = kin_salutation;
            existingResponse.kin_givenName = kin_givenName;
            existingResponse.kin_surname = kin_surname;
            existingResponse.kin_currentAddress = kin_currentAddress;
            existingResponse.kin_mobile = kin_mobile;
            existingResponse.kin_email = kin_email;
            existingResponse.kin_relation = kin_relation;

            // ✅ only overwrite if new uploads exist
            if (deceasedPhotos.length) {
                // choose one:
                // existingResponse.photo = deceasedPhotos; // overwrite
                existingResponse.photo = [...(existingResponse.photo || []), ...deceasedPhotos]; // append
            }
            if (kinPhotoUrl) existingResponse.kin_photo = kinPhotoUrl;
            if (kinSignUrl) existingResponse.kin_sign = kinSignUrl;

            savedResponse = await existingResponse.save();
        } else {
            savedResponse = await createDeceasedpersondetail({
                userid: req.identity._id,

                salutation,
                givenName,
                surname,
                dateofdeath,
                dateofbirth,
                deceasedpersonaddress,
                deceasedPassedReason,
                deceasedNow,
                batterypowereddevices,
                regulardoctoraddress,
                photo: deceasedPhotos,

                kin_salutation,
                kin_givenName,
                kin_surname,
                kin_currentAddress,
                kin_mobile,
                kin_email,
                kin_relation,

                kin_photo: kinPhotoUrl,
                kin_sign: kinSignUrl,

                fixedPrice: 6600
            });
        }

        return res.status(201).json({
            message: "Landing agreement saved successfully",
            data: savedResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const LandingPageAgreement = async (
    req: AuthenticatedRequest,
    res: express.Response
): Promise<any> => {
    try {
        if (!req.identity) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const existingResponse = await landingAgreementModel.findOne({
            userid: req.identity._id,
        });

        const {
            salutation,
            givenName,
            surname,
            dateofdeath,
            dateofbirth,
            deceasedpersonaddress,
            deceasedPassedReason,
            deceasedNow,
            batterypowereddevices,
            regulardoctoraddress,

            kin_salutation,
            kin_givenName,
            kin_surname,
            kin_currentAddress,
            kin_mobile,
            kin_email,
            kin_relation,
        } = req.body;

        // ✅ Handle multer fields upload
        // Expecting: upload.fields([{name:'photo'},{name:'kin_photo'},{name:'kin_sign'}])
        const files = (req.files || {}) as {
            [fieldname: string]: Express.Multer.File[];
        };

        // multiple deceased photos
        const deceasedPhotos: string[] = [];
        const photoFiles = files?.photo || [];
        for (const file of photoFiles) {
            const uploaded = await claudinaryConfig().uploader.upload(file.path, {
                folder: "landing-agreement/deceased",
            });
            deceasedPhotos.push(uploaded.secure_url);
        }

        // single kin photo
        let kinPhotoUrl: string | undefined;
        const kinPhotoFile = files?.kin_photo?.[0];
        if (kinPhotoFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinPhotoFile.path, {
                folder: "landing-agreement/kin",
            });
            kinPhotoUrl = uploaded.secure_url;
        }

        // single kin sign
        let kinSignUrl: string | undefined;
        const kinSignFile = files?.kin_sign?.[0];
        if (kinSignFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinSignFile.path, {
                folder: "landing-agreement/sign",
            });
            kinSignUrl = uploaded.secure_url;
        }

        let savedResponse;

        if (existingResponse) {
            // update fields
            existingResponse.salutation = salutation;
            existingResponse.givenName = givenName;
            existingResponse.surname = surname;
            existingResponse.dateofdeath = dateofdeath;
            existingResponse.dateofbirth = dateofbirth;
            existingResponse.deceasedpersonaddress = deceasedpersonaddress;
            existingResponse.deceasedPassedReason = deceasedPassedReason;
            existingResponse.deceasedNow = deceasedNow;
            existingResponse.batterypowereddevices = batterypowereddevices;
            existingResponse.regulardoctoraddress = regulardoctoraddress;

            existingResponse.kin_salutation = kin_salutation;
            existingResponse.kin_givenName = kin_givenName;
            existingResponse.kin_surname = kin_surname;
            existingResponse.kin_currentAddress = kin_currentAddress;
            existingResponse.kin_mobile = kin_mobile;
            existingResponse.kin_email = kin_email;
            existingResponse.kin_relation = kin_relation;

            // ✅ only overwrite if new uploads exist
            if (deceasedPhotos.length) {
                // choose one:
                // existingResponse.photo = deceasedPhotos; // overwrite
                existingResponse.photo = [...(existingResponse.photo || []), ...deceasedPhotos]; // append
            }
            if (kinPhotoUrl) existingResponse.kin_photo = kinPhotoUrl;
            if (kinSignUrl) existingResponse.kin_sign = kinSignUrl;

            savedResponse = await existingResponse.save();
        } else {
            savedResponse = await createDeceasedpersondetail({
                userid: req.identity._id,

                salutation,
                givenName,
                surname,
                dateofdeath,
                dateofbirth,
                deceasedpersonaddress,
                deceasedPassedReason,
                deceasedNow,
                batterypowereddevices,
                regulardoctoraddress,
                photo: deceasedPhotos,

                kin_salutation,
                kin_givenName,
                kin_surname,
                kin_currentAddress,
                kin_mobile,
                kin_email,
                kin_relation,

                kin_photo: kinPhotoUrl,
                kin_sign: kinSignUrl,
            });
        }

        return res.status(201).json({
            message: "Landing agreement saved successfully",
            data: savedResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};