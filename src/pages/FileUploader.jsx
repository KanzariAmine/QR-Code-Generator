import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import FileInput from "../components/FileInput";
import FileList from "../components/FileList";
import Input from "../components/Input";
import MyPDFDocument from "../components/MyPDFDocument";
import useToast from "../hooks/useToast";
import Layout from "../layout/Layout";

const FileUploader = () => {
  const inputRef = useRef();
  const { ToastComponent, triggerToast } = useToast("top-right");
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [qrCodePath, setQrCodePath] = useState("");
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState({
    nom_project: "",
    email: "",
    tel: "",
    adresse_web: "",
  });

  const getAllFiles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/file-upload/allFiles`
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

  const submitFile = async () => {
    const token = localStorage.getItem("token");
    if (!file) return;
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/file-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage);
          },
        }
      );

      setQrCodePath(response.data?.qrCodeUrl);
      triggerToast({
        message: response.data.message,
        duration: 3000,
        type: response.data?.qrCodeUrl ? "successes" : "error",
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
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/file-upload/delete_file`,

        {
          params: {
            filename,
          },
        }
      );

      response.data.status === 200 &&
        triggerToast({
          message: response.data.message,
          duration: 3000,
          type: "successes",
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = (file) => {
    setQrCodePath(`${import.meta.env.VITE_APP_BASE_URL}/uploads/${file}`);
  };

  const handleDeleteQrCode = () => {
    setQrCodePath("");
  };

  const handleClick = (message) => {
    triggerToast({
      message,
      duration: 3000,
    });
  };

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center min-h-screen mt-24">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl  ">
            {ToastComponent}

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
                inputType="number"
                placeholder="99 999 999"
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

                  <p className="text-gray-500 text-sm">Aperçu QR Code</p>
                </div>
                <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center rounded-md">
                  {qrCodePath ? (
                    <img src={qrCodePath} />
                  ) : (
                    <p className="text-gray-400">QR Code</p>
                  )}
                </div>
                <div className="mt-4 w-full bg-amber-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
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
                  // disabled={!qrCodePath && !isEmptyObject(inputValue)}
                  className="cursor-pointer mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-white rounded-lg border border-amber-300 hover:bg-amber-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-amber-200"
                >
                  Download PDF
                </button>
              </PDFDownloadLink>
              <button
                type="submit"
                className="mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-white rounded-lg border border-amber-300 hover:bg-amber-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-amber-200"
                onClick={(event) => {
                  event.preventDefault(); // Prevent the default behavior
                  submitFile(); // Call the file submission logic
                }}
              >
                Créer QR Code
              </button>

              <button onClick={() => handleClick("AMINE Hello")}>
                Trigger Toast
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
    </>
  );
};

export default FileUploader;
