import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  PaginationContainer,
  StyledButton,
  StyledTable,
  StyledTableContainer,
  StyledTableWrapper,
  Td,
  Th,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from '../../reusecore/Table';

const TableComponent = ({
  data,
  columns,
  loading,
  noData,
  setOption,
  option,
  setName,
}) => {
  return (
    <Table
      {...{ data, columns }}
      loading={loading}
      noData={noData}
      setOption={setOption}
      option={option}
      setName={setName}
    />
  );
};

function Table({ data, columns, loading, noData, setOption, option, setName }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const options = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quaterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'All time', value: 'all' },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const PaginationButton = ({
    loading,
    children,
    disabled,
    className,
    onClick,
  }) => {
    return (
      <StyledButton
        className={className}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    );
  };

  const responsive_items = [
    'likes_received',
    'post_count',
    'days_visited',
    'solutions',
  ];

  return (
    <>
      <StyledTableContainer>
        <div className="filters">
          <div className="toggle-container">
            <span>Filter By</span>
            <select
              className="toggle-period"
              value={option}
              onChange={e => {
                setOption(e.target?.value);
              }}
            >
              {options?.map(metric => (
                <option
                  className="text-xs"
                  key={metric?.label}
                  value={metric?.value}
                >
                  {metric?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <input
              type="search"
              placeholder="Search by name..."
              value={globalFilter ?? ''}
              onChange={event => {
                setGlobalFilter(event.target.value);
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <StyledTableWrapper>
          <StyledTable>
            <TableHeader>
              {table?.getHeaderGroups().map(headerGroup => (
                <TableHead key={headerGroup.id} type="header">
                  {headerGroup.headers.map(header => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={
                          responsive_items.includes(header?.id)
                            ? 'mobile-hidden'
                            : ''
                        }
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </Th>
                    );
                  })}
                </TableHead>
              ))}
            </TableHeader>
            <TableBody>
              {!loading &&
                table?.getRowModel()?.rows.map(row => {
                  return (
                    <TableRow key={row.id} id={row?.id}>
                      {row?.getVisibleCells().map(cell => {
                        return (
                          <Td
                            key={cell.id}
                            className={
                              responsive_items.includes(cell?.column?.id)
                                ? 'mobile-hidden'
                                : ''
                            }
                          >
                            <div>
                              {flexRender(
                                cell?.column.columnDef.cell,
                                cell?.getContext()
                              )}
                            </div>
                          </Td>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </StyledTable>
          {loading && (
            <section className="h-64 w-full flex items-center justify-center">
              <section>Loading...</section>
            </section>
          )}
          {!loading && data?.length === 0 && (
            <section className="h-64 w-full flex items-center justify-center">
              <p className="text-gray-400">
                {noData || 'Oops! No Data to Display'}
              </p>
            </section>
          )}
        </StyledTableWrapper>
      </StyledTableContainer>
      <div className="h-2" />
      {!loading && data?.length > 0 && (
        <PaginationContainer>
          <div className="main">
            <div className="page-btn-container">
              <PaginationButton
                className=""
                onClick={() => table?.setPageIndex(0)}
                disabled={!table?.getCanPreviousPage()}
                loading={false}
              >
                {'<<'}
              </PaginationButton>
              <PaginationButton
                onClick={() => table?.previousPage()}
                disabled={!table?.getCanPreviousPage()}
                loading={false}
              >
                &larr; Prev
              </PaginationButton>
              <PaginationButton
                onClick={() => table?.nextPage()}
                disabled={!table?.getCanNextPage()}
                loading={false}
              >
                Next &rarr;
              </PaginationButton>
              <PaginationButton
                onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
                disabled={!table?.getCanNextPage()}
                loading={false}
              >
                {'>>'}
              </PaginationButton>
            </div>
            <div className="page-selector">
              <span className="page-section">
                <div>Page</div>
                <strong>
                  {table?.getState().pagination.pageIndex + 1} of{' '}
                  {table?.getPageCount()}
                </strong>
                | Go to page:
                <input
                  type="number"
                  defaultValue={table?.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                />
              </span>
              {/* <select
                value={table?.getState().pagination.pageSize}
                onChange={e => {
                  table?.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option className="text-xs" key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </PaginationContainer>
      )}
    </>
  );
}

export default TableComponent;
