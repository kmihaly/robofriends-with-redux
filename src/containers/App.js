import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
//import { robots } from './Robots';
import Scroll from '../components/Scroll';
import Errorboundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        //the following property name can be anything
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    /*constructor() {
        super();
        this.state = {
            robots: [],
            //searchField: ''
        }
    }
*/
    componentDidMount() {
        this.props.onRequestRobots();
        //console.log(this.props.store.getState());
        /*fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users })) */
        /*check the last line like this: 
        .then(users => {})*/
    }

    /*searchChanges = (event) => {
        this.setState({ searchfield: event.target.value });
    }*/

    render() {
        //const { robots, searchField } = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        //       if (robots.length === 0) {
        // OR
        /*
                if (!robots.length) {
                    return <h1>Loading...</h1>
                } else {
                    return (*/
        // OR

        return isPending ? 
            <h1>Loading...</h1> 
            :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={ onSearchChange } />
                    <Scroll>
                        <Errorboundary>
                            <Cardlist robots={ filteredRobots } />
                        </Errorboundary>
                    </Scroll>
                </div>
            )
        ;
    }
};

/*const App = () => {
    return (
        <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox />
        <Cardlist robots = { robots } />
        </div>
    );
};*/

export default connect(mapStateToProps, mapDispatchToProps)(App);