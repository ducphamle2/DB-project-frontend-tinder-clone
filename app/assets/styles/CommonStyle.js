import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import scaleUtil from '../../utils/ScaleUtil';

const { height, width } = Dimensions.get('window');

const cardWid = (width * 7) / 8;
const cardHei = (height * 2) / 3;
const widIconNotifiDetail = cardWid / 8;
const heigIconNotifiDetail = cardWid / 8;
const headerHeight = Header.HEIGHT;

const styles = StyleSheet.create({
    iconDetail: {
        width: widIconNotifiDetail,
        height: heigIconNotifiDetail
    },
    iconPading: {
        width: widIconNotifiDetail - 5,
        height: heigIconNotifiDetail - 5
    },
    txt: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#044128'
    },
    txtScale: {
        fontFamily: 'Josefin Sans',
        fontSize: scaleUtil.scale(11),
        color: '#044128'
    },
    dayTxt: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#AFAFAF'
    },
    txtBold: {
        fontFamily: 'Josefin Sans',
        fontSize: 20,
        color: '#069D61',
        fontWeight: 'bold'
    },
    txtWhite: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#FFFFFF'
    },
    txtGray: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#AFAFAF'
    },
    txtFail: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#DB2222',
        fontWeight: 'bold'
    },
    txtPointTrans: {
        fontFamily: 'Josefin Sans',
        fontSize: 35,
        color: '#666666'
    },
    txtBalace: {
        fontFamily: 'Josefin Sans',
        fontSize: 16,
        color: '#56B34D'
    },
    btnAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width * 2) / 3,
        height: height / 15,
        borderRadius: 25,
        backgroundColor: '#00BF8C'
    },
    btnCancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width * 2) / 3,
        height: height / 15,
        borderRadius: 25,
        backgroundColor: '#096D61',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginTop: 5
    },
    viewMarginTop: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: headerHeight + 20
    },
    boxBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBorderTopRadius: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    cardBorderBottomRadius: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    card: {
        flex: 1,
        borderRadius: 15,
        // height: cardHei,
        // width: cardWid,
        zIndex: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1.0
    },
    colCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: cardWid,
        height: cardHei / 2,
        borderWidth: 1,
        borderBottomColor: 'green'
    },
    boxCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        // marginTop: height / 12
    }
});

export default styles;