import React, { useEffect } from 'react';
import { switchToHistory } from '../toolkit/slices/pageSwitcher';
import { useDispatch } from 'react-redux';

const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchToHistory());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col bg-gray-100">
      <div className="h-[calc(100vh-100px)] overflow-y-auto p-4">
        <div className="flex justify-between bg-white p-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold">History</h1>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-6 gap-4 text-center font-bold mb-4">
            <div>Bill No</div>
            <div>Date</div>
            <div>Product ID</div>
            <div>Product Name</div>
            <div>Quantity</div>
            <div>S.P</div>
          </div>

          <div className="grid grid-cols-6 gap-4 text-center mb-4">
            <div>BILL-001</div>
            <div>24/08/2024</div>
            <div>001</div>
            <div>Product A</div>
            <div>100</div>
            <div>₹600</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default History;
