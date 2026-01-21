import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await axios.post("http://localhost:5001/auth/login", form);
      console.log(res);
      const token = res.token;
      localStorage.setItem("token", token);
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <form className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={form.email}
          onChange={v => setForm(p => ({ ...p, ["email"]: v.target.value }))}
          name="email"
          className="border"
          type="text"
        ></input>
        <label htmlFor="passwrod">Password</label>
        <input
          value={form.password}
          onChange={v => setForm(p => ({ ...p, ["password"]: v.target.value }))}
          name="password"
          className="border"
          type="text"
        ></input>
        <button className="bg-green-500 px-4 py-2 ">Submit</button>
      </form>
    </div>
  );
};
