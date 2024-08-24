import React from 'react'

const CreateItemPopup = ({
    createItemPopup,
    setCreateItemPopup,
    productName,
    setProductName,
    productQuantity,
    setProductQuantity,
    productCostPrice,
    setProductCostPrice,
    productSellingPrice,
    setProductSellingPrice,
    handleSubmit
}) => {

    const handleCancel = () => {
        setProductName("");
        setProductQuantity("");
        setProductCostPrice("");
        setProductSellingPrice("");
        setCreateItemPopup(false);
    };

    return (
        <div className={`z-[900] w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center ${createItemPopup ? 'scale-1' : 'scale-0 delay-300'} flex flex-col `}>
            <div className={`relative max-[500px]:w-[90%] w-[28rem] px-10 pb-4 pt-5 rounded-xl flex flex-col items-center justify-center text-center ${createItemPopup ? 'scale-1' : 'scale-0'} transition-transform duration-300 `}>
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
                            onChange={(e) => setProductQuantity(e.target.value)}
                            value={productQuantity}
                        />
                    </div>
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Cost Price:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setProductCostPrice(e.target.value)}
                            value={productCostPrice}
                        />
                    </div>
                    <div className="flex items-center my-4 space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">Product Selling Price:</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setProductSellingPrice(e.target.value)}
                            value={productSellingPrice}
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
                        onClick={()=>{handleSubmit(),handleCancel()}}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateItemPopup
