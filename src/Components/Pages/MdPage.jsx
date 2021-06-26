import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'

class MdPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {markdown: null}
  }

  componentWillMount() {
    console.log('will mount')
    fetch(this.props.markdown).then((response) => response.text()).then((text) => {
      console.log(text)
      this.setState({ markdown: text })
    })
  }

  render () {
    return (
      <div className="rules">
        <div class="container">
          <div class="row align-items-top my-5 justify-content-center pb-5">
            <div class="col-lg-7">
              <ReactMarkdown 
                children={this.state.markdown}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }
  
}

export default MdPage;
