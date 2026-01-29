import { StyleSheet, Font } from '@react-pdf/renderer';

// Font.register({
//     family: 'Roboto',
//     fonts: [
//         { src: '/fonts/Roboto-Regular.ttf' },
//         { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
//     ],
// });

const styles = StyleSheet.create({
    page: {
        // fontFamily: 'Roboto',
        fontSize: 11,
        color: '#3129A6',
        backgroundColor: '#ffffff',
    },

    container: {
        flex: 1,
    },

    formContainerBase: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
    },

    paragraph: {
        fontSize: 11,
        lineHeight: 1.625,
        marginBottom: 16,
    },

    pdfH2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    pdfLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    pdfInput: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
        fontSize: 11,
        backgroundColor: '#ffffff',
    },

    pdfRadioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },

    pdfRadioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
        marginBottom: 8,
    },

    pdfRadioInput: {
        width: 14,
        height: 14,
        borderWidth: 1,
        borderColor: '#93c5fd',
        backgroundColor: '#dbeafe',
        marginRight: 8,
    },

    pdfCheckboxBox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#93c5fd',
        backgroundColor: '#dbeafe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pdfTable: {
        width: '100%',
        marginTop: 16,
    },

    pdfTableTh: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        fontWeight: 'bold',
        lineHeight: 1.25,
    },

    pdfTableTd: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#4BA6A6',
    },

    pdfInfoBox: {
        marginTop: 24,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#1e40af',
        backgroundColor: '#dbeafe',
        fontSize: 11,
        lineHeight: 1.625,
    },

    noteBox: {
        fontSize: 11,
        lineHeight: 1.5,
        marginTop: 24,
        padding: 16,
        backgroundColor: '#f8fafc',
        borderLeftWidth: 4,
        borderLeftColor: '#d1d5db',
    },

    pdfFooter: {
        marginTop: 48,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 9,
    },

    spacer: { height: 16 },
    spacerSm: { height: 8 },
    spacerLg: { height: 32 },

    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
    textLeft: { textAlign: 'left' },

    flexRow: { flexDirection: 'row' },
    flexCol: { flexDirection: 'column' },
    itemsCenter: { alignItems: 'center' },
    justifyBetween: { justifyContent: 'space-between' },

    rounded: { borderRadius: 4 },
    roundedMd: { borderRadius: 6 },
    roundedLg: { borderRadius: 8 },
    roundedFull: { borderRadius: 9999 },
});

export default styles;
