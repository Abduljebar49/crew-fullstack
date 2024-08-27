"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validation from "@/shared/services/validation";
import { IUserInput, UserType } from "@/shared/interfaces/user";
import ShowError from "@/components/ShowError";

const RegisterPage = () => {
  const [submitClick, setSubmitClicked] = useState(false);
  const navigate = useRouter();

  const initData: IUserInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: UserType.IMPORTER,
  };
  const [formData, setFormData] = useState<IUserInput>(initData);
  const [formError, setFormError] = useState<{ name: string; message: string }>(
    { name: "", message: "" }
  );

  const goLogin = () => navigate.push("/auth/login");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password" || name === "confirmPassword") {
      isValidPassword(value, name);
    }
  };

  const isFormValid = (): boolean => {
    for (const key in formData) {
      const value = formData[key as keyof IUserInput].toString().trim();

      if (!value) {
        setFormError({ name: key, message: `${key} is required` });
        return false;
      }

      if (key === "email" && validation.IsInvalidEmail(value)) {
        setFormError({ name: key, message: "Invalid email address" });
        return false;
      }

      if (key === "userType" && value === "") {
        setFormError({ name: key, message: "User type is required" });
        return false;
      }
    }

    setFormError({ name: "", message: "" });
    return true;
  };

  const submitForm = async () => {
    if (!isFormValid()) {
      return;
    }
    setSubmitClicked(true);

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fullName: `${formData.firstName} ${formData.lastName}`,
          firstName: undefined,
          lastName: undefined,
          confirmPassword: undefined,
        }),
      });

      if (!response.ok) {
                throw new Error(response.statusText);
      }

      const responseData = await response.json();

      // Show success toast
      toast.success("Registration successful!");

      // Redirect to login page
      setTimeout(() => {
        goLogin();
      }, 2000);
    } catch (error: any) {
      // Show error toast
      toast.error(`Registration failed: ${error.message}`);
      console.error("Error sending request:", error.message);
    }
  };

  const isValidPassword = (value: string, name: string): boolean => {
    const validations = [
      {
        check: validation.emptyPassword(value),
        message: "This field is required",
      },
      {
        check: validation.containsNumber(value),
        message: "Password must contain at least one number",
      },
      {
        check: validation.containsUppercase(value),
        message: "Password must contain at least one uppercase character",
      },
      {
        check: validation.containsSpecial(value),
        message: "Password must contain at least one special character",
      },
      {
        check: validation.minLength(value),
        message: "Password must be at least 8 characters long",
      },
    ];

    for (const validation of validations) {
      if (!validation.check) {
        setFormError({ message: validation.message, name });
        return false;
      }
    }

    if (name === "confirmPassword" && formData.password !== value) {
      setFormError({
        name: "confirmPassword",
        message: "Passwords do not match",
      });
      return false;
    }

    setFormError({ message: "", name });
    return true;
  };

  return (
    <div className="flex w-full bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
          <div className="flex w-full flex-col justify-center text-center">
            <div className="text-3xl font-extrabold">Register Page</div>
            <div
              className="text-blue-700 hover:text-button-primary-hover cursor-pointer mt-[10px] mb-[20px]"
              onClick={goLogin}
            >
              Have an account? Sign In.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-4 w-full">
              <div className="mb-3 w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <ShowError name="firstName" error={formError} />
              </div>
              <div className="mb-3 w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <ShowError name="lastName" error={formError} />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="mb-3 w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <ShowError name="email" error={formError} />
              </div>
              <div className="mb-3 w-full">
                <label
                  htmlFor="userType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a user type
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  {/* <option value="" disabled>
                    Choose a user type
                  </option> */}
                  <option value="IMPORTER">Importer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="SALESPERSON">Salesperson</option>
                </select>
                <ShowError name="userType" error={formError} />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="mb-6 w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <ShowError name="password" error={formError} />
              </div>
              <div className="mb-6 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <ShowError name="confirmPassword" error={formError} />
              </div>
            </div>
            <div className="mb-3 flex justify-center">
              <button
                type="submit"
                onClick={submitForm}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
