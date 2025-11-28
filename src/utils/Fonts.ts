import { Platform } from "react-native"
const Fonts = {
    firstPageCUrsuve: 'Playball-Regular',
    headerRegular: Platform.OS === 'ios' ? 'Rubik-VariableFont_wght':'RubikVariableFont_wght.ttf' ,
    headerItalic: 'Rubik-Italic-VariableFont_wght',
    subHeader:  Platform.OS === 'ios' ? 'ZalandoSansSemiExpanded-VariableFont_wght' : 'ZalandoSansSemiExpandedVariableFont_wght',
    kfcLogoTextFont: Platform.OS === 'ios' ? 'RobotoSlab-Regular': 'RobotoSlabRegular',
    // exp :  Platform.OS === 'ios' ? 'RobotoSlab-ExtraBold': 'RobotoSlabExtraBold',
    exp :  Platform.OS === 'ios' ? 'RobotoSlab-ExtraBold': 'RobotoSlabExtraBold' ,

    bodyBoldFot:Platform.OS === 'ios' ? 'TestNational2Condensed-Black': 'TestNational2CondensedBlack', // ok
    font1: 'TestNational2Condensed-BlackItalic',// ok
    font2: 'TestNational2Condensed-Bold', // ok
    font3: 'TestNational2Condensed-BoldItalic',// ok
    font4: 'TestNational2Condensed-Extrabold', // ok
    // font5: 'TestNational2Condensed-BlkItalic',// ok (not in the file )
    font6: 'TestNational2Condensed-Extralight',// ok
    font7: 'TestNational2Condensed-ExtralightItalic',
    font8: 'TestNational2Condensed-Light',// ok
    font9: 'TestNational2Condensed-Medium', // ok
    font10: 'TestNational2Condensed-Regular',// ok
    font11: 'TestNational2Condensed-ThinItalic',// ok

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

}
export default Fonts