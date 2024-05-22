import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../libs/auth";
import { useAuth } from "../libs/authContext";  // تأكد من تعديل المسار بشكل صحيح

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [id]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let nameError = "";

    if (!validateEmail(formData.email)) {
      emailError = "Invalid email address";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      passwordError = "Passwords do not match";
      confirmPasswordError = "Passwords do not match";
      valid = false;
    }

    if (!formData.name) {
      nameError = "Name is required";
      valid = false;
    }

    if (!valid) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        name: nameError,
      });
      return;
    }

    try {
      const data = await register(formData.email, formData.password, formData.name);
      if (data.error) {
        console.error(data.error);
      } else {
        console.log("Register successful", data);
        authLogin(data.token, data.user.name, data.user.id); // تمرير معرف المستخدم هنا
        router.push("/dashboard"); // إعادة التوجيه إلى /dashboard بعد التسجيل الناجح
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Your Name
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && "border-red-500"}`}
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && "border-red-500"}`}
          id="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && "border-red-500"}`}
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="******************"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword && "border-red-500"}`}
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="******************"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
