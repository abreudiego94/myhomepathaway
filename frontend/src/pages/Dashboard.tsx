
import { TextField, Card, CardContent, Grid, Button, Alert, CircularProgress } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import useCensusData from '../hooks/useCensusData';
import CheckIcon from '@mui/icons-material/Check';
import { NumericFormat } from 'react-number-format';
import ReactECharts from 'echarts-for-react';

function Dashboard() {
  const labelRight = {
      position: 'inside'
  };

const {
    inputRef,
    isLoaded,
    onLoad,
    onPlaceChanged,
    handleSearch,
    state,
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
                  label="Enter your yearly income"
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
            incomeData &&
         
              <ReactECharts
                  option={{
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      }
                    },
                    grid: {
                      top: 80,
                      bottom: 30
                    },
                    xAxis: {
                      type: 'value',
                      position: 'top',
                      splitLine: {
                        lineStyle: {
                          type: 'dashed'
                        }
                      }
                    },
                    yAxis: {
                      type: 'category',
                      data: [
                        'You',
                        'Median',
                      ]
                    },
                    series: [
                      {
                        name: 'Yearly income',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                          show: true,      
                          formatter: '{b}: ${c}'
                        },
                        data: [
                          { value: monthlyIncome, label: labelRight },
                          { value: incomeData['income'], label: labelRight },
                        ]
                      }
                    ]
                  }}
                  notMerge={true}
                  lazyUpdate={true}
                />
            }
        
        </Grid>

      </Grid>
    </div>
  );
}

export default Dashboard;
