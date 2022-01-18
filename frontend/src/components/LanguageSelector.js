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
        <Button onClick={() => this.handleLanguage("cpp")}>C++</Button>
        <Button onClick={() => this.handleLanguage("python")}>Python</Button>
        <Button onClick={() => this.handleLanguage("javascript")}>Javascript</Button>
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