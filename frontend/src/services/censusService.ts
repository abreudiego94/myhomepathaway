import axiosInstance from './axiosInstance'; 

export const censusService = {

  fetchCensusData: async (state: string, lat: number, lng: number) => {
    try {
      const response = await axiosInstance.get(`/census`,{
        params: {
           lat,
           lng,
          state
        }
      });
      return response;
      
    } catch (error) {
       
      throw new Error('Erro ao editar produto');
    }
  },

};
