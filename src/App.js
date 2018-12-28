import React, { Component } from "react";
import  "./App.css";


const languages = {
  "en-GB": "English",
  "hy-AM": "Armenian",
  "ru-RU": "Russian"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      locale: "en-GB",
      textsLoaded: false,
      err: ""
    };
    this.initialLocale = "hy-AM";
    this.texts = {}
    this.arr = ["en-GB","hy-AM","ru-RU"];
  }

  componentDidMount() {
    this.setLocale(this.initialLocale);
  }

  componentDidCatch(err, errInfo) {
    console.log(err);
  }

  setLocale = locale => {
    if (this.state.locale !== locale) {
      this.setState({ textsLoaded: false, locale });
      fetch(`http://localhost:3000/locale/${locale}.json`)
        .then(res => res.json())
        .then(json => {
          this.texts = json;
          this.setState({ textsLoaded: true });
        })
        .catch(ex => {
          this.setState({ err: ex });
        });
    }
  };

  render() {
    let indexCur = this.state.index;
    let locale = this.state.locale;

    return (
      <div className="App">
        {this.state.err !== "" ? (
          "Oops!"
        ) : this.state.textsLoaded ? (
          <>
            <div className="maincont">
              <h1>{this.texts.title}</h1>
              <p>{this.texts.text1}</p>
            </div>

            <div className="langicon">
            {
              (<button title={languages[locale]} 
                style={{border:"none",width:50,height:30,backgroundImage:`url(http://localhost:3000/locale/${locale}flag.jpg)`,backgroundSize: "cover",backgroundPosition: "center"}}
                onClick = { () => { 
                  indexCur++;
                  if(indexCur===3) { indexCur=0; }
                  this.setState({index: indexCur});                    
                  locale = this.arr[indexCur];
                  this.setLocale(locale);
                }  
              }></button>)
            }         
            </div>
          </>
        ) : ("Loading...")}
      </div>
    );
  }
}

export default App;

