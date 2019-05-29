import React, {Component} from "react";
import { Col, Row, Container, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";

class Favourite extends Component {

    constructor(){
        super();
        this.sizePerPageList = [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }]
        this.state={
            favouriteBanks: JSON.parse(localStorage.getItem('favouriteBanks'))
        }
    }
    customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing { from } to { to } of { size } Results
        </span>
    )
    render() {
        var options = {
            paginationSize: 4,
            pageStartIndex: 0,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: this.customTotal,
            sizePerPageList: this.sizePerPageList
        }

        var columns = [
            {
              dataField: "bank_id",
              text: "Bank ID",
              sort: true
            },
            {
              dataField: "bank_name",
              text: "Bank Name",
              sort: true
            },
            {
              dataField: "ifsc",
              text: "IFSC",
              sort: true
            },
            {
              dataField: "branch",
              text: "Branch",
              sort: true
            },
            {
              dataField: "address",
              text: "Address",
              sort: true
            },
            {
              dataField: "city",
              text: "City",
              sort: true
            },
            {
              dataField: "district",
              text: "District",
              sort: true
            },
            {
              dataField: "state",
              text: "State",
              sort: true
            }
        ]
        return ( 
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Link to={`/`}><Button variant="outline-primary">Home</Button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3">
                        <BootstrapTable 
                            keyField='ifsc'
                            data={ this.state.favouriteBanks } 
                            pagination={ paginationFactory(options) } 
                            columns={columns}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Favourite;