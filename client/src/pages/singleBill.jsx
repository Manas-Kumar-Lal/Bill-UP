import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SingleBill = () => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch company and invoice details
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get('/api/invoice'); // Replace with your API endpoint
                const { company, customerName, createdDate, products } = response.data;

                setCompanyDetails({
                    companyName: "sdlfjlsdf",
                    companyAddress: "company.addres",
                    companyPhone: "dslfj",
                    customerName: "sldfjlsd",
                    createdDate: "sdlfj",
                });

                setProducts(products);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchInvoiceData();
    }, []);

    const calculateOverallTotal = () => {
        return products?.reduce((acc, product) => acc + product.total, 0);
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
                    {products?.map((product, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">sdgsdg</td>
                            <td className="px-4 py-2 border">sdghhhhh</td>
                            <td className="px-4 py-2 border">abcs</td>
                            <td className="px-4 py-2 border">ererere</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-right">
                <span className="text-lg font-bold">Overall Total: ₹sdgsdg</span>
            </div>
        </div>
    );
};

export default SingleBill;
