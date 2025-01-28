
# Census Data Application

This project is a full-stack application that retrieves and displays census data (such as median income) based on a user's selected location. The application uses **React** for the frontend and **NestJS** for the backend, integrating with external APIs like the Census Bureau API and FCC Geolocation API.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
   - [Backend](#backend)
   - [Frontend](#frontend)
4. [API Endpoints](#api-endpoints)
5. [Usage](#usage)
6. [License](#license)

---

## Features

- **Frontend**:
  - Autocomplete location search using Google Maps Places API.
  - Fetch and display county-level census data (e.g., median household income).
  - Error handling and loading indicators for a smooth user experience.

- **Backend**:
  - Uses **NestJS** framework for building scalable backend services.
  - Fetches data from the Census Bureau API and FCC Geolocation API.
  - Implements geolocation-to-county mapping for census data retrieval.

---

## Tech Stack

### Frontend:
- **React**: User interface framework.
- **Material-UI (MUI)**: UI components.
- **Google Maps JavaScript API**: Autocomplete location search.

### Backend:
- **NestJS**: Backend framework.
- **Axios**: HTTP client for API requests.
- **Census Bureau API**: Retrieves census data.
- **FCC Geolocation API**: Maps coordinates to county FIPS codes.

---

## Setup Instructions

### Prerequisites:
- Node.js (v18 or later)
- npm or yarn
- Google Maps API key
- Census Bureau API key

### Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/census-data-app.git
   cd census-data-app/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   CENSUS_API_URL=https://api.census.gov/data/2020/acs/acs5
   CENSUS_API_KEY=YOUR KEY KERE
   FCC_API_URL=https://geo.fcc.gov/api/census/block/find
   ```

4. **Run the server**:
   ```bash
   npm run start
   ```

   The backend will be running at `http://localhost:3000`.

---

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `frontend` directory with the following:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY="YOUR KEY"
   REACT_APP_BACKEND_URL="YOUR BACKEND URL"
   ```

4. **Run the React app**:
   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:3001`.

---

## API Endpoints

### Backend


1. **Get Income Data**:
   - **URL**: `/income`
   - **Method**: `GET`
   - **Query Parameters**:
     - `lat` (required): Latitude of the location.
     - `lng` (required): Longitude of the location.
   - **Response**:
     ```json
     {
       "income": [
         ["B19013_001E", "state", "county"],
         ["62453", "06", "001"]
       ]
     }
     ```

---

## Usage

1. **Frontend**:
   - Use the search bar to find a location.
   - Select a location from the autocomplete dropdown.
   - Click the "Search" button to retrieve census data.

2. **Backend**:
   - The backend listens for requests from the frontend, fetching and processing data from external APIs.

---

## Challenges

A major challenge during the development of this application was converting latitude and longitude coordinates into FIPS codes for counties, which are required to fetch accurate census data. The process of mapping geographic coordinates to FIPS codes using the FCC Geolocation API was not straightforward. Ensuring the accuracy of this conversion, especially considering varying levels of precision in geolocation data, required substantial effort in debugging and optimizing the mapping logic to guarantee reliable and precise data retrieval.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
