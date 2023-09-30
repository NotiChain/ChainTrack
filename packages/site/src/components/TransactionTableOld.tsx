// import React, { useState } from 'react';
// import {
//   Column,
//   ColumnDef,
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   Table,
//   useReactTable,
// } from '@tanstack/react-table';
// import { faker } from '@faker-js/faker';
//
// const columns = [
//   {
//     accessorKey: 'firstName',
//   },
//   {
//     accessorKey: 'lastName',
//   },
//   {
//     accessorKey: 'age',
//   },
//   {
//     accessorKey: 'visits',
//   },
//   {
//     accessorKey: 'status',
//   },
//   {
//     accessorKey: 'progress',
//   },
// ];
//
// export type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   progress: number;
//   status: 'relationship' | 'complicated' | 'single';
//   createdAt: Date;
//   subRows?: Person[];
// };
//
// const range = (len: number) => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };
//
// const newPerson = (): Person => {
//   return {
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     age: faker.number.int(40),
//     visits: faker.number.int(1000),
//     progress: faker.number.int(100),
//     createdAt: faker.date.birthdate({ max: new Date().getTime() }),
//     status: faker.helpers.shuffle<Person['status']>([
//       'relationship',
//       'complicated',
//       'single',
//     ])[0],
//   };
// };
//
// function makeData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): Person[] => {
//     const len = lens[depth];
//     return range(len).map((d): Person => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       };
//     });
//   };
//
//   return makeDataLevel();
// }
//
// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>;
//   table: Table<any>;
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);
//
//   const columnFilterValue = column.getFilterValue();
//
//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   );
// }
//
// const TransactionTable = () => {
//   const [data, setData] = React.useState(() => makeData(100000));
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//
//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     debugTable: true,
//   });
//
//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div
//                         {...{
//                           className: header.column.getCanSort()
//                             ? 'cursor-pointer select-none'
//                             : '',
//                           onClick: header.column.getToggleSortingHandler(),
//                         }}
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                         {header.column.getCanFilter() ? (
//                           <div>
//                             <Filter column={header.column} table={table} />
//                           </div>
//                         ) : null}
//                         {{
//                           asc: ' 🔼',
//                           desc: ' 🔽',
//                         }[header.column.getIsSorted() as string] ?? null}
//                       </div>
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>>'}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };
//
// export default TransactionTable;
