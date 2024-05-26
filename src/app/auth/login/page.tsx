"use client";
import validation from "@/shared/services/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/shared/interfaces/user";
import ShowError from "@/components/ShowError";
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter();
  const initData: LoginInput = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<LoginInput>(initData);
  const [formError, setFormError] = useState({ name: "", message: "" });
  const goTo = (link: string) => {
    router.push(link);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let tempValue = value;
    if (name === "password" || name == "confirmPassword") {
      isValidPassword(value, name);
    }
    if (name === "email" && validation.IsInvalidEmail(value)) {
      setFormError({ name: name, message: `invalid ${name}` });
    } else {
      setFormError({ name: name, message: `` });
    }
    setFormData({
      ...formData,
      [name]: tempValue,
    });
  };
  const isFormValid = (): boolean => {
    for (const key of Object.keys(formData)) {
      let value: string | boolean = formData[key as keyof LoginInput];
      if (value.toString().length === 0) {
        setFormError({ name: key, message: `${key} is required` });
        return false;
      }
      if (key == "email") {
        if (validation.IsInvalidEmail(value.toString())) {
          setFormError({ name: key, message: `invalid ${key}` });
          return false;
        }
      }
    }
    return true;
  };
  const submitForm = async () => {
    if (!isFormValid()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to send requests.");
      }
      const data = await response.json();
      Cookies.set("user", JSON.stringify(data));
      alert("you have successfully logged in!");
      setFormData(initData);
      setTimeout(() => {
        goTo("/");
      }, 2000);
    } catch (error: any) {
      console.error("Error sending requests:", error.message);
    }
  };
  const isValidPassword = (value: string, name: string): boolean => {
    if (!validation.emptyPassword(value)) {
      setFormError({ message: "This field is required", name: name });
      return false;
    }
    if (!validation.containsNumber(value)) {
      setFormError({ message: "Should contain at least a number", name: name });
      return false;
    }
    if (!validation.containsUppercase(value)) {
      setFormError({
        message: "Should contain at least a uppercase character",
        name: name,
      });
      return false;
    }
    if (!validation.containsSpecial(value)) {
      setFormError({
        message: "Should contain at least a special character",
        name: name,
      });
      return false;
    }
    if (!validation.minLength(value)) {
      setFormError({ message: "Should be at least 8 characters", name: name });
      return false;
    }
    setFormError({ message: "", name: name });
    return true;
  };
  return (
    <div className="flex  w-full min-h-screen bg-[#F3F4F6]">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
          <div className="flex w-full flex-col justify-center text-center">
            <div className=" text-3xl font-extrabold">Login Page</div>
            <div
              className="text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px]  mb-[20px]"
              onClick={() => goTo("/auth/register")}
            >
              Don't have an account? Sign Up.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-28"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
              />
              <ShowError name="email" error={formError} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
              />
              <ShowError name="password" error={formError} />
            </div>
            <div className="mb-6 flex w-full text-center justify-center">
              <button
                type="submit"
                onClick={submitForm}
                className="flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// export default LoginPage;
// const LoginPage = () => {
//   const router = useRouter();

//   const initData: LoginInput = {
//     email: "",
//     password: "",
//   };
//   const [formData, setFormData] = useState<LoginInput>(initData);
//   const [formError, setFormError] = useState({ name: "", message: "" });

//   const goTo = (link: string) => {
//     router.push(link);
//   };

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     let tempValue = value;
//     if (name === "password" || name == "confirmPassword") {
//       isValidPassword(value, name);
//     }
//     if (name === "email" && validation.IsInvalidEmail(value)) {
//       setFormError({ name: name, message: `invalid ${name}` });
//     } else {
//       setFormError({ name: name, message: `` });
//     }
//     setFormData({
//       ...formData,
//       [name]: tempValue,
//     });
//   };

//   const isFormValid = (): boolean => {
//     for (const key of Object.keys(formData)) {
//       let value: string | boolean = formData[key as keyof LoginInput];
//       if (value.toString().length === 0) {
//         setFormError({ name: key, message: `${key} is required` });
//         return false;
//       }
//       if (key == "email") {
//         if (validation.IsInvalidEmail(value.toString())) {
//           setFormError({ name: key, message: `invalid ${key}` });
//           return false;
//         }
//       }
//     }
//     return true;
//   };
//   const submitForm = async () => {
//     if (!isFormValid()) {
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send requests.");
//       }
//       const data = await response.json();
//       localStorage.setItem("user", JSON.stringify(data));
//       alert("you have successfully logged in!");
//       setFormData(initData);
//       setTimeout(() => {
//         goTo("/");
//       }, 2000);
//     } catch (error: any) {
//       console.error("Error sending requests:", error.message);
//     }
//   };

//   const isValidPassword = (value: string, name: string): boolean => {
//     if (!validation.emptyPassword(value)) {
//       setFormError({ message: "This field is required", name: name });
//       return false;
//     }
//     if (!validation.containsNumber(value)) {
//       setFormError({ message: "Should contain at least a number", name: name });
//       return false;
//     }
//     if (!validation.containsUppercase(value)) {
//       setFormError({
//         message: "Should contain at least a uppercase character",
//         name: name,
//       });
//       return false;
//     }
//     if (!validation.containsSpecial(value)) {
//       setFormError({
//         message: "Should contain at least a special character",
//         name: name,
//       });
//       return false;
//     }
//     if (!validation.minLength(value)) {
//       setFormError({ message: "Should be at least 8 characters", name: name });
//       return false;
//     }
//     setFormError({ message: "", name: name });
//     return true;
//   };

//   return (
//     <div className="flex  w-full min-h-screen bg-[#F3F4F6]">
//       <div className="flex h-screen w-full items-center justify-center">
//         <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
//           <div className="flex w-full flex-col justify-center text-center">
//             <div className=" text-3xl font-extrabold">Login Page</div>
//             <div
//               className="text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px]  mb-[20px]"
//               onClick={() => goTo("/auth/register")}
//             >
//               Don't have an account? Sign Up.
//             </div>
//           </div>
//           <div className="flex flex-col gap-4">
//             <div className="mb-6 w-full">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-28"
//               >
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="example@company.com"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange(e)}
//               />
//               <ShowError name="email" error={formError} />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 value={formData.password}
//                 onChange={(e) => handleInputChange(e)}
//               />
//               <ShowError name="password" error={formError} />
//             </div>
//             <div className="mb-6 flex w-full text-center justify-center">
//               <button
//                 type="submit"
//                 onClick={submitForm}
//                 className="flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

