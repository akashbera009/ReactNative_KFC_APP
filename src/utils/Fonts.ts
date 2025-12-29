import { Platform } from "react-native"
const Fonts = {
    // Cursive / decorative
    firstPageCUrsuve: 'Playball-Regular',
    subHeader: Platform.OS === 'ios' ? 'ZalandoSansSemiExpanded-VariableFont_wght' : 'ZalandoSansSemiExpandedVariableFont_wght',
    font12: Platform.OS === 'ios' ? 'HelveticaNeue-MediumItalic' : 'HelveticaNeueMediumItalic',
    helveticaLight: Platform.OS === 'ios' ? 'HelveticaNeue-Light' : 'HelveticaNeueLight',
    helveticaMedium: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'HelveticaNeueMedium',
    helveticaBold: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeueBold',
    expHead: Platform.OS === 'ios' ? 'Jersey20-Regular' : 'Jersey20-Regular',
    exp: 'RobotoSlab-ExtraBold',
    nationalBold: 'TestNational2Condensed-Bold',
    nationalMedium: 'TestNational2Condensed-Medium',
}
export default Fonts