// Create a search bar component to search for locations

import React, { Component } from 'react';

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
        <div className="search-bar">
            <input
                placeholder="Search for a location"
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)}
            />
            {/* Submit button */}
            <button type="button" class="btn btn-primary" onClick={this.onSearchSubmit}>Search</button>
        </div>
        );
    }
}

export default SearchBar;