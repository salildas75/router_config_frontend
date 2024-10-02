import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  MaterialReactTable, //import alternative sub-component if we do not want toolbars
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { staticTableData } from "./static-table-data";
import { FileDownload } from "@mui/icons-material";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { TimeStampToDateFormater } from "../time-formater";
import { statusFormatter } from "../../components/user-status";
import logoImage from "../../assets/login_image.png";

function CustomReactMaterialTable({
  columns,
  enableRowActions = false,
  enableColumnActions = false,
  endPoint,
  params,
  companyName = "Titas Gas Transmission & Distribution Company Limited",
  enableColumnFilterModes = false,

  enableSorting = false,

  refetch = false,

  // for top and bottom toolbar
  enableTopToolbar = true,
  enableBottomToolbar = true,

  // inside toolbar top and bottom
  enableHiding = false,
  enableGlobalFilter = false,
  showGlobalFilter = false,
  enableFullScreenToggle = false,
  enableDensityToggle = false,
  enableColumnFilters = false,
  enablePagination = true,

  // report param
  reportName = "report",
  excludedColumnsForReport = [],

  staticLoad = false,
  muiSearchTextFieldProps = {
    placeholder: "Search",
    sx: { minWidth: "18rem" },
    variant: "outlined",
  },
  staticData = staticTableData,
  initialSorting = [],
  pageSize = 10,
  childFunc,
}) {
  useImperativeHandle(childFunc, () => ({
    rowCountF() {
      return rowCount;
    },
  }));

  //data and fetching state
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnFilterFns, setColumnFilterFns] = useState([]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState(initialSorting);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: pageSize,
  });

  //for fetch data
  const [searchParams, setSearchParams] = useState(() => {
    if (params) {
      return params;
    } else {
      return {};
    }
  });
  useEffect(() => {
    if (params) {
      setSearchParams(params);
      setPagination({ pageIndex: 1, pageSize: pageSize }); // for reset pagination when user search but not the page 1
    }
  }, [params]);

  //if you want to avoid useEffect, look at the React Query CustomReactMaterialTable instead
  const fetchData = async () => {
    setMetaData(0);
    setData([]);
    setRowCount(0);

    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(endPoint, process.env.REACT_APP_BASE_URL);

    if (enablePagination) {
      url.searchParams.set("page", `${pagination.pageIndex}`);
      url.searchParams.set("size", `${pagination.pageSize}`);
    }

    enableColumnFilters &&
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));

    enableGlobalFilter &&
      url.searchParams.set("globalFilter", globalFilter ?? "");

    enableSorting &&
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

    enableColumnFilterModes &&
      url.searchParams.set(
        "filtersParm",
        JSON.stringify(columnFilterFns ?? [])
      );
    Object.keys(searchParams).length !== 0 &&
      Object.keys(searchParams).forEach((i) => {
        url.searchParams.set(i, searchParams[i]);
      });
    try {
      const response = await axios.get(url.href, {
        headers: { "XTR-API-Action": "read" },
      });
      const json = response;

      setData(json.data?.dataList);
      setMetaData(json.data.totalPages);
      setRowCount(json.data?.dataList.length);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };

  useEffect(() => {
    if (!staticLoad) {
      fetchData();
    }
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    searchParams,
    refetch,
  ]);

  // for report download
  const fetchRowsForExport = async () => {
    try {
      const url = new URL(endPoint, process.env.REACT_APP_BASE_URL);

      // Add all existing parameters without pagination
      if (enableColumnFilters) {
        url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      }
      if (enableGlobalFilter) {
        url.searchParams.set("globalFilter", globalFilter ?? "");
      }
      if (enableSorting) {
        url.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      }
      if (enableColumnFilterModes) {
        url.searchParams.set(
          "filtersParm",
          JSON.stringify(columnFilterFns ?? [])
        );
      }
      Object.keys(searchParams).length !== 0 &&
        Object.keys(searchParams).forEach((i) => {
          url.searchParams.set(i, searchParams[i]);
        });

      // Custom param to fetch all rows for export
      // url.searchParams.set("all", "true");

      const response = await axios.get(url.href, {
        headers: { "XTR-API-Action": "read" },
      });
      return response.data?.dataList || [];
    } catch (error) {
      console.error("Error fetching rows for export:", error);
      return [];
    }
  };

  // for pdf export
  const handleExportRows = async () => {
    const rows = await fetchRowsForExport();
    const doc = new jsPDF();
    const excludedColumns = excludedColumnsForReport; // Add column headers to exclude here

    const tableHeaders = [
      "S/N",
      ...columns
        .map((c) => c.header)
        .filter((header) => !excludedColumns.includes(header)),
    ];
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const tableData = rows.map((row, index) => [
      index + 1,
      ...columns
        .filter((c) => !excludedColumns.includes(c.header))
        .map((c) => {
          const cellValue = getNestedValue(row, c.accessorKey);
          if (c.header.toLowerCase().includes("date")) {
            return TimeStampToDateFormater(cellValue);
          }
          if (c.header.toLowerCase().includes("status")) {
            return statusFormatter(cellValue);
          }
          return cellValue;
        }),
    ]);
    // Add the logo centered
    const logoWidth = 25; // Adjust logo width as needed
    const logoHeight = 25; // Adjust logo height as needed
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(
      logoImage,
      "PNG",
      (pageWidth - logoWidth) / 2,
      10,
      logoWidth,
      logoHeight
    );

    // Add the custom header centered
    doc.setFontSize(16);
    doc.text(companyName, pageWidth / 2, 10 + logoHeight + 10, {
      align: "center",
    });

    // Print date in top-right corner
    doc.setFontSize(8);
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Print Date: ${currentDate}`, pageWidth - 10, 10, {
      align: "right",
    });

    autoTable(doc, {
      startY: 25 + logoHeight,
      head: [tableHeaders],
      body: tableData,
      headStyles: { fontSize: 9 }, // Adjust header font size as needed
      bodyStyles: { fontSize: 8 },
    });

    doc.save(`${reportName}.pdf`);
  };

  const withDefaultColumns = [
    {
      accessorKey: "sn",
      header: "S/N",
      Cell: ({ row }) =>
        pagination?.pageSize * (pagination?.pageIndex - 1) + row.index + 1,
    },
    ...columns,
  ];
  const table = useMaterialReactTable({
    columns: withDefaultColumns,
    data: staticLoad ? staticData : data,

    muiPaginationProps: {
      showRowsPerPage: false,
      // rowsPerPageOptions: [5, 10, 20],
      shape: "rounded",
      variant: "outlined",
      showFirstButton: true,
      showLastButton: true,
      count: metaData || 0,
      page: pagination.pageIndex,
      onChange: (e, value) => {
        setPagination((prev) => ({ ...prev, pageIndex: value }));
      },
      color: "info",
    },
    paginationDisplayMode: "pages",

    enableRowActions: enableRowActions,
    enableColumnActions: enableColumnActions,

    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() => handleExportRows()}
          startIcon={<FileDownload />}
          variant="contained"
        >
          Export As A PDF
        </Button>
      </Box>
    ),

    enableHiding: enableHiding,
    enableColumnFilterModes: enableColumnFilterModes,
    enableColumnFilters: enableColumnFilters,
    enableGlobalFilter: enableGlobalFilter,
    enablePagination: enablePagination,
    enableSorting: enableSorting,
    enableFullScreenToggle: enableFullScreenToggle,
    enableDensityToggle: enableDensityToggle,
    enableTopToolbar: enableTopToolbar,
    enableBottomToolbar: enableBottomToolbar,
    //

    initialState: {
      showColumnFilters: false,
      showGlobalFilter: showGlobalFilter,
    },

    muiLinearProgressProps: ({ isTopToolbar }) => ({
      sx: { display: isTopToolbar ? "block" : "none" },
    }),
    //new

    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: "100%", //allow columns to get larger than default
      size: 260, //make columns wider by default
    },

    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
    }),
    muiTableBodyRowProps: { hover: true },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        background: "#8BD7DF",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "0px",
      },
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiSearchTextFieldProps: muiSearchTextFieldProps,
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilterFns,
      columnFilters,
      globalFilter,
      isLoading,
      // pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    positionToolbarAlertBanner: "bottom",
    positionActionsColumn: "last",
    enableMultiSort: true,
  });
  return (
    // <Box className="textEllipsis" width={{ xs: '60%', sm: "100%", lg: '100%' }}>
    <MaterialReactTable table={table} />
    // </Box>
  );
}

CustomReactMaterialTable.propTypes = {
  columns: PropTypes.array.isRequired,
  endPoint: PropTypes.string,
  enableColumnFilters: PropTypes.bool,
  enableColumnFilterModes: PropTypes.bool,
  enablePagination: PropTypes.bool,
  enableSorting: PropTypes.bool,

  enableGlobalFilter: PropTypes.bool,

  enableFullScreenToggle: PropTypes.bool,
  enableDensityToggle: PropTypes.bool,
  params: PropTypes.any,
  enableHiding: PropTypes.bool,
  enableTopToolbar: PropTypes.bool,

  staticLoad: PropTypes.bool,
  enableColumnActions: PropTypes.bool,
  enableRowActions: PropTypes.bool,
  staticData: PropTypes.array,

  muiSearchTextFieldProps: PropTypes.object,
  refetch: PropTypes.bool,
  showGlobalFilter: PropTypes.bool,
  // detailed panel
  enableBottomToolbar: PropTypes.any,
};

export default CustomReactMaterialTable;
