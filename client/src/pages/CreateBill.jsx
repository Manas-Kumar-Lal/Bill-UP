import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchToCreateBill } from '../toolkit/slices/pageSwitcher';
import InventoryPopup from '../component/inventoryPopup';
import { useNavigate } from 'react-router-dom';
import { createBill } from '../toolkit/slices/ProductApi.slice';


const CreateBill = () => {
  const [createItemPopup, setCreateItemPopup] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [products, setProducts] = useState([]);
  const [displaycustNameerror, setDisplayCustNameError] = useState(false)
  const [displayNoproducterror, setDisplayNoProductError] = useState(false)

  const navigate = useNavigate()
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchToCreateBill());
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = { ...product, [field]: value };
        if (field === 'price' || field === 'quantity') {
          const amount = updatedProduct.price * updatedProduct.quantity;
          updatedProduct.amount = isNaN(amount) ? '' : amount;
        }
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    calculateTotalAmount(updatedProducts);
  };

  const calculateTotalAmount = (updatedProducts) => {
    const total = updatedProducts.reduce((sum, product) => sum + (parseFloat(product.amount) || 0), 0);
    setTotalAmount(total);
  };

  const numberToWords = (num) => {
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
      'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const c = ['hundred', 'thousand', 'lakh', 'crore'];

    const numToWords = (n) => {
      if (n === 0) return '';
      if (n < 20) return a[n] + ' ';
      if (n < 100) return b[Math.floor(n / 10)] + ' ' + a[n % 10] + ' ';
      if (n < 1000) return a[Math.floor(n / 100)] + ' ' + c[0] + ' ' + numToWords(n % 100);
      if (n < 100000) return numToWords(Math.floor(n / 1000)) + c[1] + ' ' + numToWords(n % 1000);
      if (n < 10000000) return numToWords(Math.floor(n / 100000)) + c[2] + ' ' + numToWords(n % 100000);
      return numToWords(Math.floor(n / 10000000)) + c[3] + ' ' + numToWords(n % 10000000);
    };

    if (num === 0) return 'zero';
    return numToWords(num).trim();
  };

  const handleGoAhead = async () => {
    let valid = true;

    if (customerName.trim() === '') {
      setDisplayCustNameError(true);
      valid = false;
    } else {
      setDisplayCustNameError(false);
    }

    if (products.length === 0) {
      setDisplayNoProductError(true);
      valid = false;
    } else {
      setDisplayNoProductError(false);
    }

    if (valid) {
      const detailsToSend = {
        customerName: customerName,
        products: products,
        totalAmount,
      };

      navigate('/bill', { state: detailsToSend });

      const response = await dispatch(createBill(detailsToSend));
      if (response.payload) {
        console.log('Bill created successfully!');
      }
    }
  };


  return (
    <>
      <InventoryPopup addedProducts={products} setAddedProducts={setProducts} createItemPopup={createItemPopup} setCreateItemPopup={setCreateItemPopup} />
      <div className="w-full flex flex-col bg-gray-100">
        <div className="h-[calc(100vh-10px)] overflow-y-auto p-4">
          <div className="flex justify-evenly bg-white p-2 mt-4 rounded-lg shadow-lg mb-8">
            <h1 className="text-center text-2xl font-bold mb-4">New Textile</h1>
            <div className="space-y-4">
              <div className="text-center">xyz road bhagalpur bihar</div>
              <div className="text-center">9965485588</div>
              <div className="text-center">6250159-52</div>
            </div>
          </div>

          <div className="w-full bg-white p-6 rounded-lg shadow-lg mb-1">
            <div className='text-red-600 text-lg mb-2' > {displaycustNameerror && "Customer Name Required *"}  </div>

            <input type="name" placeholder='Customer Name' className="w-full p-2 border rounded" value={customerName} onChange={(e) => { setCustomerName(e.target.value), setDisplayCustNameError(false) }} />
          </div>

          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            {
              products?.length <= 0 ? (
                <div> <p className='mb-3'>Please Add Products..!!</p>
                  <div className='text-red-600 text-lg mb-2' > {displayNoproducterror && "Add Atleast one item"}  </div>
                </div>

              ) : (
                <div className="grid grid-cols-4 gap-4 text-center font-bold mb-4">
                  <div>Product Name</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div>Amount</div>
                </div>
              )
            }

            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                <h2 className='font-semibold'>{product?.productName}</h2>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  placeholder="Quantity"
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                  placeholder="Price"
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  value={product.amount}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                  placeholder="Amount"
                  className="p-2 border rounded"
                  readOnly
                />
              </div>
            ))}

            <button onClick={() => setCreateItemPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
          </div>

          {/* Total Amount */}
          <div className="w-full flex bg-white p-6 rounded-lg shadow-lg mt-4">
            <div className='flex flex-col whitespace-nowrap'>
              <div className="font-bold">
                Total Amount: ₹{totalAmount}
              </div>
              <div>
                Amount in Words: {numberToWords(totalAmount)}
              </div>
            </div>
          </div>

          <div className="w-full flex bg-white p-6 rounded-lg shadow-lg mt-4">
            <button onClick={handleGoAhead} className="bg-green-500 text-white px-4 py-2 rounded">
              Go Ahead
            </button>
          </div>

        </div >
      </div >
    </>
  );
};

export default CreateBill;
