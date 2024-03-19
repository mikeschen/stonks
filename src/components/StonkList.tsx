import { useEffect } from "react";
import { useGetData } from '../stores/StonkStore';
import StonkRow from './StonkRow';
import { Table } from 'reactstrap';

export default function StonkList(): JSX.Element {
	const getData = useGetData();

	useEffect(() => {
		getData.execute();
	}, []);

	return (
		<Table
			bordered
			dark
			hover
			responsive
		>
			<thead>
				<tr>
					<th colSpan={5}>Top US Stonk Gainers</th>
				</tr>
				<tr>
					<th>Stonk</th>
					<th>Price</th>
					<th>Change Amount</th>
					<th>Change Percentage</th>
					<th>Volume</th>
				</tr>
			</thead>
			{getData.loading ? (
				<tbody><tr><td>Loading...</td></tr></tbody>
			) : getData.error ? (
				<tbody><tr><td>Error fetching data: {getData.errorData}</td></tr></tbody>
			) : (
				<tbody>
					{getData.data?.top_gainers?.map((data, i) => (
						<StonkRow key={data.ticker} data={data} />
					))}
				</tbody>
			)}
		</Table>
	);
}
