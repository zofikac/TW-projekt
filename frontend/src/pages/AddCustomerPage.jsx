import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { useState } from 'react';

export const AddCustomerPage = () => {
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [resMessage, setResMessage] = useState("")
  
//target - wskazuje na element DOM wywołujący zdarzenie aka pole tekstowe
//value elementu DOM zawiera aktualną wartość wpisaną w pole
//DOM to część dokumentu, np. znacznik HTML, atrybut, tekst lub komentarz
//setname(e.target.value) aktualizuje wartość stanu name
  const handlenameChange = (e) => {
    setname(e.target.value);
  };

  const handlesurnameChange = (e) => {
    setsurname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlephone_number = (e) => {
    setphone_number(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const customerData = {
      name: name || "",
      surname: surname || "",
      phone_number: phone_number || "",
      email: email || "",
    };
  
    if (!customerData.name || !customerData.surname || !customerData.phone_number || !customerData.email) {
      return;
    }
  

    const response = await fetch("http://127.0.0.1:8081/customers", {
      method: "POST",
      body: JSON.stringify({"name": name,"surname": surname,"email": email,"phone_number": phone_number}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (!response.ok) {
      setResMessage("Nie udało się dodać klienta");
      throw new Error(response.message || "Nie udało się dodać klienta");
    }

      setname("");
      setsurname("");
      setEmail("");
      setphone_number("");
    };
  

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <form onSubmit={handleSubmit} className="add-customer-form"> 
            <label>First Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handlenameChange}
              placeholder="Struś"
            />
            <label>Last Name: </label>
            <input
              type="text"
              id="surname" 
              value={surname}
              onChange={handlesurnameChange}
              placeholder="Pędziwiatr"
            />
            <label>Email: </label>
            <input
              type="text"
              id="email" 
              value={email}
              onChange={handleEmail}
              placeholder="road.runner@gmail.com"
            />
            <label>Phone Number: </label>
            <input
                type="text"
                id="phone_number" 
                value={phone_number}
                onChange={handlephone_number}
                placeholder="858-636-765"
              />
            <button type="submit">Add Customer</button>
          </form>
        </div>
      </div>
    </div>
  );
};
