import { Platform } from "react-native"
const Fonts = {
    firstPageCUrsuve: 'Playball-Regular',
    headerRegular: Platform.OS === 'ios' ? 'Rubik-VariableFont_wght':'RubikVariableFont_wght' ,
    headerItalic: 'Rubik-Italic-VariableFont_wght',
    subHeader:  Platform.OS === 'ios' ? 'ZalandoSansSemiExpanded-VariableFont_wght' : 'ZalandoSansSemiExpandedVariableFont_wght',
    kfcLogoTextFont: Platform.OS === 'ios' ? 'RobotoSlab-Regular': 'RobotoSlabRegular',
    exp : 'RobotoSlab-ExtraBold' ,

    bodyBoldFot: 'TestNational2Condensed-Black', 
    font1: 'TestNational2Condensed-BlackItalic', 
    font2: 'TestNational2Condensed-Bold',  
    font3: 'TestNational2Condensed-BoldItalic', 
    font4: 'TestNational2Condensed-Extrabold',  
    font6: 'TestNational2Condensed-Extralight', 
    font7: 'TestNational2Condensed-ExtralightItalic',
    font8: 'TestNational2Condensed-Light', 
    font9: 'TestNational2Condensed-Medium',  
    font10: 'TestNational2Condensed-Regular', 
    font11: 'TestNational2Condensed-ThinItalic', 

    font12: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeueBold', 
    font13: Platform.OS === 'ios' ? 'HelveticaNeue-BoldItalic' : 'HelveticaNeueBoldItalic',
    font14: Platform.OS === 'ios' ? 'HelveticaNeue-Italic' : 'HelveticaNeueItalic',
    font15: Platform.OS === 'ios' ? 'HelveticaNeue-Light' : 'HelveticaNeueLight',
    font16: Platform.OS === 'ios' ? 'HelveticaNeue-LightItalic' : 'HelveticaNeueLightItalic',
    font17: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'HelveticaNeueMedium',
    font18: Platform.OS === 'ios' ? 'HelveticaNeue-MediumItalic' : 'HelveticaNeueMediumItalic',
    font19: Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'HelveticaNeueThin',
    font20: Platform.OS === 'ios' ? 'HelveticaNeue-ThinItalic' : 'HelveticaNeueThinItalic',
    font21: Platform.OS === 'ios' ? 'HelveticaNeue-UltraLight' : 'HelveticaNeueUltraLight',
    expHead: Platform.OS === 'ios' ? 'Jersey20-Regular' : 'Jersey20-Regular',

}
export default Fonts