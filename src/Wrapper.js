import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";

class Wrapper extends React.Component{
    state = {
        responseGetRequest: "",
        responsePostRequest: "",
        username: "",
        errorMessage: "",

    };

    componentDidMount() {
        sendApiPostRequest("http://localhost:8989/sign-in",
            {username: "Wasim@gmail.com",
                password: "Asda"}
            , (response) => {
                if (response.data.success) {
                    this.setState({
                        username:response.data.user.username
                    })
                    //do something
                } else {
                    //do another thing - fail
                    if (response.data.errorCode === 1) {
                        this.setState({
                            errorMessage : "No Such User"
                        })
                    }else if (response.data.errorCode === 2) {
                        this.setState({
                            errorMessage:"Password Incorrect"
                        })
                    }

                }

        });
      /*  sendApiGetRequest("http://localhost:8989/check", (response) => {
            this.setState({
                responseGetRequest : response.data
            })
        });
        sendApiPostRequest("http://localhost:8989/check", {test: "1", test2: "2"}, (response) => {
            this.setState({
                responsePostRequest: response.data,
            })
        });*/
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            <input placeholder={"username"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input placeholder={"password"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button>Sign In</button>
                        </td>
                    </tr>


                </table>

                {
                    this.state.username.length > 0&&
                    <div>
                        Hello : {this.state.username}
                    </div>

                }
                {this.state.errorMessage}


            </div>
        );
    }
}
export default Wrapper