import React, { useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import './style.scss';
import { DataGrid, GridCellParams, GridColDef, } from '@mui/x-data-grid';
import { Country, Countries } from './interface';
import InfoModal from '../InfoModal/InfoModal';

const TableGrid = ({ countries }: Countries) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalCountryInfo, setModalCountryInfo] = useState<Country>({
        capitalName: "",
        code: "",
        flag: "",
        latLng: [0, 0],
        name: "",
        population: 0,
        region: "",
        subregion: "",
    });
    const [counter, setCounter] = useState<number>(0);
    const intervalRef = useRef<any>(null);
    const windowHeight = window.innerHeight;
    const tableGridPageSize = windowHeight > 850 ? 10 : (Math.floor(windowHeight / 100));

    const startCounter = (countryData: Country) => {
        if (intervalRef.current) return;
        const data = { ...countryData };
        delete data.id;
        setModalCountryInfo(data);
        intervalRef.current = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter < 50) {
                    return prevCounter + 2
                }
                else {
                    setOpenModal(true);
                    return 0
                }
            });
        }, 100);
    };

    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            setCounter(0)
            intervalRef.current = null;
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'table-header',
            cellClassName: 'table-cell',
            flex: 1,
            minWidth: 250,
            renderCell: (params: GridCellParams) => (
                <Box
                    className="row-cell"
                    onMouseDown={() => startCounter(params.row)}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={() => startCounter(params.row)}
                    onTouchEnd={stopCounter}
                >
                    {params.row?.name}
                </Box>
            )
        },
        {
            field: 'code',
            headerName: 'Code',
            headerClassName: 'table-header',
            cellClassName: 'table-cell',
            flex: 1,
            minWidth: 50,
            renderCell: (params: GridCellParams) => (
                <Box
                    className="row-cell"
                    onMouseDown={() => startCounter(params.row)}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={() => startCounter(params.row)}
                    onTouchEnd={stopCounter}
                >
                    {params.row.code}
                </Box>
            )
        },
        {
            field: 'flag',
            headerName: 'Flag',
            headerClassName: 'table-header',
            cellClassName: 'table-cell',
            flex: 1,
            minWidth: 50,
            sortable: false,
            renderCell: (params: GridCellParams) => (
                <Box
                    className="row-cell"
                    onMouseDown={() => startCounter(params.row)}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={() => startCounter(params.row)}
                    onTouchEnd={stopCounter}
                >
                    <Box component="img" className="table-icon" src={params.row.flag} alt={params.row.name} />
                </Box>
            ),
        },
        {
            field: 'population',
            headerName: 'Population',
            headerClassName: 'table-header',
            cellClassName: 'table-cell',
            flex: 1,
            minWidth: 100
            ,
            renderCell: (params: GridCellParams) => (
                <Box
                    className="row-cell"
                    onMouseDown={() => startCounter(params.row)}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={() => startCounter(params.row)}
                    onTouchEnd={stopCounter}
                >
                    {params.row.population}
                </Box>
            )
        },
        {
            field: 'region',
            headerName: 'Region',
            headerClassName: 'table-header',
            cellClassName: 'table-cell',
            flex: 1,
            minWidth: 120,
            renderCell: (params: GridCellParams) => (
                <Box
                    className="row-cell"
                    onMouseDown={() => startCounter(params.row)}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={() => startCounter(params.row)}
                    onTouchEnd={stopCounter}
                >
                    {params.row.region}
                </Box>
            )
        },
    ];


    return (
        <Box className="table-grid-container">
            <Box className="loading-container">
                {
                    counter !== 0 && (<Typography variant="h5">Loading Modal... {counter * 2}%</Typography>)
                }
            </Box>
            <DataGrid
                className="table-grid"
                rows={countries}
                columns={columns}
                autoHeight
                rowHeight={50}
                pageSize={tableGridPageSize}
                rowsPerPageOptions={[tableGridPageSize]}
                hideFooterSelectedRowCount
            />
            <InfoModal openModal={openModal} onClose={() => setOpenModal(false)} modalInfo={modalCountryInfo} />
        </Box >
    )
}

export default TableGrid