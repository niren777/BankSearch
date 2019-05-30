import React, {Component} from "react";
import axios from "axios";
import PropTypes from 'prop-types'
import { Dropdown, InputGroup, FormControl,
    Col, Button, Row, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

class Home extends Component {
    static propTypes = {
        addBanks: PropTypes.func.isRequired,
        cities: PropTypes.object.isRequired
    }
    constructor(){
        super();
        this.sizePerPageList = [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }]
        this.bankProperties = [{
              dataField: "bank_name",
              text: "Bank Name"
            },
            {
              dataField: "ifsc",
              text: "IFSC"
            },
            {
              dataField: "branch",
              text: "Branch"
            },
            {
              dataField: "address",
              text: "Address"
            },
            {
              dataField: "district",
              text: "District"
            },
            {
              dataField: "state",
              text: "State"
            }
        ]
        this.state={
            selectedCity: '',
            filteredBanks: [],
            favouriteBanks: [],
            selectedFilter: '',
            selectedFilterName: 'Select Filter'
        }
    }
    componentDidMount() {
        this.setState({selectedCity: this.props.selectedCity})
        this.props.selectedCity !== 'Select City' && this.getBanks(this.props.selectedCity)
        var tempFavouriteBanks = JSON.parse(localStorage.getItem('favouriteBanks'))
        tempFavouriteBanks && this.setState({favouriteBanks: tempFavouriteBanks})
    }
    filterBanksBasedOnPagination(filteredBanks) {
        var startItem = 0
        var endItem = startItem + this.state.selectedPagination;
        var filteredBanksByPagination = filteredBanks.slice(startItem, endItem)
        this.setState({filteredBanks: filteredBanksByPagination})
    }
    markFaviourites(banks){
        var tempFavouriteBanks = JSON.parse(localStorage.getItem('favouriteBanks'))
        if (tempFavouriteBanks) {
            this.setState({favouriteBanks: tempFavouriteBanks})
            this.state.favouriteBanks.map(favouriteBank => {
                banks.map(bank => {
                    if(bank.ifsc === favouriteBank.ifsc )
                        bank.favourite = true;
                })
            })
        }
    }
    getBanks(city) {
        var selectedCityObj = this.props.cities.filter(cityObj => {return cityObj.city === city})[0]   
        if(selectedCityObj.banks.length === 0) {
            axios.get("https://vast-shore-74260.herokuapp.com/banks?city="+city).then((res)=>{
                //on success
                this.markFaviourites(res.data)
                var retrivedBanks = {
                    city: city,
                    banks: res.data
                }
                this.props.addBanks(retrivedBanks)
                this.setState({filteredBanks: res.data})
            }).catch((error)=>{
                //on error
                console.log(error)
            });
        } else {
           this.setState({filteredBanks: selectedCityObj.banks})
        }
    }
    handleSearchBoxChange(event){
        if(event.key === 'Enter' && this.state.selectedFilter !== '') {
            var enteredKey = event.target.value;
            var selectedCityObj = this.props.cities.filter(cityObj => {return cityObj.city === this.state.selectedCity})[0]  
            if (selectedCityObj) {
                if(enteredKey !== ''){
                    var tempFilteredBanks = selectedCityObj.banks.filter(bankObj => {
                        var regexExp = new RegExp(enteredKey, 'i')
                        return bankObj[this.state.selectedFilter].match(regexExp)})
                    this.setState({filteredBanks: tempFilteredBanks})
                } else {
                    this.setState({filteredBanks: selectedCityObj.banks})
                }
            }
        }
    }
    handleFavouriteChange(event){
        var savedBank = this.state.filteredBanks.filter(bankObj => {return bankObj.ifsc === event.target.value})[0]
        savedBank.favourite = !savedBank.favourite;
        if(savedBank.favourite) {
            this.state.favouriteBanks.push(savedBank)
        } else {
            var bankIndex = this.state.favouriteBanks.findIndex(bank => bank.ifsc === event.target.value)
            this.state.favouriteBanks.splice(bankIndex, 1)
        }
        var tempState = {...this.state}
        this.setState({tempState})
        localStorage.setItem('favouriteBanks', JSON.stringify(this.state.favouriteBanks))
    }
    handleCityDropdownChange(selectedCity) {
        this.setState({selectedCity: selectedCity})
        this.props.setSelectedCity(selectedCity)
        this.getBanks(selectedCity)
    }
    renderCityOptions() {
        return this.props.cities.map( city => {
            return (<Dropdown.Item onSelect={(item)=>this.handleCityDropdownChange(item)} eventKey={city.city}>{city.city}</Dropdown.Item>)
        })
    }
    handleFilterDropdownChange(selectedFilter, event, c, d){
        console.log(selectedFilter, event.target.innerHTML)
        this.setState({selectedFilter: selectedFilter})
        this.setState({selectedFilterName: event.target.innerHTML})
    }
    renderFilterOptions() {
        return this.bankProperties.map( field => {
            return (<Dropdown.Item onSelect={(item, event)=>this.handleFilterDropdownChange(item, event)} eventKey={field.dataField}>{field.text}</Dropdown.Item>)
        })
    }
    customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing { from } to { to } of { size } Results
        </span>
    )
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
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
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
                    <Col lg="8">
                    <Row>
                        <Col lg="1">
                            Search By:
                        </Col>
                        <Col lg="3">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="city-dropdown">
                                    {this.state.selectedFilterName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >{this.renderFilterOptions()}</Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col lg="8">
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Search..."
                                aria-label="Search"
                                onKeyPress={(item)=>this.handleSearchBoxChange(item)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    </Col>
                    <Col lg="2" className="ml-0">
                        <Link to={`/favourite`}><Button variant="outline-primary">Favourites</Button></Link>
                    </Col>
                </Row>

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

const mapStateToProps = state => ({
    cities: state.cities,
    selectedCity: state.selectedCity
});

const mapDispatchToProps = dispatch => ({
    addBanks: banks => dispatch(ACTIONS.addBanks(banks)),
    setSelectedCity: city => dispatch(ACTIONS.setSelectedCity(city))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
