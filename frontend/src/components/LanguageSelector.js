import * as React from 'react';
import { connect } from "react-redux";
import { languageSelect } from "../actions/language";

import Button from '@mui/material/Button';


class LanguageSelector extends React.Component {

  handleLanguage = (language) => {
    this.props.dispatch(languageSelect(language));
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.handleLanguage("C++")}>C++</Button>
        <Button onClick={() => this.handleLanguage("C++14")}>C++ 14</Button>
        <Button onClick={() => this.handleLanguage("Python 3")}>Python 3</Button>
        <Button onClick={() => this.handleLanguage("JavaScript")}>Javascript</Button>
        <Button onClick={() => this.handleLanguage("Java")}>Java</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language : state.language
  };
}

export default connect(mapStateToProps)(LanguageSelector);