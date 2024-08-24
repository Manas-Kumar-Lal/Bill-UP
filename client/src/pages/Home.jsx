import React, { useEffect } from 'react';
import { switchToHome } from '../toolkit/slices/pageSwitcher';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchToHome());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col bg-gray-100">
      <div className="h-[calc(100vh-100px)] overflow-y-auto p-4">
        <div className="flex justify-between bg-white p-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold">New Text-Tile Company</h1>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Welcome to the Billing System</h2>
          <p className="mb-4">
            Manage your billing, track transactions, and view your history efficiently.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Total Sales</h3>
              <p className="text-2xl">₹50,000</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Pending Payments</h3>
              <p className="text-2xl">₹10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
