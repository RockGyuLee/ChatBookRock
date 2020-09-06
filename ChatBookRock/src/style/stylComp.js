import { StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({

    appColor : {
      color : "#89B2E9"
    },
    container: {
      flex: 1,
    },
    scrollView: {
      backgroundColor: Colors.Header,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    searchTextInput : {
      borderColor: "#89B2E9",
      borderWidth: 2,
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    textArea : {
      marginTop: 10,
      marginLeft : 10,
      width : "80%",
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: "#89B2E9",
      borderRadius: 6,
      backgroundColor: "#FFFFFF",
      color: "#20232a",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "bold"
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    panelView : {
      backgroundColor: "white",
      borderColor: "#89B2E9",
      borderWidth: 2,
      height: 120,
      margin: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  });
