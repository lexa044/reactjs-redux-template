import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { updateFilters } from '../actions';
import { fetchProducts } from '../actions';

import SidebarItem from '../components/SidebarItem';
import Spinner from '../components/Spinner';
import ProductList from '../components/ProductList';

const hrefLink = '#';
const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleClass= this.toggleClass.bind(this);
    this.state = {
      isLoading: false,
      toggled: false
    };
  }

  componentDidMount() {
    this.selectedCheckboxes = new Set();
    this.handleFetchProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filters !== prevProps.filters) {
      this.handleFetchProducts();
    }
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  };

  handleLogout(e) {
    e && e.preventDefault();
    this.props.logoutUser();
  }

  toggleClass(e) {
    const currentState = this.state.toggled;
    e && e.preventDefault();
    this.setState({ toggled: !currentState });
  }

  handleFetchProducts = (
    filters = this.props.filters
  ) => {
    this.setState({ isLoading: true });
    this.props.fetchProducts(filters, () => {
      this.setState({ isLoading: false });
    });
  };

  createCheckbox = label => (
    <SidebarItem
      classes="list-group list-group-flush"
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => availableSizes.map(this.createCheckbox);

  render() {
    const { identity, products } = this.props;
    const { isLoading } = this.state;

    return (
      <div id="wrapper" className={this.state.toggled ? 'd-flex toggled': 'd-flex'}>

        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Bootstrap</div>
          {this.createCheckboxes()}
        </div>

        <div id="page-content-wrapper">

          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button className="btn btn-primary" id="menu-toggle" onClick={this.toggleClass}>Toggle Menu</button>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href={hrefLink}>Home <span className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href={hrefLink}>Link</a>
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href={hrefLink} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {identity.firstName}
                  </a>

                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href={hrefLink} onClick={this.handleLogout}>Log out</a>
                  </div>

                </li>

              </ul>
            </div>
          </nav>

          <div className="container-fluid">
            {isLoading && <Spinner />}
            <h1 className="mt-4">Simple Sidebar</h1>
            <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
            <div className="shelf-container">
              <ProductList products={products} />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    identity: state.auth.user,
    products: state.shelf.products,
    filters: state.filters.items
  }
}

export default connect(
  mapStateToProps,
  { fetchProducts, updateFilters, logoutUser }
)(Home);
