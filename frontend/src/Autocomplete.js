import React, { Component } from 'react';
import List from './List';
import lodash from 'lodash';

export class Autocomplete extends Component {
    constructor() {
        super();
        this.state = {
            activeOption: 0,
            filteredOptions: [],
            showListComponent: false,
            userInput: ''
        };
    }
    makeApiCall = searchInput => {
        // let searchUrl = `http://localhost:5000/searchBySearchString`;
        let searchUrl = `https://obscure-woodland-97009.herokuapp.com/searchBySearchString`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchString: searchInput })
        };
        fetch(searchUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log('Request success: ', data);
                data = lodash.map(data, function (object) {
                    return lodash.omit(object, ['_id']);
                });
                data = lodash.orderBy(data, ['location'], ['asc']);
                const filteredOptions = data;
                this.setState({
                    activeOption: 0,
                    filteredOptions,
                    showListComponent: true,
                    userInput: searchInput
                });
            })

            .catch(function (error) {
                // console.log('Request failure: ', error);
            });

    };

    onChange = (e) => {
        // console.log('onChanges');
        const userInput = e.currentTarget.value;
        if (userInput && userInput.length) {
            this.makeApiCall(userInput);
        } else {
            this.setState({
                activeOption: 0,
                filteredOptions: [],
                showListComponent: false,
                userInput: ''
            });
        }
    };


    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                userInput: filteredOptions[activeOption]
            });
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                // console.log(activeOption);
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    render() {
        const {
            onChange,
            onKeyDown,

            state: { filteredOptions, userInput }
        } = this;
        return (
            <React.Fragment>
                <div className="container">
                    <h1
                        style={{ textAlign: "center", padding: "1em" }}>
                        Welcome to the Location Based Search Battle App
                    </h1>
                    <div className="search">
                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search Battle Location Name"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            value={userInput}
                        />
                    </div>
                    {
                        this.state.showListComponent ? <List list={filteredOptions} /> : ""
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Autocomplete;
