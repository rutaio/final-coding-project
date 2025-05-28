import './table.css';

interface TableProps {
  headers: string[];
  data: {
    key: string | number; // I'll be passing user._id just in case
    cells: React.ReactNode[]; // to accept not only strings and numbers, but also buttons
  }[];
}

export const Table = ({ headers, data }: TableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, headerIndex) => (
            <th key={headerIndex}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.key}>
            {row.cells.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
