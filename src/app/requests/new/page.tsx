"use client";
import React, { useState } from "react";
import { Request } from "@/shared/validators/schema";
import Cookies from "js-cookie";

const NewRequest = () => {

  const user = Cookies.get("user");
  var userId = 1;
  if(user){
    const userData = JSON.parse(user!);
    userId = userData.data.userId!;
  }

  const initData: Request = {
    brandName: "",
    itemName: "",
    amount: 0,
    userId: userId,
  };
  const [formData, setFormData] = useState<Request>(initData);
  const [errorExist, setErrorExist] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);

  const isFormValid = (): boolean => {
    if (
      formData.brandName.length > 3 &&
      formData.itemName.length > 3 &&
      formData.amount > 0
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    setErrorExist(false);
    console.log("handleSubmit : ");
    if (isFormValid()) {
      setRequests([...requests, { ...formData }]);
      setFormData(initData);
    } else {
      setErrorExist(true);
    }
    console.log(formData);
  };

  const handleSubmitAll = async () => {
    console.log("all requests: ", requests);

    try {
      const response = await fetch("http://localhost:3000/api/requests/multi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: requests }),
      });

      if (!response.ok) {
        throw new Error("Failed to send requests.");
      }
      setRequests([]);
      console.log("Requests sent successfully!");
      alert("Requests sent successfully!");
    } catch (error: any) {
      console.error("Error sending requests:", error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="m-auto">
          <div>
            {requests.length > 0 && (
              <>
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <h1 className="inline text-2xl font-semibold leading-none">
                      Your Requests so far
                    </h1>
                  </div>
                </div>
                <div className="overflow-x-auto bg-white p-4 mb-4">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Item Name</th>
                        <th>Brand Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request, i: number) => (
                        <tr key={i} className="hover:bg-gray-300">
                          <th>{i + 1}</th>
                          <td>{request.itemName}</td>
                          <td>{request.brandName}</td>
                          <td>{request.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className=" flex justify-end ">
                    <div
                      className="btn bg-black text-white hover:bg-gray-800"
                      onClick={handleSubmitAll}
                    >
                      <span className="pl-2 mx-1">Send requests</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
                </g>
              </svg>
              <span className="pl-2 mx-1">Create new request</span>
            </button>
            <div className="bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Request
                  </h1>
                </div>
              </div>
              <div className="flex py-4">
                {errorExist && (
                  <div className="justify-center text-center text-orange-600">
                    All field requred,
                  </div>
                )}
              </div>
              <div className="px-5 pb-5 min-w-96">
                <div className="flex flex-col my-4 ">
                  <label htmlFor="itemName">Enter Item Name</label>
                  <input
                    name="itemName"
                    placeholder="Item Name"
                    value={formData?.itemName}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        itemName: value.target.value ?? "",
                      })
                    }
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="brandName">Enter Brand Name</label>
                  <input
                    name="brandName"
                    placeholder="Brand Name"
                    value={formData?.brandName}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        brandName: value.target.value ?? "",
                      })
                    }
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="amount">Enter Amount</label>
                  <input
                    name="amount"
                    placeholder="Amount"
                    type="number"
                    value={formData?.amount}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        amount: parseInt(value.target.value) ?? 0,
                      })
                    }
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>

              <hr className="mt-4" />
              <div className="flex flex-row-reverse p-3">
                <div className="flex-initial pl-3">
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                  >
                    <span className="pl-2 mx-1">Add Request</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRequest;
