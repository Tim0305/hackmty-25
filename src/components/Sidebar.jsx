import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function Sidebar({ open, onClose, onClickItem }) {
  const options = ["Empleados", "Productos"];

  const handleOptionClick = (option) => {
    onClickItem(option);
    if (onClose)
      onClose()
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
