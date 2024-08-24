import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SingleBill = () => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const billdata = location.state;
    console.log(billdata);

    useEffect(() => {
        // Fetch company and invoice details
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get('/api/invoice'); // Replace with your API endpoint
                const { company, customerName, createdDate, products } = response.data;

                setCompanyDetails({
                    companyName: "New Text-Tile Company",
                    companyAddress: "xyz road bhagalpur bihar",
                    companyPhone: "9965485588",
                    customerName: billdata.customerName,
                    createdDate: "", // You might want to set this from response.data if available
                });

                setProducts(products);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchInvoiceData();
    }, [billdata]);

    const calculateOverallTotal = () => {
        return products?.reduce((acc, product) => acc + product.total, 0);
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

    const handlePrint = () => {
        window.print();
    };

    if (!companyDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Invoice</h1>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Company Name</label>
                    <div className="w-full px-3 py-2 border rounded-lg">{companyDetails.companyName}</div>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Company Address</label>
                    <div className="w-full px-3 py-2 border rounded-lg">{companyDetails.companyAddress}</div>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Company Phone Number</label>
                    <div className="w-full px-3 py-2 border rounded-lg">{companyDetails.companyPhone}</div>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Customer Name</label>
                    <div className="w-full px-3 py-2 border rounded-lg">{companyDetails.customerName}</div>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Created Date</label>
                    <div className="w-full px-3 py-2 border rounded-lg">{companyDetails.createdDate}</div>
                </div>
            </div>

            <table className="w-full bg-white rounded-lg shadow-md mb-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Product Name</th>
                        <th className="px-4 py-2 border">Price</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {billdata.products?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">{item.productName}</td>
                            <td className="px-4 py-2 border">₹{item.price}</td>
                            <td className="px-4 py-2 border">{item.quantity}</td>
                            <td className="px-4 py-2 border">₹{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-right mb-6">
                <div className="text-lg font-bold">Overall Total: ₹{billdata.total}</div>
                <div className="text-lg font-bold">     {numberToWords(billdata.total)} jonly</div>
           
            </div>

          

            {/* Print Button */}
            <div className="text-center">
                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Print Bill
                </button>
            </div>
        </div>
    );
};

export default SingleBill;
