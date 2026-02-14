import React from "react";
import styles from "../Styles";

import { Page, Image } from "@react-pdf/renderer";
const SlipFourtyThreePage = ({ photoSrc }) => {

    return (
        <Page size="A4" style={styles.Photopage} wrap={false}>
            {photoSrc ? <Image src={photoSrc} style={styles.full} /> : null}
        </Page>
    );
};

export default SlipFourtyThreePage;
