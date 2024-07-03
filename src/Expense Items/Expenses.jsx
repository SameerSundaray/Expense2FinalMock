import { useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import "../Expense Items/Expenses.css";
import { Addcart } from "../Components/Auth/Auth";

const Expenselist = ({ itemlist, onremove, onedit }) => {
  const dispatch = useDispatch();

  const submiting = (expense) => {
    dispatch(Addcart(expense));
    alert("Added to the Cart");
  };

  const headers = [
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
    { label: "Paid To", key: "paidto" },
  ];

  const csvfiledata = itemlist.map((expense) => ({
    amount: expense.amount,
    date: expense.date,
    paidto: expense.paidto,
  }));
  return (
    <div className="expenses-table-container">
      <h3>Expenses List</h3>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Paid To</th>
            <th>Icon</th>
            <th className="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemlist.map((expense) => (
            <tr key={expense.id} className="expense-item">
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.paidto}</td>
              <td>{expense.icons}</td>
              <td>
                <button onClick={() => onedit(expense)} className="edit-button">
                  Edit
                </button>
                <button
                  onClick={() => onremove(expense.id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    submiting(expense);
                  }}
                  className="cartutton"
                >
                  Cart
                </button>
                <button>
                  <CSVLink
                    data={csvfiledata}
                    headers={headers}
                    filename={"expenses.csv"}
                  >
                    Download
                  </CSVLink>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenselist;
