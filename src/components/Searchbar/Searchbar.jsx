import { React, Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { search: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    this.setState({
      search: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      toast.error(
        'It looks like you want to find nothing, please check your query.'
      );
      return;
    }

    this.props.onSubmit(this.state.search);

    this.setState({ search: '' });
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchForm>
          <SearchFormButton type="submit" onClick={this.handleSubmit}>
            <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}
