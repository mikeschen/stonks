import { useNavigate } from "react-router-dom";
import { Stonk } from '../Interfaces';

interface Props {
    data: Stonk;
}

export default function StonkRow({ data }: Props): JSX.Element {
    const navigate = useNavigate();

    function handleLink(): void {
        navigate(`/stonk/${ticker}`, { state: ticker });
    }

    const { ticker, price, change_amount, change_percentage, volume } = data;

    return (
        <tr onClick={handleLink}>
            <td className="table-row">{ticker}</td>
            <td className="table-row">{price}</td>
            <td className="table-row">{change_amount}</td>
            <td className="table-row">{change_percentage}</td>
            <td className="table-row">{volume}</td>
        </tr>
    );
}