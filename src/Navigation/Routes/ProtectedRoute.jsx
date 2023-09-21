import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PrivateLayout from "../../components/Layout/Private/Private.jsx";
import PATH from "../Path";
import FullScreenLoader from "../../components/Loader/FullScreenLoader.jsx";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate(PATH.LOGIN);
    }
  }, [user, navigate]);

  if (!user) return <FullScreenLoader />;

  return <PrivateLayout>{element}</PrivateLayout>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
