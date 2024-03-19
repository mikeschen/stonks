import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useGetTicker } from '../stores/StonkStore';
import { GlobalQuote } from '../Interfaces';

export default function Stonk(): JSX.Element {
    const getData = useGetTicker();

    const location = useLocation();

    useEffect(() => {
        if (location) {
            getData.execute(location.state);
        }
    }, []);

    function renderBreadCrumbs(): JSX.Element {
        return (
            <Breadcrumb listTag="div" className="breadcrumb">
                <BreadcrumbItem
                    href="/"
                    tag="a"
                >
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem
                    tag="span"
                >
                    Ticker: {location?.state}
                </BreadcrumbItem>
            </Breadcrumb>
        );
    }

    function renderQuote(data: GlobalQuote): JSX.Element {
        return (
            <Col className='header-padding'>
                {
                    data && "Global Quote" in data &&
                    <ul className="list-items">
                        {Object.entries(data["Global Quote"]).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                }
            </Col>
        );
    }

    return (
        <Container
            fluid="md"
        >
            <Row>
                {renderBreadCrumbs()}
            </Row>
            <Row>
                {getData.loading ? (
                    <Col>Loading...</Col>
                ) : getData.error ? (
                    <Col>Error fetching data: {getData.errorData}</Col>
                ) : (
                    renderQuote(getData.data)
                )}
            </Row>
        </Container>
    )
}