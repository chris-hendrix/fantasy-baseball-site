import React from "react";
import ReactMarkdown from "react-markdown";
import champ from "./images/champ.jpg"
import markdown from "./markdown/home.md"

class Home extends React.Component {
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
      <div className="home">
        <div class="container">
          <div class="row align-items-top my-5">
            <div class="col-lg-7">
              <h1>2020 Champion: Vaughan</h1>
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src={champ}
                alt="file"
              />
            </div>
            <div class="col-lg-5">
              <ReactMarkdown 
                children={this.state.markdown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Home;
