import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "../../app/rtkQApi/rtkQApiSlice";

export default function UsersList() {
  // const { data: { data: users = [] } = {} } = useGetUsersQuery();
  const { data: users } = useGetUsersQuery();

  const [
    addUserFunction,
    {
      isLoading: addingNewUserLoading,
      // isSuccess: addNewUserSuccess,
      // isError: addNewUserError,
      // error: addNewUserErrorData,
    },
  ] = useAddUserMutation();

  const [
    updateUserFunction,
    {
      // isLoading: updatingUserLoading,
      isSuccess: updateUserSuccess,
      // isError: addNewUserError,
      // error: addNewUserErrorData,
    },
  ] = useUpdateUserMutation();

  const [
    removeUserFunction,
    // {
    //   isLoading: removingUserLoading,
    //   isSuccess: removeUserSuccess,
    //   isError: removeUserError,
    //   error: removeUserErrorData,
    // },
  ] = useRemoveUserMutation();

  const [addUser, setAddUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  // console.log("addUser", addUser);
  // console.log(
  //   "add states",
  //   addingNewUserLoading,
  //   addNewUserSuccess,
  //   addNewUserError,
  //   addNewUserErrorData
  // );
  // console.log(
  //   "removestates",
  //   removingNewUserLoading,
  //   removeNewUserSuccess,
  //   removeNewUserError,
  //   removeNewUserErrorData
  // );
  // console.log(
  //   "updateUserFunction",
  //   updatingUserLoading,
  //   updateUserSuccess
  //   // updateUserError,
  //   // updateUserErrorData
  // );
  // useEffect(() => {
  //   if (isSuccess) console.log("showing success", isSuccess);
  // }, [isSuccess]);

  // useEffect(() => {
  //   console.log("addNewUserSuccess", addNewUserSuccess);
  // }, [addNewUserSuccess]);

  useEffect(() => {
    if (updateUserSuccess || addingNewUserLoading)
      setAddUser({ name: "", age: "", email: "", password: "" });
  }, [updateUserSuccess, addingNewUserLoading]);

  const addUpdateUser = () => {
    if (addUser.id) {
      updateUserFunction(addUser);
    } else {
      addUserFunction(addUser);
    }
  };
  return (
    <Container className="h-100">
      <Row>
        <Col xs={6}>
          <div>
            <h1>Users List</h1>
            {users?.map((user) => (
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to={`/users/${user?._id}`} key={user?._id}>
                  {user?.name}
                </Link>
                <div className="d-flex align-items-center gap-5 ">
                  <Button
                    variant="primary"
                    onClick={() =>
                      setAddUser({
                        id: user._id,
                        name: user?.name,
                        age: user?.age,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => removeUserFunction(user?._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col xs={6}>
          <div>
            <h1>Add/Update User</h1>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setAddUser({ ...addUser, name: e.target.value })
                    }
                    value={addUser.name}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Add Age"
                    name="age"
                    onChange={(e) =>
                      setAddUser({ ...addUser, age: e.target.value })
                    }
                    value={addUser.age}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add Email"
                    name="email"
                    onChange={(e) =>
                      setAddUser({ ...addUser, email: e.target.value })
                    }
                    value={addUser.email}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Add Password"
                    onChange={(e) =>
                      setAddUser({ ...addUser, password: e.target.value })
                    }
                    value={addUser.password}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Button onClick={addUpdateUser} disabled={addingNewUserLoading}>
                  Add / Update
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
