"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FilterForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onFilterHandler = (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
  ) => {
    e.preventDefault();

    if (email) {
      router.push(`/orders?email=${email}`);
    }
  };

  const onChangeFilterHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  return (
    <div className="container mx-auto flex-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onFilterHandler}
      >
        <div className="mb-4 text-gray-700">
          <p>Please enter your email address to see your recent orders</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChangeFilterHandler}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onFilterHandler}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
