import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { startLoadImagesWithTag } from '../redux/actions/imagesActions';
import { startUpdateImages, clearImages, setDefaultPosition } from '../redux/actions/updateImages';
import { setImageContainerState, setFetchState } from '../redux/actions/checkImageContainerState';

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
    // clear everything(that linked to image displaying) in state before new request
    this.props.setFetchState(false);
    this.props.clearImages();
    this.props.setDefaultPosition();
    // do a request with specific tag
    this.props.startLoadImagesWithTag(this.state.value)
    .then(() => {
      // display 20 images after request was finished
      this.props.startUpdateImages(20, 0);
      // track state of thee request to prevent unwanted image loading in <ImageContainer />
      this.props.setFetchState(true);
    });
    this.setState({ value: '' });
    this.props.setImageContainerState();
  };

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.props.setFetchState(false);
      this.props.clearImages();
      this.props.setDefaultPosition();
      this.props.startLoadImagesWithTag(this.state.value)
      .then(() => {
        this.props.startUpdateImages(20, 0);
        this.props.setFetchState(true);
      });
      this.setState({ value: '' });
      this.props.setImageContainerState();
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search (currently available tags: home, food, fashion, cats, nature)",
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

export default connect(null, { startLoadImagesWithTag, startUpdateImages, clearImages, setDefaultPosition, setImageContainerState, setFetchState })(SearchBar);
