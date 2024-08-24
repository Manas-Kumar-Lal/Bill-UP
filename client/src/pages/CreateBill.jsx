import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchToCreateBill } from '../toolkit/slices/pageSwitcher';

const CreateBill = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productList] = useState(['Product A', 'Product B', 'Product C']);
  const [products, setProducts] = useState([{ name: '', quantity: '', rate: '', gst: '', amount: '' }]);
  const [billNo, setBillNo] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchToCreateBill());
    generateBillNumber();
  }, []);

  const generateBillNumber = () => {
    const newBillNo = `BILL-${Math.floor(Math.random() * 10)}`;
    setBillNo(newBillNo);
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: '', name: '', quantity: '', rate: '', gst: '', amount: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = { ...product, [field]: value };
        if (field === 'rate' || field === 'quantity') {
          const amount = updatedProduct.rate * updatedProduct.quantity;
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

  const handleGoAhead = () => {
    console.log('Go Ahead button clicked');
  };

  return (
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
          <div className="flex justify-between">
            <div className="w-1/2">
              <input
                type="text"
                value={billNo}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-5 gap-4 text-center font-bold mb-4">
            <div>Product Name</div>
            <div>Quantity</div>
            <div>Rate</div>
            <div>GST (%)</div>
            <div>Amount</div>
          </div>

          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 mb-4">
              <select
                value={product.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="" disabled>Select Product</option>
                {productList.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                placeholder="Quantity"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={product.rate}
                onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                placeholder="Rate"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={product.gst}
                onChange={(e) => handleInputChange(index, 'gst', e.target.value)}
                placeholder="GST %"
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

          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>

        {/* Total Amount */}
        <div className="w-full flex bg-white p-6 rounded-lg shadow-lg mt-4">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-4">
          <button onClick={handleGoAhead} className="bg-green-500 text-white px-4 py-2 rounded">
            Go Ahead
          </button>
        </div>
          <div className="text-right font-bold">
            Total Amount: ₹{totalAmount}
          </div>
          <div className="text-right">
            Amount in Words: {numberToWords(totalAmount)}
          </div>
        </div>     
      </div>
    </div>
  );
};

export default CreateBill;
