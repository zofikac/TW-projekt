import { MainNav } from "@/components/MainNav";
import { useEffect, useState } from 'react';
import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";

export const CustomersPage = () => {
  const [customersData, setCustomersData] = useState([]);

  const fetchCustomers = async () => {
    const response = await fetch("http://127.0.0.1:8081/customers");
    console.log(response);
    const data = await response.json();
    console.log(data);
    setCustomersData(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <ul className="customers-list">
            {customersData.map((item) => (
              <li key={item.id} style={{ display: 'block' }}>
                <strong>First Name: </strong>
                {item.name}
                <br />
                <strong>Last Name: </strong>
                {item.surname}
                <br />
                <strong>Email: </strong>
                {item.email}
                <br />
                <strong>Phone number: </strong>
                {item.phone_number}
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
