import React, { useEffect } from 'react'
import { getItemList } from '../toolkit/slices/ProductApi.slice';
import { useDispatch, useSelector } from 'react-redux';

const InventoryPopup = ({ addedProducts, handleInputChange, setAddedProducts, createItemPopup, setCreateItemPopup, }) => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productApi)

    useEffect(() => {
        dispatch(getItemList())
    }, []);

    const handleCancel = () => {
        setCreateItemPopup(false);
    };

    const handleAddProduct = (item) => {
        setAddedProducts([...addedProducts, {
            productID: item._id,
            productName: item.productName,
            quantity: 1,
            price: item.sp,
            amount: '',
        }])
    }

    useEffect(() => {
        addedProducts.map((product, index) => {
            handleInputChange(index, 'quantity', product.quantity ?? 1)
        })
    }, [addedProducts])

    return (
        <div className={`z-[900] w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center ${createItemPopup ? 'scale-1' : 'scale-0 delay-300'} flex flex-col `}>
            <div className={`relative max-w-[45rem] max-[500px]:w-[90%] px-10 pb-4 pt-5 rounded-xl flex flex-col items-center justify-center text-center ${createItemPopup ? 'scale-1' : 'scale-0'} bg-white transition-transform duration-300 `}>
                <div className="mx-auto h-fit  p-4 shadow-md rounded-lg max-h-[20rem] overflow-y-scroll">
                    {/* item list */}
                    {products.map((item, index) => {
                        const isAdded = addedProducts.some(prod => {
                            return (prod.productName === item.productName);
                        })
                        return (
                            <div key={index} className={`select-none grid grid-cols-5 gap-4 text-center mb-4 cursor-pointer hover:bg-gray-300 py-2 rounded-lg ${isAdded && 'cursor-not-allowed opacity-50'}`} onClick={() => !isAdded && handleAddProduct(item)}>

                                <div>{item.productName}</div>

                                <div>{item.quantity}</div>

                                <div>₹{item.cp}</div>

                                <div>₹{item.sp}</div>

                                <input className='h-fit' type="checkbox" checked={isAdded} />
                            </div>
                        )
                    })}
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
                        onClick={handleCancel}
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InventoryPopup
