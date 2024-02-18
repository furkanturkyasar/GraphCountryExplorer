import React, {useState} from 'react';

interface FilterInputProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterInput: React.FC<FilterInputProps> = ({ setFilter }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="filter" className="text-lg font-semibold text-gray-700 py-2 dark:text-white">Filter Countries</label>
        <InfoIconWithTooltip />
      </div>
      <input
        type="text"
        name="filter"
        id="filter"
        className="dark:text-gray-700 mt-2 block w-full p-3 border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        placeholder="search:Fr group:continent,code,name"
        onChange={(e) => setFilter(e.target.value)}
      />
  </div>
  );
}

export default FilterInput;

const InfoIconWithTooltip = () => {
  return (
    <div className="relative flex items-center group">
      <div className="flex items-center justify-center w-4 h-4 bg-blue-500 text-white rounded-full cursor-pointer">
        <span className='text-xs'>i</span>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-full ml-4 w-[200px] rounded-lg flex-col items-center hidden group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Gruplama yapabileceğiniz alanlar; continent, code, name.</span>
        <div className="w-3 h-3 absolute -left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};