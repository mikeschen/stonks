import { render, screen } from '@testing-library/react';
import Stonk from '../routes/Stonk';
import { useGetTicker } from '../stores/StonkStore';

jest.mock('../stores/StonkStore');

jest.mock('react-router-dom', () => {
    const useLocationMock = jest.fn().mockReturnValue({
        state: 'IBM',
    });
    return {
        ...jest.requireActual('react-router-dom'),
        useLocation: () => useLocationMock(),
    };
});


const fakeData = {
    "Global Quote": {
        "01. symbol": "IBM",
        "02. open": "187.7600",
        "03. high": "193.8980",
        "04. low": "187.6000",
        "05. price": "193.0600",
        "06. volume": "7938266",
        "07. latest trading day": "2024-03-04",
        "08. previous close": "188.2000",
        "09. change": "4.8600",
        "10. change percent": "2.5824%"
    }
};

describe('Stonk', () => {
    test('renders StonkRow components', () => {
        // This test checks if the Stonk component correctly renders stock info.
        // It does this by mocking the useGetTicker hook to return a specific data object.
        const useGetTickerMock = useGetTicker as unknown as jest.Mock;

        useGetTickerMock.mockReturnValue({
            loading: false,
            error: false,
            data: fakeData,
            execute: jest.fn(),
        });

        render(<Stonk />);

        const ibmElement = screen.getByText("IBM");
        expect(ibmElement).toBeInTheDocument();
    });

    // This test checks if the Stonk component correctly displays an error message when data fetching fails.
    // It does this by mocking the useGetTicker hook to return an error.
    test('renders error fetching data', () => {
        const useGetTickerMock = useGetTicker as unknown as jest.Mock;

        useGetTickerMock.mockReturnValue({
            loading: false,
            error: true,
            errorData: 'Error message',
            data: fakeData,
            execute: jest.fn(),
        });

        render(<Stonk />);

        const errorElement = screen.getByText("Error fetching data: Error message");
        expect(errorElement).toBeInTheDocument();
    });

    // This test checks if the Stonk component correctly displays a loading message while data is being fetched.
    // It does this by mocking the useGetTicker hook to return a loading state.
    test('renders loading when fetching data', () => {
        const useGetTickerMock = useGetTicker as unknown as jest.Mock;

        useGetTickerMock.mockReturnValue({
            loading: true,
            error: false,
            data: fakeData,
            execute: jest.fn(),
        });

        render(<Stonk />);

        const errorElement = screen.getByText("Loading...");
        expect(errorElement).toBeInTheDocument();
    });
});
