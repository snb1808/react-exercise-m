/*
1. Using the mockApi below, fetch users when the component mounts and store this in component state - done

2. Using the data we just fetched, display the total balance of all accounts across all banks

3. Display the names of all Yorkshire Finance customers (each name should only be printed once)

4. Add up and display the total balance for each person across all their accounts, again ensuring each name is only printed once (if they only have one account just show that)

5. Create a button, when that button is clicked set the balance of all London Bank customers to 0
*/

import React, { useState, useEffect } from 'react';
import { UserAccount } from './typings';

export default function App(): React.ReactElement {
  const [users, setUsers] = useState<UserAccount[]>([]);

  useEffect(() => {
    mockApi.fetchUsers().then((data) => setUsers(data));
  }, []);

  const getTotalBalance = () => {
    let total = 0;

    users.map(({ balance }) => total = total + balance);

    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderYorkshireCustomers = () => {
    let yorkshireCustomers: Array<UserAccount> = [];

    users.map(user =>
        user.bank === 'Yorkshire Finance'
        && !yorkshireCustomers.find(({ name }) => name === user.name)
        && yorkshireCustomers.push(user)
    );

    return yorkshireCustomers.map((user, id) => <li key={id}>{user.name}</li>);
  };

  const renderTotals = () => {
    let allUsers: Array<UserAccount> = [];

    users.map(user => {
      const userIndex = allUsers.findIndex(({ name }) => name === user.name);

      let returnUser;

      if (userIndex !== -1) {
        returnUser = { ...allUsers[userIndex], balance: allUsers[userIndex].balance + user.balance }

        allUsers.splice(userIndex, 1);
      } else {
        returnUser = user
      }

      allUsers.push(returnUser);
    });

    return allUsers.map(({ name, balance }, index) =>
        <p key={index}>{name}: £{balance}</p>
    );
  };

  const handleClick = () => {
    const newUsers = users.map(user => {
      if (user.bank === 'London Bank') {
        user.balance = 0;
      }

      return user;
    });

    setUsers(newUsers);
  };

  return (
      <div className='App'>
        <h1>React Exercise</h1>
        <div className='cards-container'>
          <div className='card'>
            <h3>Total balance:</h3>
            <span>£{getTotalBalance()}</span>
          </div>
          <div className='card'>
            <h3>Yorkshire Finance Customers:</h3>
            <ul>
              {renderYorkshireCustomers()}
            </ul>
          </div>
          <div className='card'>
            <h3>Individual Totals:</h3>
            {renderTotals()}
          </div>
        </div>
        <button onClick={handleClick}>
          Crash London
        </button>
      </div>
  );
}

const mockApi = {
  fetchUsers(): Promise<UserAccount[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500);
    });
  }
};

const data: UserAccount[] = [
  {
    name: "David Davidson",
    bank: "Scottish Bank",
    accountType: "current",
    balance: 500
  },
  {
    name: "Robert Paulson",
    bank: "London Bank",
    accountType: "savings",
    balance: 10000
  },
  {
    name: "David Davidson",
    bank: "London Bank",
    accountType: "savings",
    balance: 5000
  },
  {
    name: "Regina George",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 999
  },
  {
    name: "Regina George",
    bank: "Yorkshire Finance",
    accountType: "savings",
    balance: 1001
  },
  {
    name: "Philip Johnson",
    bank: "Scottish Bank",
    accountType: "current",
    balance: 869
  },
  {
    name: "Claire Philips",
    bank: "London Bank",
    accountType: "current",
    balance: 1234
  },
  {
    name: "Megan Reid",
    bank: "Scottish Bank",
    accountType: "current",
    balance: -200
  },
  {
    name: "John Edwards",
    bank: "Scottish Bank",
    accountType: "current",
    balance: -500
  },
  {
    name: "Michael Komorowski",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 999
  },
  {
    name: "Michelle Johnson",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 800
  }
];
