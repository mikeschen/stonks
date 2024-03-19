import { create } from 'zustand';

const KEY = process.env.REACT_APP_STONK_API_KEY;
const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${KEY}`;
const DEMO_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`;
const TICKER_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=`;
const DEMO_TICKER_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`;

const initialState = {
	loading: false,
	success: false,
	error: false,
	data: null,
	errorData: null,
};

export const useGetData = create((set) => ({
	...initialState,

	execute: async () =>
	{
		set({ ...initialState, loading: true });

		try
		{
			// const res = await fetch(URL);
			// Please uncomment below and use this URL if you hit API call limit.
			const res = await fetch(DEMO_URL);
			const data = await res.json();
			set({ ...initialState, success: true, data: data });
		} catch (err)
		{
			console.error("Error in data fetch:", err);
			set({ ...initialState, error: true, errorData: err.message });
		}
	},
}));

export const useGetTicker = create((set) => ({
	...initialState,

	execute: async (ticker) =>
	{
		set({ ...initialState, loading: true });

		try
		{
			// const res = await fetch(TICKER_URL + `${ticker}&apikey=${KEY}`);
			// Please uncomment below and use this URL if you hit API call limit.
			const res = await fetch(DEMO_TICKER_URL);
			const data = await res.json();
			set({ ...initialState, success: true, data: data });
		} catch (err)
		{
			console.error("Error in data fetch:", err);
			set({ ...initialState, error: true, errorData: err.message });
		}
	},
}));
