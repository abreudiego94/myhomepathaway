import { useState, useRef } from 'react';
import { censusService } from '../services/censusService';
import { useJsApiLoader } from '@react-google-maps/api';

function useCensusData() {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | undefined>(undefined);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [lat, setLat] = useState<number| undefined>();
  const [lng, setLng] = useState<number| undefined>();
  const [incomeData, setIncomeData] = useState<any>(null);
  const [error, setError] = useState<string>(''); 
  const inputRef = useRef(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!, 
    libraries: ['places'],
  });

  const onLoad = (autoC: any) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    
    if (autocomplete) {
      setCounty('')
      setState('')
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;
     
      let lat = place.geometry?.location?.lat();
      let lng = place.geometry?.location?.lng();
      setLat(lat)
      setLng(lng)
 
      if (addressComponents) {
        for (const component of addressComponents) {
          if (component.types.includes('administrative_area_level_1')) {
           
            setState( component.long_name); 
          }

          if (component.types.includes('administrative_area_level_2')) {
           
            setCounty(component.short_name); 
          }
        }
      } else {
        setSelectedPlace('Please select a valid location.');
      }
    }
  };

  const handleSearch = async () => {
    setError('');
    if (!state || !lat || !lng) {
      setError('Please select a valid location.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await censusService.fetchCensusData(state, lat, lng);

      if (!response.data) {
        setError('No data found for the selected location');
      } else {
       
        setIncomeData(response.data);
      }
    } catch (error) {
      setError('Error fetching Census data. Please try again later.');
    } finally {
      setIsLoading(false); // Desativa o loading após a finalização
    }
    
  };

  return {
    inputRef,
    isLoaded,
    onLoad,
    onPlaceChanged,
    handleSearch,
    state,
    county,
    incomeData,
    selectedPlace,
    error, 
    monthlyIncome, 
    setMonthlyIncome,
    isLoading
  };
}

export default useCensusData;
