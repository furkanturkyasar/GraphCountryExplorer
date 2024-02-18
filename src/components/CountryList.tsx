import React, { useState, useEffect } from 'react';

interface Country {
  code: string;
  name: string;
}

interface CountryListProps {
  groupedCountries: Record<string, Country[]>;
}

const itemsPerPage = 10;

const CountryList: React.FC<CountryListProps> = ({ groupedCountries }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
  const predefinedColors = [
    'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200',
    'bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300', 'bg-purple-300',
    'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200', 'bg-gray-200',
    'bg-pink-300', 'bg-indigo-300', 'bg-teal-300', 'bg-orange-300', 'bg-gray-300',
  ];

  useEffect(() => {
    setCurrentPage({});
  }, [groupedCountries]);

  useEffect(() => {
    const autoSelectItem = () => {
      Object.entries(groupedCountries).forEach(([groupName, countries]) => {
       
        const currentPageNumber = currentPage[groupName] || 1;
        const startIndex = (currentPageNumber - 1) * itemsPerPage;
        const paginatedCountries = countries.slice(startIndex, startIndex + itemsPerPage);
        
        if (paginatedCountries.length > 0) {
          const targetIndex = paginatedCountries.length >= 10 ? 9 : paginatedCountries.length - 1;
          setSelectedCountryCode(paginatedCountries[targetIndex].code);
  
          if (selectedCountryCode !== paginatedCountries[targetIndex].code) {
            const newIndex = Math.floor(Math.random() * predefinedColors.length);
            setSelectedColorIndex(newIndex);
          }
        }
      });
    };
  
    autoSelectItem();
  }, [groupedCountries, currentPage]);

  const handleSelectCountry = (code: string) => {
    if (code === selectedCountryCode) {
      setSelectedCountryCode(null);
    } else {
      setSelectedCountryCode(code);
      if (selectedCountryCode !== code) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * predefinedColors.length);
        } while (predefinedColors.length > 1 && newIndex === selectedColorIndex);
        setSelectedColorIndex(newIndex);
      }
    }
  };
  
  const getBackgroundColor = (code: string) => predefinedColors[selectedColorIndex] || 'bg-transparent';

  const handlePageChange = (groupName: string, direction: 'next' | 'prev') => {
    setCurrentPage(prevPages => {
      const currentPageForGroup = prevPages[groupName] || 1;
      const newPage = direction === 'next' ? Math.min(currentPageForGroup + 1, Math.ceil(groupedCountries[groupName].length / itemsPerPage)) : Math.max(1, currentPageForGroup - 1);
      return { ...prevPages, [groupName]: newPage };
    });
  };
  
  const EmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="mt-2 text-lg font-semibold text-gray-700">Veri Bulunamadı</h2>
      </div>
    );
  };

  return (
    <>
      {Object.entries(groupedCountries).map(([groupName, countries]) => {
        const totalCountries = countries.length;
        const totalPages = Math.ceil(totalCountries / itemsPerPage);
        const page = currentPage[groupName] || 1;
        const paginatedCountries = countries.slice((page - 1) * itemsPerPage, page * itemsPerPage);
     
        return (
          <div className='rounded-lg overflow-hidden shadow-lg bg-[#FFF] dark:bg-gray-800 my-4 p-4 hover:border-2 hover:border-blue-500 dark:hover:border-gray-600 transition-all duration-100 ease-in-out' key={groupName}>
            <h3 className="font-bold p-2">{countries.length > 0 ? groupName : EmptyState()}</h3>
            <ul className="list-none hover:list-decimal pl-5 space-y-2">
              {paginatedCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleSelectCountry(country.code)}
                  className={`cursor-pointer ${country.code === selectedCountryCode ? getBackgroundColor(country.code) + " font-bold text-gray-600" : 'bg-transparent'} transition-colors duration-150 rounded-lg p-2`}
                >
                  {country.name}
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4 space-x-4">
                <button 
                  disabled={page <= 1}
                  onClick={() => handlePageChange(groupName, 'prev')}
                  className="w-30 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed transition ease-in-out duration-150"
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button 
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(groupName, 'next')}
                  className="w-30 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed transition ease-in-out duration-150"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CountryList;
