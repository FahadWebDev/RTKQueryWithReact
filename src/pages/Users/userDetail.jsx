import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../app/rtkQApi/rtkQApiSlice";

export default function UserDetail() {
  const { id } = useParams();
  const {
    data: user,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUserQuery(id);
  // console.log("detail", user, isLoading, isSuccess, isError, error);

  return (
    <Container className="h-100">
      <Row>
        <Col xs={12}>
          <Link to="/users" className="button btn-primary py-2 mt-2">
            Go Back
          </Link>
          <div className="mt-2">
            <h1>User Detail</h1>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
