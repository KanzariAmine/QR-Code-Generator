import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import FileInput from "../components/FileInput";
import FileList from "../components/FileList";
import Input from "../components/Input";
import MyPDFDocument from "../components/MyPDFDocument";
import Spinner from "../components/Spinner";
import useToast from "../hooks/useToast";
import Layout from "../layout/Layout";
import { isEmptyObject } from "../util/index";
const FileUploader = () => {
  const inputRef = useRef();
  const { ToastComponent, triggerToast } = useToast("top-right");
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [qrCodePath, setQrCodePath] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sharedLinkState, setSharedLinkState] = useState("");
  const [inputValue, setInputValue] = useState({
    nom_project: "",
    email: "",
    tel: "",
    adresse_web: "",
  });

  const getAllFiles = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}all-file`,
        {
          path: "",
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || ""
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      setAllFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  const handleChange = (evt) => {
    setFile(evt.target.files[0]);
  };

  const saveFile = async () => {
    const formData = new FormData();
    formData.append("path", "");
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || ""
            }`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage);
          },
        }
      );

      const sharedLinK = await getSharedLink(response?.data?.path_display);
      return sharedLinK;
    } catch (error) {
      console.error(error);
    }
  };

  const getSharedLink = async (filename) => {
    const body = {
      path: filename,
    };
    try {
      setQrCodePath("");
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}shared-link`,
        body,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || ""
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setSharedLinkState(response?.data);
      getAllFiles();
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const generateQrCode = async (fileLink) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}generate-qr-code`,
        {
          params: {
            data: fileLink,
          },
        }
      );

      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const submitFile = async () => {
    const token = localStorage.getItem("token");
    if (!file) return;
    setFileName(file.name);
    const formData = new FormData();

    try {
      const fileUrl = await saveFile();
      const qRCodeUrl = await generateQrCode(fileUrl);

      // const response = await axios.post(
      //   `${import.meta.env.VITE_APP_BASE_URL}/file-upload/upload`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${
      //         localStorage.getItem("access_token") || ""
      //       }`,
      //     },
      //     onUploadProgress: (progressEvent) => {
      //       const percentage = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setProgress(percentage);
      //     },
      //   }
      // );

      setQrCodePath(qRCodeUrl);
      return triggerToast({
        message: "QR Code généré avec succès",
        duration: 3000,
        type: qRCodeUrl ? "successes" : "error",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteFile = async (filename) => {
    const body = {
      path: `/${filename}`,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}delete-file`,
        body,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || ""
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      response.status === 201 &&
        triggerToast({
          message: `Le ficher ${filename} a été supprimé avec succès`,
          duration: 3000,
          type: "successes",
        });
      setInputValue("");
      setQrCodePath("");
      getAllFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = async (file) => {
    const sharedLinK = await getSharedLink(file?.path_display);
    const qRCodeUrl = await generateQrCode(sharedLinK);
    setQrCodePath(qRCodeUrl);
    window.open(sharedLinK, "_blank");
    // setQrCodePath(`${import.meta.env.VITE_APP_BASE_URL}/uploads/${file}`);
  };

  const handleDeleteQrCode = () => {
    setQrCodePath("");
  };

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center min-h-screen mt-24">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl  ">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Project Name */}
              <Input
                label="Nom du Project"
                inputType="text"
                placeholder="Nom du Project"
                name="nom_project"
                value={inputValue.nom_project}
                onChange={handleOnChange}
              />

              {/* Email */}
              <Input
                label="Email"
                inputType="email"
                placeholder="example@gmail.com"
                name="email"
                value={inputValue.email}
                onChange={handleOnChange}
              />

              {/* Phone */}
              <Input
                label="Téléphone"
                inputType="phone"
                placeholder="99 999 999"
                pattern="\d{2} \d{3} \d{3}"
                name="tel"
                value={inputValue.tel}
                onChange={handleOnChange}
              />

              {/* Website */}
              <Input
                label="Adresse Web"
                inputType="text"
                placeholder="www.example.com"
                name="adresse_web"
                value={inputValue.adresse_web}
                onChange={handleOnChange}
              />

              {/* File Upload */}
              <FileInput onChange={handleChange} />

              {/* QR Code Preview */}
              <div className="sm:col-span-2 flex flex-col items-center border border-dashed border-gray-400 rounded-lg p-6 ">
                <div className="flex justify-center items-center flex-row-reverse mb-4">
                  {qrCodePath && (
                    <HiOutlineXMark
                      className="size-6 text-red-500  cursor-pointer"
                      onClick={handleDeleteQrCode}
                    />
                  )}

                  <p className="text-gray-500 text-sm font-montserrat font-normal">
                    Aperçu QR Code
                  </p>
                </div>
                <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center rounded-md">
                  {qrCodePath ? (
                    <img src={qrCodePath} />
                  ) : !loading ? (
                    <p className="text-gray-400 font-montserrat font-normal">
                      QR Code
                    </p>
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div className="mt-4 w-full bg-amber-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full font-montserrat font-normal"
                    style={{ width: `${progress ?? 0}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{progress}%</p>
              </div>

              {/* Buttons */}
            </form>
            <div className="sm:col-span-2 flex justify-between gap-4">
              <PDFDownloadLink
                document={
                  <MyPDFDocument
                    imagePath={qrCodePath}
                    inputValue={inputValue}
                  />
                }
                fileName={fileName}
              >
                <button
                  disabled={!qrCodePath && !isEmptyObject(inputValue)}
                  className="mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-white rounded-lg border border-amber-300 hover:bg-amber-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-amber-200 font-montserrat"
                >
                  Download PDF
                </button>
              </PDFDownloadLink>
              <button
                type="submit"
                className="mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-white rounded-lg border border-amber-300 hover:bg-amber-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-amber-200 font-montserrat"
                onClick={(event) => {
                  event.preventDefault(); // Prevent the default behavior
                  submitFile(); // Call the file submission logic
                }}
              >
                Créer QR Code
              </button>
            </div>

            <FileList
              files={allFiles}
              onDelete={handleDeleteFile}
              onPreview={handlePreview}
            />
          </div>
        </div>
      </Layout>
      {ToastComponent}
    </>
  );
};

export default FileUploader;
