import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  CogIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  ArrowPathRoundedSquareIcon,
  PhotoIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleDrop(acceptedFiles) {
    const selected = acceptedFiles[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  }

  async function handleSubmit() {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setPreview(null);
    setResult(null);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[600px] bg-white border border-green-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 space-y-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold">Potato Disease Predictor</h1>
          <p className="text-gray-600 mt-2">
            Upload a potato leaf image and my CNN model will predict the disease
          </p>
        </div>

        <div className="bg-green-50 border-2 border-dashed border-green-900 rounded-lg p-8">
          <Dropzone
            onDrop={handleDrop}
            accept={{ "image/*": [] }}
            minSize={64}
            maxSize={10 * 1024 * 1024}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div className="flex flex-col items-center text-center gap-3 cursor-pointer" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <CloudArrowUpIcon className="w-12 h-12 text-green-700" />
                  <h3 className="text-xl font-semibold">
                    Upload Potato Leaf Image
                  </h3>
                  <p className="text-gray-600">
                    Drag & drop an image here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, JPEG | Max 10MB
                  </p>
                </div>
              );
            }}
          </Dropzone>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="flex items-center gap-2 px-5 py-3 rounded-sm bg-green-600 text-white disabled:opacity-50"
          >
            <SparklesIcon className="w-6 h-6" />
            <span>{loading ? "Predicting..." : "Predict Disease"}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 rounded-sm bg-white text-black border border-green-900"
          >
            <ArrowPathRoundedSquareIcon className="w-6 h-6" />
            <span>Reset</span>
          </button>
        </div>

        {preview && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PhotoIcon className="w-6 h-6" />
              <p className="font-semibold">Image Preview</p>
            </div>

            <div className="border rounded-lg p-4">
              <img
                src={preview}
                alt="preview"
                className="rounded-lg max-h-64 mx-auto"
              />
            </div>
          </div>
        )}

        {result && (
          <div className="bg-green-100 p-4 rounded-lg space-y-2">
            <p><b>Disease:</b> {result.pred_class}</p>
            <p>
              <b>Confidence:</b>{" "}
              {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}

        <footer className="flex items-center justify-center gap-2 text-gray-600 text-sm">
          <ShieldCheckIcon className="w-6 h-6" />
          <span>Your images are processed securely and are not stored.</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
