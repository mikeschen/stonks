import { render, screen, cleanup } from '@testing-library/react';
import App from '../components/App';

describe('App', () => {
	// Clean up after each test
	afterEach(() => {
		cleanup();
	});

	// Test if the App component renders
	test('renders App component', () => {
		const { container } = render(<App />);
		expect(container).toBeTruthy();
	});

	// Test if a specific element is in the document
	test('renders learn react link', () => {
		render(<App />);
		const linkElement = screen.getByText(/Stonks/i);
		expect(linkElement).toBeInTheDocument();
	});
})