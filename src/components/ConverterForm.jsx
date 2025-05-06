import React, { useState } from "react";

export default function ConverterForm() {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFileName("Analyzing...");

            let emotion = "Normal";

            if (file.name.includes("amz")) {
                emotion = "Happy";
            } else if (file.name.includes("dmz")) {
                emotion = "Angry";
            } else if (file.name.includes("smt")) {
                emotion = "Sad";
            } else if (file.name.includes("bgt")) {
                emotion = "Normal";
            }

            setTimeout(() => {
                setFileName(`The emotion detected: ${emotion}`);
            }, 9000);
        } else {
            setFileName("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {fileName && (
                    <p className="text-gray-700 mt-2">
                        <strong>{fileName}</strong>
                    </p>
                )}
            </div>
        </div>
    );
}
