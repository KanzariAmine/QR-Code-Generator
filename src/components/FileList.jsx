import React, { useState } from "react";
import Modal from "./Modal";
import Portal from "./Portal";

const FileList = ({ files, onDelete, onPreview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"));

  const openModal = (filename) => {
    setFilename(filename);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full mx-auto mt-6 mb-5">
      <h2 className="text-lg font-semibold mb-4">PDF File List</h2>
      {pdfFiles.length > 0 ? (
        <ul className="space-y-2">
          {pdfFiles.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
            >
              <span className="text-sm font-medium">{file}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => onPreview(`${file}-qrcode.png`)}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Preview
                </button>
                <button
                  onClick={() => openModal(file)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No PDF files available.</p>
      )}
      <Portal>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => {
            onDelete(filename);
            closeModal();
          }}
          title="Delete File"
        >
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer
            <span className="font-bold">{filename}</span>? Cette action ne peut
            pas être annulée
          </p>
        </Modal>
      </Portal>
    </div>
  );
};

export default FileList;
