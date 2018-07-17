import React, { Component } from 'react';
import GroupListDisplay from './GroupListDisplay';
import {connect} from 'react-redux';


 class Todos extends Component {
    state = {
        grouplists: [],
        cardgroups: [],
        cards: [],

        newGrouplistTitle: "",
        addNewListComponentDisplay: false,
    };

    componentDidMount() {
        // NOTE: the trailing '/' is necessary to avoid a redirect, which will
        // deny the request. It is specifically disallowed:
        // c.f. https://github.com/ottoyiu/django-cors-headers/issues/17

        this._fetchGroupList();
    }
            // TODO: export to redux
    _fetchGroupList = () => {
        let headers = {"Content-Type": "application/json"};
        // let {token} = getState().auth;
        let {token} = this.props.auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        fetch(`todo/grouplists/`)
            .then(res=>{
                if (res.status < 500) {
                    return res.json().then(data => {
                        console.log(data);
                        this.setState({
                            grouplists: data,
                        });
                        console.log('STATE',this.state);
                    return {status: res.status,  data};
                    });
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            }
        );
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCreateGroupList = (e) =>  {
        e.preventDefault();
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({
                group_list_title: this.state.newGrouplistTitle
            });
        if (this.state.newGrouplistTitle.length) {
            fetch("todo/grouplists/", {headers, body, method: "POST"})
                .then(res=>{
                    if (res.status < 500) {
                        return res.json().then(data => {
                            return this._fetchGroupList();
                        });
                    } else {
                        console.log("Server Error!");
                        throw res;
                    }
                });
        }
    }

    handleDisplayAddListComponent = () => {
        this.setState({addNewListComponentDisplay: !this.state.addNewListComponentDisplay });
    }


    render() {
        return(
            <div>
                <h3 className="text-center">Homework Assignments</h3>
                    <div className="">
                        <div className="">
                            {
                                this.state.grouplists.map((gl,i)=>{
                                    return (
                                        <div key={gl.group_list_title} >
                                            <h5>{gl.group_list_title}</h5>
                                            <GroupListDisplay
                                                {...gl}
                                                num={i+1}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <hr/>
                    </div>
                {
                    this.state.addNewListComponentDisplay ?

                    <form >
                        <h5>Create a new List:</h5>
                        <input onChange={this.onChange}type="text" placeholder="List Name:" name="newGrouplistTitle"/>
                        <button onClick={this.handleCreateGroupList}>Submit</button>
                    </form>
                    :
                    <div>
                        <h4>Add A New List</h4>
                        <button onClick={this.handleDisplayAddListComponent}>+</button>
                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};


export default connect(mapStateToProps)(Todos);