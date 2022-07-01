import { Box } from '@mui/material';
import React from 'react'
import "./style.scss";

interface Props {
    className?: string;
    text?: string;
}

const Spinner = ({ className, text = '' }: Props) => {
    return (
        <Box id="spinner-loader">
            <Box className="wrapper">
                <Box className={`lds-ring ${className}`}>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                </Box>
                {
                    text ? (
                        <Box className="spinner-text">
                            {text}
                        </Box>
                    ) : null
                }
            </Box>
        </Box>
    );
};

export default Spinner;