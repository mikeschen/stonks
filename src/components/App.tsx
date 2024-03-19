import { Container, Row, Col } from 'reactstrap';
import stonksLogo from '../images/logo-stonks.jpg';
import '../css/App.scss';
import StonkList from './StonkList';

export default function App(): JSX.Element {
	return (
		<Container
			fluid="lg"
		>
			<Row>
				<Col className='header-padding'>
					<header className="app-header">
						<img src={stonksLogo} className="app-logo" alt="logo" />
						<h1 className="inline-header">Stonks</h1>
					</header>
				</Col>
			</Row>
			<StonkList />
		</Container>
	);
}
