import React, { ChangeEvent, useEffect, useState } from 'react'
import { Autocomplete, Box, Popper, TextField } from '@mui/material'
import './style.scss';
import { Countries, Country } from '../TableGrid/interface';
import { useDebounce } from '../../shared/scripts/debouncer';
import { bypassCors } from '../../shared/scripts/bypassCors';
import InfoModal from '../InfoModal/InfoModal';

const SearchBar = ({ countries }: Countries) => {
  const [results, setResults] = useState<Country[]>([...countries]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce(searchTerm, 500);
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

  const getSearchedCountriesData = async (searchText: string) => {
    await fetch(bypassCors(`https://excitel-countries.azurewebsites.net/countries/${searchText}`))
      .then((response) => response.json())
      .then((response: Country[]) => {
        setResults(
          response.map((el: Country, index: number) => {
            return { id: index, ...el }
          })
        )
      });
  }

  const searchCharacters = async (searchText: string) => {
    await getSearchedCountriesData(searchText)
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchCharacters(debouncedSearchTerm);
      } else {
        setResults([...countries]);;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleOpenModal = (data: Country) => {
    delete data.id;
    setModalCountryInfo(data);
    setOpenModal(true);
  }

  return (
    <Box className="search-container">
      <Autocomplete
        className="autocomplete-search"
        options={results}
        autoHighlight
        getOptionLabel={(option) => option.name}
        PopperComponent={(props: any) => (<Popper {...props} className="search-popper-container" placement='bottom'></Popper>)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={option.flag}
              srcSet={option.flag}
              alt=""
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            className="autocomplete-input"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
        onChange={(e, value) => value ? handleOpenModal(value) : null}
      />
      <InfoModal openModal={openModal} onClose={() => setOpenModal(false)} modalInfo={modalCountryInfo} />
    </Box>
  )
}

export default SearchBar