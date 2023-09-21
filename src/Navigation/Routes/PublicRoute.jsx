import PropTypes from "prop-types";

function PublicRoute({ element }) {
  return element;
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
