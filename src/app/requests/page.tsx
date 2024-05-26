"use client";

import { baseUrl } from "@/contants";
import { BResponse } from "@/shared/models/response";
import { UserType, Request, User } from "@/shared/validators/schema";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [userType, setUserType] = useState<String>(UserType.IMPORTER);
  const user = Cookies.get("user");
  var userId = 1;
  if(user){
    const userData = JSON.parse(user!);
    userId = userData.data.userId!;
  }
  useEffect(() => {
    fetchRequestData();
  }, []);
  const fetchRequestData = async () => {
    try {
      const response = await fetch(`${baseUrl}/requests/${userId}`);
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
  //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
  const sendEmail = async () => {
    try {
      const response = await fetch(`${baseUrl}/users?${userType}`);
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
      <div className="flex h-screen bg-gray-100">
        <div className="m-auto">
          <div>
            {requests && requests.length > 0 && (
              <>
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <h1 className="inline text-2xl font-semibold leading-none">
                      Your Requests are about to be sent
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
                      {requests &&
                        requests.map((request, i: number) => (
                          <tr className="hover:bg-gray-300">
                            <th>{i + 1}</th>
                            <td>{request.itemName}</td>
                            <td>{request.brandName}</td>
                            <td>{request.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center py-4">
                    <div className="mb-6 w-full flex flex-col gap-1">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Send email to all
                      </label>
                      <select
                        id="countries"
                        onChange={(value) => setUserType(value.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>{userType}</option>
                        <option value="ADMIN">Admin</option>
                        <option value="IMPORTER">Importer</option>
                        <option value="DISTRIBUTOR">Distributor</option>
                        <option value="SALESPERSON">Sales person</option>
                      </select>
                    </div>
                  </div>
                  <div className=" flex justify-end py-4">
                    <div
                      className="btn flex bg-black text-white hover:bg-gray-800"
                      onClick={() => sendEmail()}
                    >
                      <span className="pl-2 mx-1">Send email</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            {requests && requests.length == 0 && (
              <>
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <h1 className="inline text-2xl font-semibold leading-none">
                      it is empty here.
                    </h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Requests;
// const Requests = () => {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [userType, setUserType] = useState<String>(UserType.IMPORTER);
//   const user = localStorage.getItem("user");
//   const userData = JSON.parse(user!);
//   var userId = 1;

//   if (user) {
//     userId = userData.user.id!;
//   }

//   useEffect(() => {
//     fetchRequestData();
//   }, []);

//   const fetchRequestData = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/requests/${userId}`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data: BResponse = await response.json();
//       setRequests(data.data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   //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

//   const sendEmail = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/users?${userType}`);
//       // const response = await fetch(
//       //   `http://localhost:3000/api/requests/${userId}`
//       // );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data: User[] = await response.json();
//       console.log("data ; ", data);
//       // const response = await fetch("http://localhost:3000/api/email/sendLink",{
//       //   method: "POST",
//       // });
//       // if (!response.ok) {
//       //   throw new Error("Network response was not ok");
//       // }else{
//       //   alert('email sent')
//       // }
//     } catch (error) {
//       console.log("Error ", error);
//     }
//   };

//   return (
//     <>
//       <div className="flex h-screen bg-gray-100">
//         <div className="m-auto">
//           <div>
//             {requests && requests.length > 0 && (
//               <>
//                 <div className="flex">
//                   <div className="flex-1 py-5 pl-5 overflow-hidden">
//                     <h1 className="inline text-2xl font-semibold leading-none">
//                       Your Requests are about to be sent
//                     </h1>
//                   </div>
//                 </div>
//                 <div className="overflow-x-auto bg-white p-4 mb-4">
//                   <table className="table">
//                     {/* head */}
//                     <thead>
//                       <tr>
//                         <th></th>
//                         <th>Item Name</th>
//                         <th>Brand Name</th>
//                         <th>Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {requests &&
//                         requests.map((request, i: number) => (
//                           <tr className="hover:bg-gray-300">
//                             <th>{i + 1}</th>
//                             <td>{request.itemName}</td>
//                             <td>{request.brandName}</td>
//                             <td>{request.amount}</td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                   <div className="flex justify-center py-4">
//                     <div className="mb-6 w-full flex flex-col gap-1">
//                       <label
//                         htmlFor="countries"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Send email to all
//                       </label>
//                       <select
//                         id="countries"
//                         onChange={(value) => setUserType(value.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       >
//                         <option selected>{userType}</option>
//                         <option value="ADMIN">Admin</option>
//                         <option value="IMPORTER">Importer</option>
//                         <option value="DISTRIBUTOR">Distributor</option>
//                         <option value="SALESPERSON">Sales person</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className=" flex justify-end py-4">
//                     <div
//                       className="btn flex bg-black text-white hover:bg-gray-800"
//                       onClick={() => sendEmail()}
//                     >
//                       <span className="pl-2 mx-1">Send email</span>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//           <div>
//             {requests && requests.length == 0 && (
//               <>
//                 <div className="flex">
//                   <div className="flex-1 py-5 pl-5 overflow-hidden">
//                     <h1 className="inline text-2xl font-semibold leading-none">
//                       it is empty here.
//                     </h1>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Requests;
