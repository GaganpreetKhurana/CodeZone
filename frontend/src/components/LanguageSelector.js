import * as React from 'react';
import { connect } from "react-redux";
import { languageSelect } from "../actions/language";

import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Cpp",
    };
  }
  handleChange = (_, value) => {
    this.setState({
      value,
    });
  };

  handleLanguage = (language) => {
    this.props.dispatch(languageSelect(language));
  };

  render() {
    return (
      <div>
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab
              label="Cpp"
              value="Cpp"
              onClick={() => this.handleLanguage("C++")}
            />
            <Tab
              label="Python3"
              value="Python3"
              onClick={() => this.handleLanguage("Python 3")}
            />
            <Tab
              label="Java"
              value="Java"
              onClick={() => this.handleLanguage("Java")}
            />
          </Tabs>
        </Box>
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