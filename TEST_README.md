# Unit Tests Documentation

This document describes the unit tests that have been added to the project.

## Test Files Created

### Backend Tests
- **File**: `backend/src/controllers/attendenceController.test.ts`
- **Purpose**: Tests for the `getAttendenceAnswers` controller function

### Frontend Tests
- **File**: `frontend/src/utility/SelectedServiceProvider.test.jsx`
- **Purpose**: Tests for the `handleOptionChange` function in the SelectedServiceProvider context

## Test Coverage

### Backend Tests (`attendenceController.test.ts`)

#### Test Case 1: Missing selections in request body
- Returns 400 when selections are missing
- Returns 400 when selections is null
- Returns 400 when selections is undefined

#### Test Case 2: Correctly calculates totalPriceImpact and finalTotalPrice
- Calculates totalPriceImpact correctly with all selections
- Uses provided totalPrice when greater than 0
- Calculates BASE_PRICE + totalPriceImpact when totalPrice is 0

#### Test Case 3: Updates existing FormResponseModel correctly
- Updates existing response with new selections and prices
- Handles missing price fields gracefully when updating

#### Test Case 4: Creates new FormResponseModel correctly
- Creates new response with all selections and prices
- Creates response with default values for missing selections
- Creates response with correct user identity

### Frontend Tests (`frontend/src/utility/SelectedServiceProvider.test.jsx`)

**Test Case 5: handleOptionChange updates selections and recalculates totalPrice**
- Updates stationery selection and recalculates price
- Updates body preparation selection and price
- Updates coffin selection and price
- Updates flowers selection
- Updates urn selection
- Updates collection method selection
- Accumulates prices from multiple selections
- Replaces previous selection price when changing same category
- Handles decimal price adjustments
- Updates amount state alongside totalPrice
- Handles zero price adjustments
- Handles large price adjustments
- Calculates total with all maximum price options
- Preserves other selections when updating one category
- Integration with handleSelectChange function

## Setup Instructions

### Backend Tests

1. Install required dependencies:
```bash path=null start=null
cd backend
npm install --save-dev jest ts-jest @types/jest
```

2. Update `package.json` test script:
```json path=/Users/shuvo/code/work/projectbf/backend/package.json start=8
"test": "jest"
```

3. Run tests:
```bash
npm test
```

### Frontend Tests

To run the frontend tests, install the required dependencies:

```bash path=null start=null
cd frontend
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/react-hooks @babel/preset-env @babel/preset-react babel-jest identity-obj-proxy jest-environment-jsdom
```

Then update package.json test script to:
```json path=null start=null
"test": "jest"
```

## Test Coverage Summary

### Backend Tests (attendenceController.test.ts)
✅ **Test Case 1**: Missing selections - 3 tests
- Returns 400 when selections are missing
- Returns 400 when selections is null  
- Returns 400 when selections is undefined

✅ **Test Case 2**: Correctly calculates totalPriceImpact and finalTotalPrice - 3 tests covering various price calculation scenarios

✅ **Test Case 3**: Updates existing FormResponseModel - 2 tests covering update logic and handling missing price fields

✅ **Test Case 4**: Creates new FormResponseModel - 3 tests covering creation with full data, empty selections, and different user identities

Additional backend tests include authentication checks and error handling.

## Frontend Tests (`frontend/src/utility/SelectedServiceProvider.test.jsx`)

Comprehensive tests for Test Case 5 covering:
- Individual selection updates (stationery, body preparation, coffin, flowers, urn, collection method)
- Multiple selections accumulation
- Price replacement when changing same category
- Decimal price calculations
- Zero and large price adjustments
- Amount state synchronization
- Selection preservation across updates
- Integration with handleSelectChange
- Error handling for invalid inputs

## Setup Files Created

### Backend (`/backend`)
- `jest.config.js` - Jest configuration for TypeScript tests
- `src/controllers/attendenceController.test.ts` - Comprehensive test suite

### Frontend (`/frontend`)
- `jest.config.js` - Jest configuration for React tests
- `jest.setup.js` - Test environment setup
- `src/utility/SelectedServiceProvider.test.jsx` - Component tests

## Installation Instructions

### Backend Tests
Install required dependencies:
```bash path=null start=null
npm install --save-dev jest @types/jest ts-jest
```

Update `backend/package.json` test script:
```json
"test": "jest"
```

### Frontend Tests
Install required dependencies:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/react-hooks identity-obj-proxy babel-jest @babel/preset-env @babel/preset-react
```

Update `frontend/package.json` test script:
```json
"test": "jest"
```

## Running the Tests

Backend tests:
```bash
cd backend && npm test
```

Frontend tests:
```bash
cd frontend && npm test
```

Run with coverage:
```bash
npm test -- --coverage
```