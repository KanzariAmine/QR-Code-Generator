import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import elements from "../assets/elements_corner.png";
import logo from "../assets/logo.png";

import montserratBold from "/src/assets/fonts/Montserrat-Bold.ttf";
import montserratSemiBold from "/src/assets/fonts/Montserrat-SemiBold.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: montserratSemiBold },
    { src: montserratBold, fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  container: {
    border: "1 solid #000",
    borderRadius: 10,
    // padding: 20,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 500,
    // height: 150,
    // marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: "Montserrat",
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 80,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});

const PDFDocument = ({ imagePath, inputValue }) => {
  const formatted = inputValue.tel
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Image src={elements} style={styles.backgroundImage} />
          <Image src={logo} style={styles.logo} />
          <Text style={{ fontSize: 12 }}>Schéma Unifilaire</Text>
          <Image src={imagePath} style={styles.qrCode} />

          <View style={styles.textContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Nom du Project: </Text>
              <Text style={styles.text}>{inputValue.nom_project}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Téléphone: </Text>
              <Text style={styles.text}>{formatted}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.text}>{inputValue.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Web: </Text>
              <Text style={styles.text}>{inputValue.adresse_web}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
