// Create a search bar component to search for locations

import React, { Component } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './searchbar.css'
class SearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = { term: '' };
    }
    
    onInputChange(term) {
        this.setState({ term });
    }
    onSearchSubmit(event) {
        event.preventDefault();
        // Do Something
        // Maybe send a function through props and search using that function
    }
    

    render() {
        return (
        <div class="searchInputWrapper" style={{
            position: 'absolute',
            zIndex: 2,
            maxWidth: '100%',
        }}>
            <div class="container" style={{
                    paddingTop: "20px",
                    maxWidth: "100wh",
                }}>
                <div class="row">
                    <div class="col">
                    <button style={{
                border: "none",
                background: "none",
                paddingRight: "10px",
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0d6efd" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
            </button>
                    </div>
                    <div class="col">
                        <Autocomplete>
                            <input 
                                type="text"
                                class="searchInput"
                                placeholder="Search for a location"
                                value={this.state.term}
                                onChange={event => this.onInputChange(event.target.value)}
                            />
                        </Autocomplete>
                    </div>
                    <div class="col">
                    <button onClick={event => this.onSearchSubmit(event)} style={{
                        border: "none",
                        background: "none",
                        paddingLeft: "10px",
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0d6efd" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>




            
            {/* Submit button */}
            
            
        </div>
        );
    }
}

export default SearchBar;