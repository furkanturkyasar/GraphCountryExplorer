import React, { ChangeEvent, useState, useRef, useEffect } from 'react';

interface FilterInputProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterInput: React.FC<FilterInputProps> = ({ setFilter }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const autoCompleteOptions: string[] = [
    'search:Tur',
    'group:continent',
    'group:code',
    'group:name',
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilter(value);

    const filteredSuggestions = autoCompleteOptions.filter(option =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilter(suggestion);
    setSuggestions([]);
  };


  return (
    <div className="mb-6 relative" ref={wrapperRef}>
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="filter" className="text-lg font-semibold text-gray-700 py-2 dark:text-white">Filter Countries</label>
        <InfoIconWithTooltip />
      </div>
      <input
        type="text"
        name="filter"
        id="filter"
        value={inputValue}
        className="dark:text-gray-700 mt-2 block w-full p-3 border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        placeholder="search:Fr group:continent,code,name"
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 dark:text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterInput;

const InfoIconWithTooltip = () => {
  return (
    <div className="relative flex items-center group">
      <div className="flex items-center justify-center w-4 h-4 bg-blue-500 text-white rounded-full cursor-pointer">
        <span className='text-xs'>i</span>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-full ml-4 w-[200px] rounded-lg flex-col items-center hidden group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Fields where you can group: continent, code, name.</span>
        <div className="w-3 h-3 absolute -left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};
