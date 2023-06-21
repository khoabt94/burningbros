import { ChangeEvent } from "react";

type SearchBoxProps = {
  query: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ query, onChange }: SearchBoxProps) => {
  return (
    <div className="">
      <input type="text" value={query} onChange={onChange} />
      <div className="">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default SearchBox;
