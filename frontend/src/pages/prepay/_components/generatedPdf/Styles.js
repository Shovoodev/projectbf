import { StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    // ===============================
    // BASE STYLES
    // ===============================

    p: {
        fontSize: 12,
        lineHeight: 1.6,
        marginBottom: 16,
        color: '#3129A6',
    },

    // ===============================
    // UTILITIES
    // ===============================
    textPdfPrimary: {
        color: '#3129A6',
    },

    textPdfAccent: {
        color: '#00A99D',
    },

    // ===============================
    // COMPONENTS
    // ===============================

    /* Root Layout */
    formContainerBase: {
        width: '100%',
        minHeight: 1123,
        backgroundColor: '#FFFFFF',
        border: '1pt solid #E5E7EB',
        borderRadius: 8,
        padding: 32,
    },

    formHeaderArea: {
        backgroundColor: '#F8FAFC',
        padding: 8,
        borderBottom: '1pt solid #E5E7EB',
    },

    /* Typography */
    pdfH2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A99D',
    },

    pdfSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottom: '1pt solid #E5E7EB',
        paddingBottom: 4,
        marginTop: 4,
        marginBottom: 4,
        color: '#3129A6',
    },

    pdfLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#3129A6',
    },

    pdfLabelSm: {
        fontSize: 14,
        fontWeight: 'black',
        color: '#3129A6',
    },

    pdfIntroP: {
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
        color: '#3129A6',
    },

    /* Inputs (simulated with View/Text) */
    pdfInput: {
        width: '100%',
        border: '1pt solid #D1D5DB',
        borderRadius: 4,
    },

    pdfAdviserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    pdfAdviserLabel: {
        fontSize: 14,
        fontWeight: 'medium',
        color: '#3129A6',
        minWidth: 180,
    },

    pdfInputReadonly: {
        backgroundColor: '#F8FAFC',
        fontWeight: 'semibold',
    },

    /* Radio / Checkbox Groups */
    pdfRadioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 8,
        backgroundColor: '#F8FAFC',
        borderRadius: 6,
        border: '1pt solid #F1F5F9',
    },

    pdfRadioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#3129A6',
    },

    /* Footer */
    pdfFooter: {
        marginTop: 48,
        paddingTop: 4,
        borderTop: '1pt solid #E2E8F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 10,
        color: '#9CA3AF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    /* Buttons (for reference - PDF doesn't have interactive buttons) */
    btnPrimaryPdf: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E3A8A',
        color: '#FFFFFF',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 6,
    },

    btnSecondary: {
        fontWeight: 'bold',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 4,
        color: '#3129A6',
    },

    /* Tables */
    pdfTableWrapper: {
        width: '100%',
    },

    pdfTable: {
        width: '100%',
        marginTop: 16,
        fontSize: 12,
    },

    pdfTableTh: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#00A99D',
    },

    pdfTableTd: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 4,
        borderBottom: '1pt solid #00A99D',
        color: '#3129A6',
    },

    pdfTableTrHighlight: {
        backgroundColor: '#00A99D',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    /* ASP Grid */
    pdfAspGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },

    gridColumn: {
        width: '48%',
        marginRight: '2%',
    },

    /* Declaration */
    pdfDeclarationList: {
        marginTop: 4,
        marginBottom: 4,
    },

    pdfDeclarationItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    pdfDeclarationText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: '#3129A6',
    },

    /* Signature */
    pdfSignatureZone: {
        width: '100%',
        border: '2pt dashed #D1D5DB',
        borderRadius: 8,
        padding: 24,
        backgroundColor: '#F8FAFC',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pdfUploadBtn: {
        backgroundColor: '#FFFFFF',
        border: '1pt solid #D1D5DB',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3129A6',
    },

    /* Misc */
    pdfHr: {
        borderTop: '1pt solid rgba(30, 58, 138, 0.2)',
        marginTop: 24,
        marginBottom: 24,
    },

    pdfInstructionBold: {
        fontSize: 14,
        fontWeight: 'black',
        lineHeight: 1.6,
        marginBottom: 8,
        color: '#3129A6',
    },

    pdfLegalList: {
        paddingLeft: 16,
        marginTop: 4,
    },

    pdfLegalListItem: {
        flexDirection: 'row',
        gap: 4,
        fontSize: 14,
        lineHeight: 1.6,
        color: '#374151',
    },

    pdfLegalLetter: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        minWidth: 15,
        color: '#3129A6',
    },

    pdfAgreementH3: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 18,
        color: '#3129A6',
    },

    // ===============================
    // LAYOUT HELPERS
    // ===============================
    flexRow: {
        flexDirection: 'row',
    },

    flexCol: {
        flexDirection: 'column',
    },

    flexWrap: {
        flexWrap: 'wrap',
    },

    itemsCenter: {
        alignItems: 'center',
    },

    justifyBetween: {
        justifyContent: 'space-between',
    },

    wFull: {
        width: '100%',
    },

    mb4: {
        marginBottom: 16,
    },

    mb2: {
        marginBottom: 8,
    },

    mb1: {
        marginBottom: 4,
    },

    mt4: {
        marginTop: 16,
    },

    mt2: {
        marginTop: 8,
    },

    mt1: {
        marginTop: 4,
    },

    px4: {
        paddingLeft: 16,
        paddingRight: 16,
    },

    py2: {
        paddingTop: 8,
        paddingBottom: 8,
    },

    //slipe 32 
    page: {
        padding: 30,
    },

    mainHeader: {
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3129A6',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#3129A6',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 4,
    },

    pdfHighlightBox: {
        backgroundColor: '#F0F9FF',
        border: '1pt solid #3B82F6',
        padding: 16,
        borderRadius: 6,
        marginBottom: 16,
    },

    noteBox: {
        backgroundColor: '#FEF3C7',
        border: '1pt solid #F59E0B',
        padding: 16,
        borderRadius: 6,
        marginTop: 32,
    },

    // Radio button specific styles
    pdfRadioInput: {
        width: 12,
        height: 12,
        borderRadius: 6,
        border: '1pt solid #3129A6',
        marginRight: 4,
    },

    pdfRadioText: {
        fontSize: 12,
        color: '#3129A6',
    },

    // Additional utility styles
    highlightText: {
        color: '#00A99D',
        fontWeight: 'bold',
    },

    paragraph: {
        fontSize: 12,
        lineHeight: 1.6,
        color: '#3129A6',
    },
});

export default styles;