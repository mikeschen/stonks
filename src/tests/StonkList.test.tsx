import { render, screen } from '@testing-library/react';
import StonkList from '../components/StonkList';
import { useGetData } from '../stores/StonkStore';

jest.mock('../stores/StonkStore');

jest.mock('react-router-dom', () => {
    const useNavigateMock = jest.fn();
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => useNavigateMock(),
    };
});

describe('StonkList', () => {
    test('renders StonkRow components', () => {
        // This test checks if the StonkList component correctly renders StonkRow components.
        // It does this by mocking the useGetData hook to return a specific data object.
        const useGetDataMock = useGetData as unknown as jest.Mock;

        useGetDataMock.mockReturnValue({
            loading: false,
            error: false,
            data: {
                top_gainers: [
                    { ticker: 'TSLA' },
                    { ticker: 'META' },
                ],
            },
            execute: jest.fn(),
        });

        render(<StonkList />);

        const teslaElement = screen.getByText("TSLA");
        expect(teslaElement).toBeInTheDocument();
        const metaElement = screen.getByText("META");
        expect(metaElement).toBeInTheDocument();
    });

    // This test checks if the StonkList component correctly displays an error message when data fetching fails.
    // It does this by mocking the useGetData hook to return an error.
    test('renders error fetching data', () => {
        const useGetDataMock = useGetData as unknown as jest.Mock;

        useGetDataMock.mockReturnValue({
            loading: false,
            error: true,
            errorData: 'Error message',
            data: {},
            execute: jest.fn(),
        });

        render(<StonkList />);

        const errorElement = screen.getByText("Error fetching data: Error message");
        expect(errorElement).toBeInTheDocument();
    });

    // This test checks if the StonkList component correctly displays a loading message while data is being fetched.
    // It does this by mocking the useGetData hook to return a loading state.
    test('renders loading when fetching data', () => {
        const useGetDataMock = useGetData as unknown as jest.Mock;

        useGetDataMock.mockReturnValue({
            loading: true,
            error: false,
            data: {},
            execute: jest.fn(),
        });

        render(<StonkList />);

        const errorElement = screen.getByText("Loading...");
        expect(errorElement).toBeInTheDocument();
    });
});
