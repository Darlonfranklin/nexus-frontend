import { InputAdornment, TextField } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Search as SearchUI } from "@mui/icons-material";

interface ISearch {
  value?: string | number | boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearch> = ({ value, onChange }) => {
  return (
    <Fragment>
      <TextField
        size="small"
        placeholder="Pesquisar..."
        name="name"
        value={value}
        onChange={onChange}
        type="text"
        fullWidth
        style={{ marginBottom: 15 }}
        InputLabelProps={{
          style: { fontSize: "0.9rem" },
        }}
        InputProps={{
          style: { fontSize: "0.9rem", borderRadius: "1px" },
          endAdornment: (
            <InputAdornment position="end">
              <SearchUI />
            </InputAdornment>
          ),
        }}
      />
    </Fragment>
  );
};

export default Search;
