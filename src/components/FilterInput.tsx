import React, {useState} from 'react';

interface FilterInputProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterInput: React.FC<FilterInputProps> = ({ setFilter }) => {
  return (
    <div className="mb-4">
        <div className="flex justify-center align-middle gap-4">
            <label htmlFor="filter" className="block text-bold text-sm text-gray-700">Filter Countries</label>
        {/* <InfoIconWithTooltip /> */}
        </div>
      <input
        type="text"
        name="filter"
        id="filter"
        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="search:Fr group:continent,code,name"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default FilterInput;

// const InfoIconWithTooltip = () => {
//     return (
//       <div className="relative flex items-center group">
//         <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full cursor-pointer">
//           <span>i</span>
//         </div>
//         <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
//           <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Gruplama yapabileceğiniz alanlar: continent, code, name.</span>
//           <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
//         </div>
//       </div>
//     );
//   };

