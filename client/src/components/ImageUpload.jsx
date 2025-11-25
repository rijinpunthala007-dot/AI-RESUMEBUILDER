import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

const ImageUpload = ({ onSuccess, onError }) => {
    const [uploading, setUploading] = useState(false);

    const onErrorHandler = (err) => {
        console.log("Error", err);
        setUploading(false);
        if (onError) onError(err);
    };

    const onSuccessHandler = (res) => {
        console.log("Success", res);
        setUploading(false);
        if (onSuccess) onSuccess(res);
    };

    const onUploadStart = () => {
        setUploading(true);
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
            <IKContext
                publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
                urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                authenticationEndpoint="http://localhost:5000/api/imagekit/auth"
            >
                <IKUpload
                    fileName="profile_picture.jpg"
                    onError={onErrorHandler}
                    onSuccess={onSuccessHandler}
                    onUploadStart={onUploadStart}
                    className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
            </IKContext>
            {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
        </div>
    );
};

export default ImageUpload;
