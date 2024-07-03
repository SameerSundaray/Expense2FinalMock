import { useSelector } from "react-redux";
import Allroutes from "./Components/Allroutes/Allroutes";
import Cartitemlist from "./Components/CartItemList/Cartitemlist";

function App() {
  const showcart = useSelector((state) => state.ui.cartIsVisible);
  return (
    <div>
      <Allroutes />
      {showcart && <Cartitemlist />}
    </div>
  );
}

export default App;
