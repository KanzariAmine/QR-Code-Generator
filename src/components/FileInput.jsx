import React from "react";

const FileInput = ({ onChange }) => {
  return (
    <div className="col-span-2">
      <p className="block text-sm/6 font-medium text-gray-900 mb-2">
        Téléchargement de Fichier
      </p>
      <label htmlFor="file-input" className="sr-only cursor-pointer ">
        Choose file
      </label>
      <input
        type="file"
        name="file-input"
        id="file-input"
        accept=".pdf"
        onChange={onChange}
        className=" block w-full h-11 cursor-pointer border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 focus:border-2 outline-gray-300 disabled:opacity-50 disabled:pointer-events-none
        file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
      />
    </div>
  );
};

export default FileInput;
