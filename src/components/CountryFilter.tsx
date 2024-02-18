import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import FilterInput from './FilterInput';
import CountryList from './CountryList';

const GET_COUNTRIES = gql`
{
  countries {
    code
    name
    continent {
      code
      name
    }
  }
}
`;

interface Country {
  code: string;
  name: string;
  continent: {
    code: string;
    name: string;
  };
}

const CountryFilter: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filter, setFilter] = useState('');
  const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[]>>({});

  useEffect(() => {
    if (data) {
      const parts = filter.split(' ');
      let result: Country[] = data.countries;
      let groupBy = '';

      parts.forEach(part => {
        const [key, value] = part.split(':');
        if (key === 'search' && value) {
          result = result.filter(country => country.name.includes(value));
        } else if (key === 'group' && value) {
          groupBy = value;
        }
      });

      if (groupBy) {
        const groups: Record<string, Country[]> = result.reduce((acc, country) => {
          const groupKey = country[groupBy as keyof Country] as any;
          if (groupKey) {
            const groupName = typeof groupKey === 'object' ? groupKey.name : groupKey;
            acc[groupName] = acc[groupName] || [];
            acc[groupName].push(country);
          }
          return acc;
        }, {} as Record<string, Country[]>);

        setGroupedCountries(groups);
      } else {
        setGroupedCountries({'All': result});
      }
    }
  }, [filter, data]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-lg text-blue-500">Loading...</p>
    </div>
  );
  
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <FilterInput setFilter={setFilter} />
      <CountryList groupedCountries={groupedCountries} />
    </div>
  );
}

export default CountryFilter;



