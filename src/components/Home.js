import React, {Component} from "react";
import axios from "axios";
import { Dropdown, InputGroup, FormControl,
    Col, Button, Row, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";

class App extends Component {
    constructor(){
        super();
        this.cities = [{
            city: 'MUMBAI',
            banks: []
        },{
            city: 'CHENNAI',
            banks: []
        }]
        this.sizePerPageList = [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }]
        this.state={
            selectedCity: 'Select City',
            filteredBanks: [],
            favouriteBanks: []
        }
    }
    filterBanksBasedOnPagination(filteredBanks) {
        var startItem = 0
        var endItem = startItem + this.state.selectedPagination;
        var filteredBanksByPagination = filteredBanks.slice(startItem, endItem)
        this.setState({filteredBanks: filteredBanksByPagination})
    }
    markFaviourites(banks){
        this.setState({favouriteBanks: JSON.parse(localStorage.getItem('favouriteBanks'))})
        this.state.favouriteBanks.map(favouriteBank => {
            banks.map(bank => {
                if(bank.ifsc === favouriteBank.ifsc )
                    bank.favourite = true;
            })
        })
    }
    getBanks(city) {
        var selectedCityObj = this.cities.filter(cityObj => {return cityObj.city === city})[0]   
        if(selectedCityObj.banks.length === 0) {
            axios.get("https://vast-shore-74260.herokuapp.com/banks?city="+city).then((res)=>{
                //on success
                this.markFaviourites(res.data)
                selectedCityObj.banks=res.data
                this.setState({filteredBanks: res.data})
                // this.filterBanksBasedOnPagination(res.data)
            }).catch((error)=>{
                //on error
                console.log(error)
            });
        } else {
           this.setState({filteredBanks: selectedCityObj.banks})
            // this.filterBanksBasedOnPagination(selectedCityObj.banks)
        }
    }
    handleSearchBoxChange(event){
        console.log(event.target.keyCode)
        console.log(event.key)
        if(event.key === 'Enter') {
            var enteredKey = event.target.value;
            var selectedCityObj = this.cities.filter(cityObj => {return cityObj.city === this.state.selectedCity})[0]  
            if (selectedCityObj) {
                if(enteredKey !== ''){
                    var tempFilteredBanks = selectedCityObj.banks.filter(bankObj => {
                        var regexExp = new RegExp(enteredKey, 'i')
                        return bankObj.ifsc.match(regexExp)})
                    this.setState({filteredBanks: tempFilteredBanks})
                    // this.filterBanksBasedOnPagination(tempFilteredBanks)
                } else {
                    this.setState({filteredBanks: selectedCityObj.banks})
                    // this.filterBanksBasedOnPagination(selectedCityObj.banks)
                }
            }
        }
    }
    handleFavouriteChange(event){
        var savedBank = this.state.filteredBanks.filter(bankObj => {return bankObj.ifsc === event.target.value})[0]
        savedBank.favourite = !savedBank.favourite;
        console.log(savedBank.favourite)
        if(savedBank.favourite) {
            this.state.favouriteBanks.push(savedBank)
        } else {
            var bankIndex = this.state.favouriteBanks.findIndex(bank => bank.ifsc === event.target.value)
            console.log(bankIndex)
            console.log(event.target.value)
            this.state.favouriteBanks.splice(bankIndex, 1)
        }
        // var favouriteBanks = JSON.parse(localStorage.getItem('favouriteBanks'))
        // var filteredBank = favouriteBanks.filter(bank => {
        //     return bank.ifsc === savedBank.ifsc
        // })[0]
        // if(!filteredBank){

        // }
        console.log(this.state.favouriteBanks)
        localStorage.setItem('favouriteBanks', JSON.stringify(this.state.favouriteBanks))
        var tempState = {...this.state}
        this.setState({tempState})
    }
    handleDropdownChange(selectedItem) {
        console.log(selectedItem)
        this.setState({selectedCity: selectedItem})
        this.getBanks(selectedItem)
    }
    renderCityOptions() {
        console.log(this.state)
        return this.cities.map( city => {
            return (<Dropdown.Item onSelect={(item)=>this.handleDropdownChange(item)} eventKey={city.city}>{city.city}</Dropdown.Item>)
        })
    }
    customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing { from } to { to } of { size } Results
        </span>
    )
    renderBanks(){
        return this.state.filteredBanks.map(bank => {
            return (
                <tr>
                    <td>
                        <Button value={bank.ifsc} variant={bank.favourite?"primary":"outline-primary"}
                            onClick={(item)=>this.handleFavouriteChange(item)}>
                            Favourite
                        </Button>
                    </td>
                    <td>{bank.bank_id}</td>
                    <td>{bank.bank_name}</td>
                    <td>{bank.ifsc}</td>
                    <td>{bank.branch}</td>
                    <td>{bank.address}</td>
                    <td>{bank.city}</td>
                    <td>{bank.district}</td>
                    <td>{bank.state}</td>
                </tr>
            )
        })
    }
    favouriteButton(bank, index){
        return <Button value={bank.ifsc} variant={bank.favourite?"primary":"outline-primary"}
                onClick={(item)=>this.handleFavouriteChange(item)}>
                Favourite
            </Button>
    }

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
              dataField: "favourite",
              text: "Favourite",
              sort: true,
              formatter: (a, obj, index)=>{return this.favouriteButton(obj, index)},
            },
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
                    <Col lg="2">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="city-dropdown">
                                {this.state.selectedCity}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >{this.renderCityOptions()}</Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col lg="6">
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Search..."
                            aria-label="Search"
                            onKeyPress={(item)=>this.handleSearchBoxChange(item)}
                            />
                        </InputGroup>
                    </Col>
                    <Col lg="4" className="ml-0">
                        <Link to={`/favourite`}><Button variant="outline-primary">Favourites</Button></Link>
                    </Col>
                </Row>
                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Favourite</th>
                            <th>Bank ID</th>
                            <th>Bank Name</th>
                            <th>IFSC</th>
                            <th>Branch</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>District</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBanks()}
                    </tbody>
                </Table> */}

                <BootstrapTable 
                    keyField='ifsc' 
                    data={ this.state.filteredBanks } 
                    pagination={ paginationFactory(options) } 
                    columns={columns}
                />
            </Container>
        );
    }
}

export default App;
