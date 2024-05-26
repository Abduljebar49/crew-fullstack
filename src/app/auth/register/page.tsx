"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import validation from "@/shared/services/validation";
import { IUserInput, LoginInput, UserType } from "@/shared/interfaces/user";
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
  const [formError, setFormError] = useState({ name: "", message: "" });

  const goLogin = () => navigate.push("/auth/login");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let tempValue = value;
    if (name == "password" || name == "confirmPassword") {
      isValidPassword(value, name);
    }
    setFormData({
      ...formData,
      [name]: tempValue,
    });
  };

  const isFormValid = (): boolean => {
    for (const key of Object.keys(formData)) {
      let value: string | boolean = formData[key as keyof LoginInput];
      if (key != "profilePicUri" && value.toString().length === 0) {
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
    // if (!isFormValid()) {
    //   return;
    // }
    setSubmitClicked(true);

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          firstName: undefined,
          lastName: undefined,
          fullName: `${formData.firstName} ${formData.lastName}`,
          confirmPassword: undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send requests.");
      }

      alert("you have successfully registered!");
      setFormData(initData);
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

    if (name == "confirmPassword" && formData.password !== value) {
      setFormError({
        name: "confirmPassword",
        message: "Password does not match.",
      });
      return false;
    }
    setFormError({ message: "", name: name });
    return true;
  };

  return (
    <div className="flex w-full bg-[#F3F4F6] min-h-screen">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
          <div className="flex w-full flex-col justify-center text-center">
            <div className=" text-3xl font-extrabold">Register Page</div>
            <div
              className="text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px]  mb-[20px]"
              onClick={() => goLogin()}
            >
              Have an account? Sign In.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="firstName" error={formError} />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="lastName" error={formError} />
              </div>{" "}
            </div>{" "}
            <div className="flex gap-4">
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
              <div className="mb-6 w-full">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a user type</option>
                  <option value="ADMIN">Admin</option>
                  <option value="IMPORTER">Importer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="SALESPERSON">Sales person</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="mb-6 w-full">
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
              <div className="mb-6 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-36"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="confirmPassword" error={formError} />
              </div>
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

export default RegisterPage;
