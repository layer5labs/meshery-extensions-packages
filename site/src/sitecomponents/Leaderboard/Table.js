import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  StyledTable,
  StyledTableContainer,
  StyledTableWrapper,
  TD,
  TH,
  TableBody,
  TableHeader,
  TableRow,
} from '../../reusecore/Table';

const TableComponent = ({
  data,
  columns,
  loading,
  noData,
  setOption,
  option,
}) => {
  return (
    <Table
      {...{ data, columns }}
      loading={loading}
      noData={noData}
      setOption={setOption}
      option={option}
    />
  );
};

function Table({ data, columns, loading, noData, setOption, option }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const options = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Daily', value: 'daily' },
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

  const StyledButton = styled.button`
    border: 1px solid;
    border-radius: 2px;
    padding: 4px;
    font-size: 12px;
    text-transform: capitalize;
    cursor: pointer;

    ${props =>
      props.disabled
        ? `
      background-color: #ccc;
      opacity: 0.6;
    `
        : `
      background-color: #00B39F;
      color: #fff;
    `}
  `;

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

  return (
    <>
      <div className="grid grid-cols-2 justify-between mt-4 mx-4">
        <div>
          {/* <TextField
            value={globalFilter ?? ''}
            onChange={event => setGlobalFilter(event.target.value)}
            className="p-2 font-lg border border-block"
            placeholder="Search Member"
            leftIcon={<Image src={search} alt={'Search'} />}
          /> */}
        </div>
        <div className="ml-4">
          {/* <SelectDropdown
            options={options}
            defaultValue={option}
            placeholder="Toggle By"
            onChange={({ value }) => {
              setOption(value);
            }}
          /> */}
        </div>
      </div>
      <StyledTableContainer>
        <StyledTableWrapper>
          <StyledTable>
            <TableHeader>
              {table?.getHeaderGroups().map(headerGroup => (
                <tr
                  key={headerGroup.id}
                  className="w-full border-y border-light text-white bg-primary"
                >
                  {headerGroup.headers.map(header => {
                    return (
                      <TH key={header.id} colSpan={header.colSpan}>
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
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </TH>
                    );
                  })}
                </tr>
              ))}
            </TableHeader>
            <TableBody className="bg-white">
              {!loading &&
                table?.getRowModel()?.rows.map(row => {
                  return (
                    <TableRow key={row.id} id={row?.id}>
                      {row?.getVisibleCells().map(cell => {
                        return (
                          <TD key={cell.id}>
                            <div>
                              {flexRender(
                                cell?.column.columnDef.cell,
                                cell?.getContext()
                              )}
                            </div>
                          </TD>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </StyledTable>
          {loading && (
            <section className="h-64 w-full flex items-center justify-center">
              <section>
                Loading...
                {/* <BtnLoader /> */}
              </section>
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
        <section className="flex items-center justify-center text-sx text-gray-600">
          <div className="flex items-center gap-2">
            <PaginationButton
              className=""
              onClick={() => table?.setPageIndex(0)}
              disabled={!table?.getCanPreviousPage()}
              loading={false}
            >
              {'<<'}
            </PaginationButton>
            <PaginationButton
              className=""
              onClick={() => table?.previousPage()}
              disabled={!table?.getCanPreviousPage()}
              loading={false}
            >
              &larr; Prev
            </PaginationButton>
            <PaginationButton
              className=""
              onClick={() => table?.nextPage()}
              disabled={!table?.getCanNextPage()}
              loading={false}
            >
              Next &rarr;
            </PaginationButton>

            <PaginationButton
              className=""
              onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
              disabled={!table?.getCanNextPage()}
              loading={false}
            >
              {'>>'}
            </PaginationButton>

            <span className="flex items-center gap-1 text-xs">
              <div>Page</div>
              <strong>
                {table?.getState().pagination.pageIndex + 1} of{' '}
                {table?.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1 text-xs">
              | Go to page:
              <input
                type="number"
                defaultValue={table?.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
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
            </select>
          </div>
        </section>
      )}
    </>
  );
}

export default TableComponent;
