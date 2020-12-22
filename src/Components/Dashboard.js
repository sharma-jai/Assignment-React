import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../Redux/userAction";
import { Col, Input, Card, CardBody, CardText, Row } from "reactstrap";
import axios from "axios";
import Box from "@material-ui/core/Box";
import profile from "../assets/profile.png";
import "../customStyles.css";
function Dashboard({ userData, fetchUsers }) {
  const initialState = {
    search: "",
    data: userData.users,
    apiData2: [],
  };

  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "setSearch":
        return { ...state, search: action.payload };
      case "setApiData":
        return { ...state, apiData2: action.payload };
    }
  }, initialState);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://my-json-server.typicode.com/shripad-agashe/fake-api/dashboard"
      )
      .then((response) => {
        dispatch({ type: "setApiData", payload: response.data });
        console.log("CHECK API", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [dispatch]);

  // FILTERING ON BEHALF OF NAME AND MARKS

  const filtered = initialState.data.filter(
    (item) =>
      item.name.toLocaleLowerCase().includes(state.search) ||
      item.marks.toString().includes(state.search)
  );

  return (
    <>
      <div className="top-title">
        <h2>Dashboard</h2>
        <p>Mobile UX/UI Design</p>
      </div>
      <div className="other-content">
        <Row>
          {state.apiData2.map((item) => (
            <Col sm={3}>
              <div className="box">
                <img src={profile} />
                <div className="content-box">
                  <h2>{item.line1}</h2>
                  <p>{item.title}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Box>
        <h2 className="student-tag">Students By Average Marks</h2>
        <div className="search">
          <Input
            type="text"
            name="search"
            placeholder="Search via Marks or Name"
            value={state.search}
            onChange={(e) => {
              dispatch({
                type: "setSearch",
                payload: e.target.value.toLocaleLowerCase(),
              });
            }}
          />
        </div>
        <div className="content">
          {userData &&
            userData.users &&
            filtered.length > 0 &&
            userData.users
              .filter(
                (users) =>
                  users.name.toLocaleLowerCase().includes(state.search) ||
                  users.marks.toString().includes(state.search)
              )
              .map((user) => (
                <Col>
                  <Card inverse className={`border text-dark`}>
                    <CardBody className="d-flex justify-content-between flex-column card-material">
                      <CardText>
                        <img src={profile} />
                        <label className="name-label">{user.name}</label>
                        <span style={{ float: "right" }}>{user.marks}</span>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
        </div>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
