import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { SiParamountplus } from "react-icons/si";
import { MdOtherHouses } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { MdOutlinePedalBike } from "react-icons/md";
import "../AddingExpenses/Expenses.css";
import Expenselist from "../../Expense Items/Expenses";
import axios from "axios";
import { changetheme } from "../Auth/Auth";
import { FaCloudMoonRain } from "react-icons/fa6";
import { FaCloudSunRain } from "react-icons/fa";
import {
  setExpenses,
  addExpense,
  removeExpense,
  editingExpense,
} from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";

export default function Expenses() {
  const dispatch = useDispatch();
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const expenses = useSelector((state) => state.expenses);
  const [paidto, setpaidto] = useState("");
  const [icons, seticon] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [currentid, setcurrentid] = useState(null);
  const [visible, setvisible] = useState(false);
  const [totalexpense, settotal] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkmode);

  useEffect(() => {
    const fetchingdata = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json"
        );
        const fetchedExpenses = response.data
          ? Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
          : [];
        dispatch(setExpenses(fetchedExpenses));
        if(fetchedExpenses.length>0){
          setvisible(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchingdata();
  }, [dispatch]);
  const submiting = async (event) => {
    event.preventDefault();

    const newexpense = { amount, date, paidto, icons };
    if (isEditing) {
      try {
        await axios.put(
          `https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json`,
          newexpense
        );
        dispatch(editingExpense({ id: currentid, updatedData: newexpense }));
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axios.post(
          "https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json",
          newexpense
        );
        const id = response.data.name;
        dispatch(addExpense({ id, ...newexpense }));
      } catch (err) {
        console.error(err);
      }
    }
    setamount("");
    setdate("");
    setpaidto("");
    seticon("");
    setisEditing(false);
    setcurrentid(null);
    setvisible(true);
  };

  const editingHandlingItems = (expense) => {
    setamount(expense.amount);
    setdate(expense.date);
    setpaidto(expense.paidto);
    seticon(expense.icons);
    setisEditing(true);
    setcurrentid(expense.id);
    setvisible(false);
  };

  const Removingexpenses = async (id) => {
    try {
      await axios.delete(
        `https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense/${id}.json`
      );
      dispatch(removeExpense(id));
      console.log("SUCCESSFULLY DELETED");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const total = expenses.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );
    settotal(total);
  }, [expenses]);

  const themeHandle = () => {
    dispatch(changetheme());
  };
  return (
    <div className={`All-background-items ${darkMode ? "dark" : "light"}`}>
      <button onClick={themeHandle} className="All-button">
        {darkMode
          ? " Light" && <FaCloudSunRain className="cloudy" />
          : " Dark" && <FaCloudMoonRain className="rainy"/>}

          
      </button>
      <form onSubmit={submiting}>
        <div className="All-amount-box">
          <h3>{isEditing ? "Edit Expense" : "Amount Spent"}</h3>
          <div className="Enter-amount">
            <FaRupeeSign className="rupee" />
            <input
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              required
            />
            <FaArrowRightFromBracket className="bracket" />
          </div>
          <div className="All-date-items">
            <div className="All-date_timings">
              <label>Date & Time</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
                required
              />
            </div>
            <div className="All-date_paid">
              <label>Paid to</label>
              <input
                type="text"
                placeholder="Enter the name or place"
                value={paidto}
                onChange={(e) => setpaidto(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div
          className="aLL-icons"
          value={icons}
          onChange={(e) => seticon(e.target.value)}
          required
        >
          <p onClick={() => seticon(<FaMoneyCheckDollar />)} required>
            <FaMoneyCheckDollar className="All-iconic-stars" />
          </p>
          <p onClick={() => seticon(<IoStatsChartSharp />)} required>
            <IoStatsChartSharp className="All-iconic-sharp" />
          </p>
          <p onClick={() => seticon(<BsStars />)} required>
            <BsStars className="All-iconic-enter" />
          </p>
          <p onClick={() => seticon(<TbToolsKitchen3 />)} required>
            <TbToolsKitchen3 className="All-iconic-sood" />
          </p>
          <p onClick={() => seticon(<BsFillFuelPumpFill />)} required>
            <BsFillFuelPumpFill className="All-iconic-fuels" />
          </p>
          <p onClick={() => seticon(<MdOutlineLocalGroceryStore />)} required>
            <MdOutlineLocalGroceryStore className="All-iconic-groceries" />
          </p>
          <p onClick={() => seticon(<GiHealthNormal />)} required>
            <GiHealthNormal className="All-iconic-health" />
          </p>
          <p onClick={() => seticon(<SiParamountplus />)} required>
            <SiParamountplus className="All-iconic-inves" />
          </p>
          <p onClick={() => seticon(<MdOtherHouses />)} required>
            <MdOtherHouses className="All-iconic-other" />
          </p>
          <p onClick={() => seticon(<FaShoppingBag />)} required>
            <FaShoppingBag className="All-iconic-shopp" />
          </p>
          <p onClick={() => seticon(<FaArrowDownUpAcrossLine />)} required>
            <FaArrowDownUpAcrossLine className="All-iconic-trans" />
          </p>
          <p onClick={() => seticon(<MdOutlinePedalBike />)} required>
            <MdOutlinePedalBike className="All-iconic-travel" />
          </p>
        </div>

        <button className="save-button">{isEditing ? "Update" : "Save"}</button>
      </form>

     {visible &&<Expenselist
        itemlist={expenses}
        onremove={Removingexpenses}
        onedit={editingHandlingItems}
      />
}
      {totalexpense > 10000 && <button className="premiuum" >Premium</button>}
    </div>
  );
}
