import React, { useEffect } from 'react';
import { switchToHistory } from '../toolkit/slices/pageSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { getBill } from '../toolkit/slices/ProductApi.slice';

const History = () => {
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.productApi);
  console.log(bills)

  useEffect(() => {
    dispatch(switchToHistory());
    dispatch(getBill());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col bg-gray-100">
      <div className="overflow-y-auto p-4">
        <div className="flex justify-between bg-white p-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold">History</h1>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-4 text-center font-bold mb-4">
            <div>Bill No</div>
            <div>Date</div>
            <div>Customer Name</div>
            <div>Product Name</div>
            <div>Quantity</div>
            <div>sp</div>
            <div>Paid Amount</div>
          </div>

          {/* Bills and Products Rows */}
          {bills.map((bill, billIndex) => (
            <div key={billIndex} className='bg-gray-300 py-3 flex flex-col gap-2 mb-3 rounded-lg'>
              {bill.products.map((product, productIndex) => (
                <div key={productIndex} className="grid grid-cols-7 gap-4 text-center">
                  {productIndex === 0 ? (
                    <div rowSpan={bill.products.length} className="font-bold">
                      {bill.billNumber}
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {/* Date (Optional, if you have a date field in bill) */}
                  <div>{bill.updatedAt.split('T')[0]}</div>

                  {productIndex === 0 ? (
                    <div rowSpan={bill.products.length} className="font-bold">
                     {bill.customerName}
                    </div>
                  ) : (
                    <div></div>
                  )}
                

                  {/* Product Name */}
                  <div>{product.productName}</div>

                  {/* Quantity */}
                  <div>{product.quantity}</div>


                  <div>₹{product.price}</div>

                  {productIndex === 0 ? (
                    <div rowSpan={bill.products.length} className="font-bold">
                      {bill.totalAmount}
                    </div>
                  ) : (
                    <div></div>
                  )}

                </div>
              ))}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
