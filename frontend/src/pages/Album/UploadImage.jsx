import React, { useState } from 'react';
import { Upload, Tag as TagIcon, User as UserIcon, Plus, Hammer } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import { uploadImageApi } from '../../api/image/uploadImageApi';
import { handleSuccess } from '../../message/success.message';
import { handleError } from '../../message/error.message';

export const UploadImage = ({ onClose }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState([]);
    const [imageName, setImageName] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [personInput, setPersonInput] = useState("");
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // --- File Handlers ---
    const handleFileSelect = (e) => {
        const selected = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selected]);
        const previews = selected.map(file => URL.createObjectURL(file));
        setPreview(prev => [...prev, ...previews]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...dropped]);
        const previews = dropped.map(file => URL.createObjectURL(file));
        setPreview(prev => [...prev, ...previews]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // --- Tags ---
    const addTag = () => {
        if (!tagInput.trim()) return;
        setTags(prev => [...prev, tagInput.trim()]);
        setTagInput("");
    };

    // --- Persons ---
    const addPerson = () => {
        if (!personInput.trim()) return;
        setPersons(prev => [...prev, personInput.trim()]);
        setPersonInput("");
    };

    // --- Upload Handler ---
    const handleUpload = async () => {
        if (files.length === 0) {
            handleError("Please select at least one image to upload");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();

            if (imageName.trim()) formData.append("name", imageName.trim());
            if (tags.length > 0) formData.append("tags", JSON.stringify(tags));
            if (persons.length > 0) formData.append("people", JSON.stringify(persons));

            files.forEach(file => formData.append("images", file));

            console.log(formData);
            const result = await uploadImageApi(id, formData);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                window.location.reload();
            }
            else handleError(message || error);

            onClose();
        } catch (err) {
            handleError(err.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">

            {loading && (
                <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
                    <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-purple-700 font-medium text-sm sm:text-base">Uploading, please wait...</p>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">

                <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 px-4 sm:px-8 py-4 sm:py-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white text-lg sm:text-xl">Upload Your Reports</h2>
                        <button className="p-2 hover:bg-white/20 rounded-lg text-white" onClick={onClose}>
                            <Hammer className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-purple-100 mt-2 text-xs sm:text-sm">Add Reports to your album with details</p>
                </div>

                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">

                    {/* Upload Zone */}
                    <div
                        className={`border-2 border-dashed rounded-2xl p-4 sm:p-8 text-center
                            ${isDragging ? "border-purple-600 bg-purple-50" : "border-purple-200 bg-white"}
                        `}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl mb-2 sm:mb-4">
                            <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                        </div>

                        <p className="text-gray-900 text-sm sm:text-base mb-2">Drag and drop images here</p>

                        <label className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl cursor-pointer text-sm sm:text-base">
                            Choose Files
                            <input type="file" multiple className="hidden" onChange={handleFileSelect} />
                        </label>
                    </div>

                    {/* Preview */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {preview.map((src, idx) => (
                            <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <img src={src} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Image Name */}
                    <div>
                        <label className="block text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Image Name</label>
                        <input
                            type="text"
                            placeholder="Leave empty to use file name"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-200 rounded-xl text-sm sm:text-base"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tags</label>
                        <div className="flex gap-2 mb-2 sm:mb-3">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="e.g., vacation, sunset"
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-purple-200 rounded-xl text-sm sm:text-base"
                            />
                            <button onClick={addTag} className="px-3 sm:px-4 py-2 sm:py-3 bg-purple-100 text-purple-700 rounded-xl">
                                <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                            {tags.length > 0 ? (
                                tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-purple-100 text-purple-700 rounded-xl">
                                        <TagIcon className="w-3 h-3" /> {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm sm:text-base italic">No tags added</span>
                            )}
                        </div>
                    </div>

                    {/* Persons */}
                    <div>
                        <label className="block text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Person in Photo</label>
                        <div className="flex gap-2 mb-2 sm:mb-3">
                            <input
                                type="text"
                                value={personInput}
                                onChange={(e) => setPersonInput(e.target.value)}
                                placeholder="e.g., John Doe"
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-purple-200 rounded-xl text-sm sm:text-base"
                            />
                            <button onClick={addPerson} className="px-3 sm:px-4 py-2 sm:py-3 bg-purple-100 text-purple-700 rounded-xl">
                                <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                            {persons.length > 0 ? (
                                persons.map((p, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-purple-100 text-purple-700 rounded-xl">
                                        <UserIcon className="w-3 h-3" /> {p}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm sm:text-base italic">No persons mentioned</span>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                        <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base" onClick={onClose}>
                            Cancel
                        </button>

                        <button
                            onClick={handleUpload}
                            disabled={loading || files.length === 0}
                            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white text-sm sm:text-base
                                ${loading || files.length === 0 ? "bg-purple-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-600 to-purple-600"}
                            `}
                        >
                            {loading ? "Uploading..." : `Upload (${files.length})`}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};