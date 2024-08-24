import React, { useState, useEffect } from 'react';

const EditPopup = ({ setEditPopup, editpopup, edititem }) => {

    const [productID, setProductId] = useState(edititem?._id || "")
    const [productName, setProductName] = useState(edititem?.productName || "");
    const [quantity, setQuantity] = useState(edititem?.quantity || "");
    const [cp, setCp] = useState(edititem?.cp || "");
    const [sp, setSp] = useState(edititem?.sp || "");

    useEffect(() => {
        if (edititem) {
            setProductName(edititem.productName);
            setQuantity(edititem.quantity);
            setCp(edititem.cp);
            setSp(edititem.sp);
        }
    }, [edititem]);

    const handleCancel = () => {
        setEditPopup(false);
    };

    const handleSubmit = async () => {
        const updatedItem = {
            productID,
            productName,
            quantity,
            cp,
            sp,
        };

        setEditPopup(false);
    };

    return (
        <div className={`z-[900] w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center ${editpopup ? 'scale-1' : 'scale-0 delay-300'} flex flex-col `}>
            <div className={`relative max-[500px]:w-[90%] w-[28rem] px-10 pb-4 pt-5 rounded-xl flex flex-col items-center justify-center text-center ${editpopup ? 'scale-1' : 'scale-0'} transition-transform duration-300 `}>
                <div className="w-[512px] mx-auto h-fit  p-4  bg-white shadow-md rounded-lg">
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Name:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                        />
                    </div>
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Quantity:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                        />
                    </div>
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Cost Price:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setCp(e.target.value)}
                            value={cp}
                        />
                    </div>
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Selling Price:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSp(e.target.value)}
                            value={sp}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
