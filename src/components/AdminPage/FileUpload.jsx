import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
const FileUpload = ({ setPropertyImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setPropertyImage(acceptedFiles[0]);
    },
  });
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <div
      {...getRootProps()}
      className="p-3 border border-dotted bg-gray-300 cursor-pointer"
    >
      <input {...getInputProps()} />
      {file && <p>{file.name}</p>}
      <p>Drag and drop files here or click to browse.</p>
    </div>
  );
};
export default FileUpload;
