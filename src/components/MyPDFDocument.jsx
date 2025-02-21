import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import Logo_Kanpower from "../assets/Logo_Kanpower.png";

const MyPDFDocument = ({ imagePath, inputValue }) => {
  // const { nom_project, email, tel, adresse_web } = inputValue;
  // Define styles for the PDF
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFF",
      color: "#000",
      padding: 20,
      fontFamily: "Helvetica",
    },
    container: {
      border: "1px solid #000",
      padding: 20,
      borderRadius: 10,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: "center",
    },
    content: {
      marginTop: 15,
      marginLeft: 15,
      lineHeight: 1.6,
    },
    text: {
      fontSize: 15,
      marginBottom: 8,
    },
    qrContainer: {
      width: 150,
      height: 150,
    },
    bodyContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
    },
    titleContainer: {
      with: 100,
      height: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.titleContainer}>
            <Image src={Logo_Kanpower} />
          </View>

          {/* Contact Information */}
          <View style={styles.bodyContainer}>
            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.title}>Nom du Project: </Text>{" "}
                {inputValue.nom_project}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Téléphone: </Text>
                {inputValue.tel}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Email: </Text> {inputValue.email}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.title}>Web: </Text> {inputValue.adresse_web}
              </Text>
            </View>

            {/* QR Code Placeholder */}
            <View style={styles.qrContainer}>
              <Image src={imagePath} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyPDFDocument;
