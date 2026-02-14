import React from "react";
import styles from "../Styles";

const SlipFourtyThreePage = () => {
    return (
        <Page size="A4" style={styles.Photopage} wrap={false}>
            <Image
                src="/42.jpg"         // ✅ put the image in your public folder
                style={styles.full}
            />
        </Page>
    );
};

export default SlipFourtyThreePage;
