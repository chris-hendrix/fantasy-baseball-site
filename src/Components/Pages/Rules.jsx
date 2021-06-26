import React from "react";
import ReactMarkdown from "react-markdown";
import champ from "./images/champ.jpg"
import markdown from "./markdown/rules.md"
import MdPage from "./MdPage"

class Rules extends React.Component {
  constructor(props){
    super(props)
    this.state = {markdown: null}
  }

  componentWillMount() {
    console.log('will mount')
    fetch(markdown).then((response) => response.text()).then((text) => {
      console.log(text)
      this.setState({ markdown: text })
    })
  }

  render () {
    return (
      <MdPage markdown={markdown}/>
    );
  }
  
}

export default Rules;
