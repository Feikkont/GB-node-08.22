import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export const MyTable = ({arr, cb}) => {

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell align="right">Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arr.map((row) => (
                            <TableRow
                                key={row.fileName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={()=>{cb(row)}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.isDir ? <FolderIcon /> : row.fileName == 'back' ? <DriveFolderUploadIcon/> : <TextSnippetIcon />}{row.fileName}
                                </TableCell>
                                <TableCell align="right">{row.size ?? 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};