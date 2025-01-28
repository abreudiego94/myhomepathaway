
import { TextField, Card, CardContent, Grid, Button, Alert, CircularProgress } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import { BarChart } from '@mui/x-charts/BarChart';
import useCensusData from '../hooks/useCensusData';
import CheckIcon from '@mui/icons-material/Check';
import { NumericFormat } from 'react-number-format';


function Dashboard() {
const {
    inputRef,
    isLoaded,
    onLoad,
    onPlaceChanged,
    handleSearch,
    state,
    county,
    incomeData,
    monthlyIncome,
    setMonthlyIncome,
    isLoading,
    error,
  } = useCensusData();

  
  if (!isLoaded) return <div>Loading...</div>;
 

  return (
    <div>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={24} sm={24} md={24} >
          <Card>
            <CardContent>
                <NumericFormat
                  value={monthlyIncome}
                  onValueChange={(values) => setMonthlyIncome(values.floatValue || 0)}
                   style={{
                    marginBottom: '10px'
                   }}
                  label="Enter your monthly income"
                  customInput={TextField}
                  variant="outlined"
                  fullWidth
                  placeholder="Ex: $5000"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2} // Limita a 2 casas decimais
                  fixedDecimalScale={false}
                  allowNegative={false}
                />
              
              <Autocomplete options={{
                  types: ['(regions)'],
                  componentRestrictions: { country: 'US' },
                }} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <TextField
                  inputRef={inputRef}
                  label="Enter location to compare"
                  variant="outlined"
                  fullWidth
                  placeholder="Ex New York"
                />
              </Autocomplete>
              {
                state &&  <Alert icon={<CheckIcon fontSize="inherit" />} style={{marginTop: '10px'}} severity="success">
                  Selected state: {state}
                </Alert>
              }
              {
                error && 
                  <Alert icon={<CheckIcon fontSize="inherit" />} style={{ marginTop: '10px' }} severity="error">
                    {error}
                  </Alert>
              }
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} style={{ color: 'white', marginRight: 10 }} />
                    Loading...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
              
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {
            incomeData && <Card>
            <CardContent>
              <BarChart
                  series={[
                    { data: [monthlyIncome] },  // Renda do usuário
                    { data: [incomeData.income] },  // Renda média
                  ]}
                  height={290}
                  xAxis={[
                    { 
                      data: [''],  
                      scaleType: 'band' 
                    }
                  ]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                    <div style={{ width: 20, height: 20, backgroundColor: '#4CAF50', marginRight: 5 }}></div>
                    <span>User's Income</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, backgroundColor: '#2196F3', marginRight: 5 }}></div>
                    <span>Average Income</span>
                  </div>
                </div>
            </CardContent>
          </Card>
          }
        
        </Grid>

      </Grid>
    </div>
  );
}

export default Dashboard;
