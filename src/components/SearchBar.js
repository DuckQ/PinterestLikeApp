import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { startLoadImagesWithTag } from '../redux/actions/imagesActions';
import { startUpdateImages, clearImages, setDefaultPosition } from '../redux/actions/updateImages';

const tags = [
  {
    name: 'Anime'
  },
  {
    name: 'Home'
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return tags.filter(tag => regex.test(tag.name));
};

function getSuggestionValue(suggestion) {
  return suggestion.name;
};

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  getValueForParent(){
    if (this.props.getValueFromChild) {
      this.props.getValueFromChild(this.state.value);
    }
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    }, () => this.getValueForParent());
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected() {
    this.props.clearImages();
    this.props.setDefaultPosition();
    this.props.startLoadImagesWithTag(this.state.value)
    .then(() => this.props.startUpdateImages(20, 0))
  };

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.props.clearImages();
      this.props.setDefaultPosition();
      this.props.startLoadImagesWithTag(this.state.value)
      .then(() => this.props.startUpdateImages(20, 0))
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    )
  }
}

export default connect(null, { startLoadImagesWithTag, startUpdateImages, clearImages, setDefaultPosition })(SearchBar);
