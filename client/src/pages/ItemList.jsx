import React, { useEffect, useState } from 'react';
import CreateItemPopup from '../component/createitempopup/CreateItemPopup';
import { useDispatch, useSelector } from 'react-redux';
import { switchToItemList } from '../toolkit/slices/pageSwitcher';
import { getItemList, uploadItemList } from '../toolkit/slices/ProductApi.slice';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.productApi)
  console.log(products)
  const [createItemPopup, setCreateItemPopup] = useState(false);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCostPrice, setProductCostPrice] = useState("");
  const [productSellingPrice, setProductSellingPrice] = useState("");

  useEffect(() => {
    dispatch(switchToItemList());
    dispatch(getItemList())
  }, []);

  const handleSubmit = async () => {
    const itemData = {
      productName: productName,
      quantity: productQuantity,
      cp: productCostPrice,
      sp: productSellingPrice
    };
    console.log(itemData)
    const response = await dispatch(uploadItemList(itemData));
    console.log(response)
    if (response) {
      setCreateItemPopup(false)
      dispatch(getItemList())
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-100">

      <div className="h-[calc(100vh-100px)] overflow-y-auto p-4">

        <div className="flex justify-between bg-white p-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold">Item List</h1>
          <div
            onClick={() => setCreateItemPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Create New Item
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-lg">

          <div className="grid grid-cols-6 gap-4 text-center font-bold mb-4">
            <div>Name</div>
            <div>Quantity</div>
            <div>C.P</div>
            <div>S.P</div>

          </div>


          {products.map((item, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 text-center mb-4">

              <div>{item.productName}</div>

              <div>{item.quantity}</div>

              <div>₹{item.cp}</div>

              <div>₹{item.sp}</div>

              <div>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(item._id)}
                >
                  <FaEdit />
                </button>
              </div>

              <div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>


        {createItemPopup && (
          <CreateItemPopup
            createItemPopup={createItemPopup}
            setCreateItemPopup={setCreateItemPopup}
            productName={productName}
            setProductName={setProductName}
            productQuantity={productQuantity}
            setProductQuantity={setProductQuantity}
            productCostPrice={productCostPrice}
            setProductCostPrice={setProductCostPrice}
            productSellingPrice={productSellingPrice}
            setProductSellingPrice={setProductSellingPrice}
            handleSubmit={() => handleSubmit()}
          />
        )}
      </div>
    </div>
  );
};

export default ItemList;
