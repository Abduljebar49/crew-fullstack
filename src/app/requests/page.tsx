"use client";

import { baseUrl } from "@/contants";
import { BResponse } from "@/shared/models/response";
import { UserType, Request, User } from "@/shared/validators/schema";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [userType, setUserType] = useState<String>(UserType.IMPORTER);
  const [link, setLink] = useState<String>("");
  const user = Cookies.get("user");
  var userId = 1;
  if (user) {
    const userData = JSON.parse(user!);
    userId = userData.data.userId!;
  }
  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch(`${baseUrl}/requests?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: BResponse = await response.json();
        setRequests(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRequestData();
  }, []);
  //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

  const sendSingleEmail = async (email: string, firstName: string) => {
    const response = await fetch("http://localhost:3000/api/email/welcome", {
      method: "POST",
      body: JSON.stringify({
        email,
        firstName,
      }),
    });
    const data = await response.json();
    console.log("response : ", response, " data ", data);
  };

  const generateLink = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/requests/generateLink?userId=${userId}`,
        {
          method: "POST",
          body: JSON.stringify({ userId: userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: BResponse = await response.json();
      setLink(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendEmail = async () => {
    // generateLink();
    // await sendSingleEmail("abduljebarsani@gmail.com", "Abduljebar");
    toast.success("Email sent successfully");
    return;
    try {
      const response = await fetch(`${baseUrl}/users?userType=${userType}`);
      // const response = await fetch(
      //   `http://localhost:3000/api/requests/${userId}`
      // );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: User[] = await response.json();
      console.log("data ; ", data);

      // const response = await fetch("http://localhost:3000/api/email/sendLink",{
      //   method: "POST",
      // });
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }else{
      //   alert('email sent')
      // }
    } catch (error) {
      console.log("Error ", error);
    }
  };
  return (
    <>
      <div className="bg-gray-100 p-6">
        <div className="bg-white p-4 rounded shadow-md">
          {requests && requests.length > 0 ? (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                Your Requests are about to be sent
              </h1>
              <table className="min-w-full bg-white border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 px-4 py-2"></th>
                    <th className="border border-gray-300 px-4 py-2">
                      Item Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Brand Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, i) => (
                    <tr key={i} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.itemName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.brandName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Send email to all:
                </label>
                <select
                  id="userType"
                  value={userType.toString()}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="IMPORTER">Importer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="SALESPERSON">Salesperson</option>
                </select>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={sendEmail}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Send Email
                </button>
              </div>
            </>
          ) : (
            <h1 className="text-2xl font-semibold">It is empty here.</h1>
          )}
        </div>
        <ToastContainer />
      </div>
      );
    </>
  );
};

export default Requests;
