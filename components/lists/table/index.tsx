export interface ITableHeader {
  title: string;
  id: string;
}

export interface ITableFooter {
  label: string;
  value: string;
  id: string;
}

export interface ITableData {
  id: string;
  [key: string]: any;
}

export interface ITableProps {
  headers: ITableHeader[];
  data: ITableData[];
  footer?: ITableFooter[];
}

const Table = (props: ITableProps) => {
  const { headers, data, footer } = props;

  return (
    <div className='overflow-x-auto'>
      <div className='inline-block min-w-full align-middle'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead>
            <tr>
              {headers.map((header: ITableHeader) => (
                <th
                  key={header.id}
                  scope='col'
                  className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {data.map((row: ITableData) => (
              <tr key={row.id}>
                {headers.map((header) => (
                  <td
                    key={`${row.id}-${header.id}`}
                    className='whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
                    {row[header.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {footer?.map((foot: ITableFooter) => (
              <tr key={foot.id}>
                {/* Desktop */}
                <th
                  scope='row'
                  colSpan={3}
                  className='hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0'>
                  {foot.label}
                </th>
                {/* Mobile */}
                <th scope='row' className='pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden'>
                  {foot.label}
                </th>
                <td className='pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'>{foot.value}</td>
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
