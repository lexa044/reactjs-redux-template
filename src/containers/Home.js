import React from "react";
import { AppContext } from '../context/Context';
import { logoutUser } from "../actions/auth";
import { productService } from "../services/products";

import SidebarItem from '../components/SidebarItem';
import Spinner from '../components/Spinner';
import ProductList from '../components/ProductList';

const hrefLink = '#';
const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const defaultState = {
  toggled: false,
  isLoading: false,
  products: []
};

function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_PRODUCTS_END':
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    default:
      return state;
  }
}

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleClass= this.toggleClass.bind(this);
    this.state = reducer(undefined, {});
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

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.handleFetchProducts();
  };

  handleLogout(e) {
    const { setIdentity } = this.context;

    e && e.preventDefault();
    logoutUser(setIdentity);
  }

  toggleClass(e) {
    const currentState = this.state.toggled;
    e && e.preventDefault();
    this.setState({ toggled: !currentState });
  }

  handleFetchProducts = (
    filters = this.props.filters
  ) => {
    this.dispatch({ type: 'FETCH_PRODUCTS_START'});
    productService.getAll(data => {
      if (data) {
          let { products } = data;
          let filters = Array.from(this.selectedCheckboxes);
          if (!!filters && filters.length > 0) {
              products = products.filter(p =>
                  filters.find(f => p.availableSizes.find(size => size === f))
              );
          }

          this.dispatch({ type: 'FETCH_PRODUCTS_END', payload: products});
      } else {
        this.dispatch({ type: 'FETCH_PRODUCTS_END', payload: []});
          console.log('Could not fetch products. Try again later.');
      }
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
    const { identity } = this.context;
    const { toggled, isLoading, products } = this.state;

    return (
      <div id="wrapper" className={toggled ? 'd-flex toggled': 'd-flex'}>

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
                    {identity.user.firstName}
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

Home.contextType = AppContext;

export default Home;
