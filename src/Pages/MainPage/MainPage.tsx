import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableGrid from '../../components/TableGrid/TableGrid'
import './style.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Country } from '../../components/TableGrid/interface';
import Spinner from '../../components/Spinner/Spinner';
import { bypassCors } from '../../shared/scripts/bypassCors';


const MainPage = () => {

  const [countryList, setCountryList] = useState<Array<Country>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCountriesData = async () => {
    await fetch(bypassCors("https://excitel-countries.azurewebsites.net/countries"))
      .then((response) => response.json())
      .then((response: Country[]) => {
        setCountryList(
          response.map((el: Country, index: number) => {
            return { id: index, ...el }
          })
        )
        setIsLoading(false)
      });
  }

  useEffect(() => {
    getCountriesData()
  }, [])

  return (
    <Box className="main-page">
      <Box className="wrapper">
        {
          !isLoading ? (
            <>
              <SearchBar countries={countryList} />
              <TableGrid countries={countryList} />
            </>
          )
            : (
              <Spinner text="Loading..." />
            )
        }
      </Box>
    </Box>
  )
}

export default MainPage