import React, { useState } from "react";
import FormInput from "./FormInput";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const pd = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
  console.log(pd.test("123asdf!@#"));
  const inputs = [
    {
      id: 1,
      name: "username",
      placeholder: "Username",
      type: "text",
      label: "Username",
      title: "Username should be 3-16 characters and shouldn't include any speical characters!",
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      name: "email",
      placeholder: "Email",
      type: "email",
      label: "Email",
      title: "Email should be valid address!",
    },
    {
      id: 3,
      name: "password",
      placeholder: "Password",
      type: "password",
      label: "Password",
      title: "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character!",
      pattern: "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$",
    },
    {
      id: 4,
      name: "confirmPassword",
      placeholder: "Confirmpassword",
      type: "password",
      label: "Confirmpassword",
      pattern: user.password,
      title: "Password don't match",
    },
    {
      id: 5,
      name: "birthday",
      placeholder: "Birthday",
      type: "date",
      label: "Birthday",
    },
  ];
  console.log(user);

  return (
    <div className="app">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {inputs.map((input) => (
          <FormInput key={input.id} onChange={onChange} {...input} value={user[input.name]} />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
