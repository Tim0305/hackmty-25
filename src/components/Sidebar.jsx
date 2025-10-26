import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar({ open, onClose, onClickItem }) {
  const options = ["Dashboard", "Empleados", "Productos"];
  const navigate = useNavigate()

  const handleOptionClick = (option) => {
    if (onClickItem)
      onClickItem(option);
    if (onClose)
      onClose()
    if(option === "Dashboard") navigate("/manager")
    else if(option === "Empleados") navigate("/manager/employees");
    else if(option === "Productos") navigate("/manager/products");
    else if(option === "Sign Out") navigate("/login");
  };

  const list = () => (
    <div
      className="w-64 h-full p-5 flex flex-col justify-between"
      role="presentation"
      onClick={onClose}
    >
      <List>
        {options.map((o) => (
          <ListItemButton
            key={o}
            onClick={() => handleOptionClick(o)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <ListItemText primary={o} />
          </ListItemButton>
        ))}
      </List>
      <div className="p-2">
        <ListItemButton
          onClick={() => handleOptionClick("Sign Out")}
          className="cursor-pointer hover:bg-red-100 !text-red-600"
        >
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </div>
    </div>
  );
  return (
    <div>
      <Drawer anchor="left" open={open} onClose={onClose}>
        {list()}
      </Drawer>
    </div>
  );
}
export default Sidebar;
