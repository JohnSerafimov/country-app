import React from 'react'
import { Box, Modal, Typography } from '@mui/material'
import './style.scss';
import { Country } from '../TableGrid/interface';
import { InfoModalInt } from './interface';
import { convertToCoordinates, stringToCapital } from '../../shared/scripts/common';

const InfoModal = ({openModal, modalInfo, onClose}: InfoModalInt<Country>) => {
    return (
        <Modal
            open={openModal}
            onClose={onClose}
            className="modal-container"
        >
            <Box className="modal-box">
                {
                    Object.keys(modalInfo).map((key: string, index) => {
                        if (key === 'flag') {
                            return (
                                <Box key={index} className="modal-detail-container">
                                    <Typography className="modal-header">Flag:</Typography>
                                    <Box component="img" className="modal-detail modal-icon" src={modalInfo.flag} alt={modalInfo.name} />
                                </Box>
                            )
                        } else if (key === 'latLng') {
                            const lat = convertToCoordinates(modalInfo.latLng[0].toString());
                            const lng = convertToCoordinates(modalInfo.latLng[1].toString());
                            return (
                                <Box key={index} className="modal-detail-container double-row">
                                    <Box className="modal-detail-row first">
                                        <Typography className="modal-header">Latitude:</Typography>
                                        <Typography className="modal-detail">{lat}</Typography>
                                    </Box>
                                    <Box className="modal-detail-row second">
                                        <Typography className="modal-header">Longitude:</Typography>
                                        <Typography className="modal-detail">{lng}</Typography>
                                    </Box>
                                </Box>
                            )
                        }
                        return (
                            <Box key={index} className="modal-detail-container">
                                <Typography className="modal-header">{stringToCapital(key)}:</Typography>
                                <Typography className="modal-detail">{modalInfo[key as keyof Country]}</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
        </Modal>
    )
}

export default InfoModal