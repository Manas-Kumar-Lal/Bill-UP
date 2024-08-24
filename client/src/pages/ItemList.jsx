import React, { useEffect, useState } from 'react';
import CreateItemPopup from '../component/createitempopup/CreateItemPopup';
import { useDispatch, useSelector } from 'react-redux';
import { switchToItemList } from '../toolkit/slices/pageSwitcher';
import { getItemList, uploadItemList } from '../toolkit/slices/ProductApi.slice';


const ItemList = () => {
  const dispatch = useDispatch();
  // const { allitemlist } = useSelector(state => state.ProductApi)
  // console.log(allitemlist)
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
    if(response){
      setCreateItemPopup(false)
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
          <div className="grid grid-cols-5 gap-4 text-center font-bold mb-4">
            <div>Product ID</div>
            <div>Name</div>
            <div>Quantity</div>
            <div>C.P</div>
            <div>S.P</div>
          </div>

          <div className="grid grid-cols-5 gap-4 text-center mb-4">
            <div>001</div>
            <div>Product A</div>
            <div>100</div>
            <div>₹500</div>
            <div>₹600</div>
          </div>
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

            handleSubmit={()=>handleSubmit()}
          />
        )}
      </div>
    </div>
  );
};

export default ItemList;
