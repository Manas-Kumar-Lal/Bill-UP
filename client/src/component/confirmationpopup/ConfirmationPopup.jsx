import React from 'react'
import { deleteItem, getItemList } from '../../toolkit/slices/ProductApi.slice';
import { useDispatch } from 'react-redux';

const ConfirmationPopup = ({ confirmationpopup,setConfirmationPopup,deleteitemID }) => {
const dispatch = useDispatch()
    const handleDelete = async() =>{
        const DataHasToDelete = {
            productID: deleteitemID
        }
        const response = await dispatch(deleteItem(DataHasToDelete));
        console.log(response);
        if (response) {
            setConfirmationPopup(false);
            dispatch(getItemList());
        }
    }

  return (
    <div className={`z-[900] w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center ${confirmationpopup ? 'scale-1' : 'scale-0 delay-300'} flex flex-col`}>
      <div className={`relative max-[500px]:w-[90%] w-[28rem] px-10 pb-4 pt-5 rounded-xl flex flex-col items-center justify-center bg-white shadow-lg ${confirmationpopup ? 'scale-1' : 'scale-0'} transition-transform duration-300`}>
        
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete the item?
        </h2>

        <div className="flex gap-4">
          <button 
            onClick={()=>setConfirmationPopup(false)} 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationPopup

