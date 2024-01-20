import { useEffect, useState } from "react";
import { TextField, Chip, InputAdornment, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export default function ChipDropDown({
  items,
  selectedItem,
  onChanged,
  disable = false,
  index,
  inquiryID
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (item) => {
    onChanged(index, item,inquiryID);
    setAnchorEl(null);
  };
  useEffect(() => {
    console.log(selectedItem);
  }, []);
  return (
    <div>
      {disable === false ? (
        <>
          <Chip
            label={selectedItem}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
            color={selectedItem !== "Not Solve" ? "success" : "error"}
            className="w-20"
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={(e) => setAnchorEl(null)}
          >
            {items.map((item) => (
              <MenuItem key={item} onClick={(e) => handleClick(item)}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Chip
          label={selectedItem}
          color={selectedItem !== "Not Solve" ? "success" : "error"}
          className="w-20"
        />
      )}
    </div>
  );
}
