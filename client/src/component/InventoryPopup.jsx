import React from 'react'

const InventoryPopup = ({
    createItemPopup,
    setCreateItemPopup,
}) => {

    const handleCancel = () => {
        setCreateItemPopup(false);
    };

    return (
        <div className={`z-[900] w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center ${createItemPopup ? 'scale-1' : 'scale-0 delay-300'} flex flex-col `}>
            <div className={`relative max-[500px]:w-[90%] w-[28rem] px-10 pb-4 pt-5 rounded-xl flex flex-col items-center justify-center text-center ${createItemPopup ? 'scale-1' : 'scale-0'} transition-transform duration-300 `}>
                <div className="w-[512px] mx-auto h-fit  p-4  bg-white shadow-md rounded-lg">
                    sdfsdfsdf

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
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

export default InventoryPopup
