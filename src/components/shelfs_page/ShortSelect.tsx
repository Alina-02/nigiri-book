import React, { useEffect, useRef, useState } from "react";

export const sortOptions = [
  { value: "title", label: "Title" },
  { value: "last_opened", label: "Last Opened" },
  { value: "author", label: "Author" },
];

interface Props {
  selected: {
    value: string;
    label: string;
  };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
}

const ShortSelect = (props: Props) => {
  const { selected, setSelected } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    //onSortChange(option.value);
  };

  return (
    <div className="relative w-[175px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex justify-between items-center 
          p-2 border-none rounded-xl shadow-md text-base bg-white 
          px-4 w-full h-[37px] cursor-pointer 
        "
      >
        <span>{selected.label}</span>

        <span className="text-gray-500 ml-2">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  p-2 px-4 text-base cursor-pointer 
                  ${
                    selected.value === option.value
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShortSelect;
