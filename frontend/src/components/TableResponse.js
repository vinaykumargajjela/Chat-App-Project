import React from 'react';

// We now accept 'headers' and 'rows' as props
const TableResponse = ({ headers, rows }) => {
  
  // Basic check to make sure we have data
  if (!headers || !rows || headers.length === 0 || rows.length === 0) {
    return <p>No table data available.</p>;
  }
  
  return (
    // 'overflow-x-auto' makes the table scroll horizontally
    // on small screens, which is key for responsiveness.
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 my-2">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        
        {/* 1. Table Header */}
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {/* Map over the 'headers' array */}
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* 2. Table Body */}
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {/* Map over the 'rows' array */}
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Map over the cells *within* each row */}
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={`
                    px-6 py-4 whitespace-nowrap
                    ${cellIndex === 0 ? 'font-medium' : ''} 
                  `}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResponse;