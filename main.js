import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

var transform = require('./index');

// function onChange(newValue) {
//     console.log('change',newValue);
//     eval(transform(newValue));
// }

var originalConsoleLog = console.log.bind(console);


window.LOG = [];

console.log = function (...args) {
    window.LOG.push(args.join(','));

    originalConsoleLog.apply(console, args);
};

var yazdir = console.log.bind(console);
var uyari = window.alert;

var Output = React.createClass({

    render() {
        return <div className="">
            <pre>
            <code>
            {this.props.content}
        </code>

        </pre>

        </div>;

    }

});

require('./app.less');


var INITIAL_VALUE = `

değişken x = 2;

x = x + 1;

eğer (x === 3) {
   yazdir("x üçtür");
} değilse {
   yazdir("x üç değildir");

}

`
var Main = React.createClass({
    getInitialState() {
        return {transformed: transform(INITIAL_VALUE), value: INITIAL_VALUE, log: [], showJS: false, autorun: true};
    },

    onChange(newValue) {

        this.setState({
            value: newValue,
            transformed: transform(newValue)}, function () {

                if (this.state.autorun) {
                    window.setTimeout(function () {
                        this.run();
                    }.bind(this), 10);
                }

            }.bind(this));

    },

    componentDidMount() {

        this.state.autorun && this.run();
    },

    run() {
        window.LOG = [];
        this.setState({log: []})
        eval(this.state.transformed);
        this.setState({log: window.LOG});
    },

    toggleJS() {

        this.setState({showJS: !this.state.showJS});

    },

    toggleAutorun() {

        this.setState({autorun: !this.state.autorun});

    },

    render() {
        return <div className="container" >
            <div id='editor'>
            <h1>TürkçeScript<div id='github'><a href='github.com/ustun/turkcescript'>Github deposu</a></div></h1>

            <label>JavaScript dönüşümünü göster<input type="checkbox" checked={this.state.showJS} onClick={this.toggleJS}/></label>
            <label>Otomatik çalıştır<input type="checkbox" checked={this.state.autorun} onClick={this.toggleAutorun}/></label>
            <button onClick={this.run} className='calistir'>Çalıştır</button>
            <AceEditor
             mode="javascript"
             theme="github"
             onChange={this.onChange}
             name="ace-editor"
             editorProps={{$blockScrolling: true}}
             value={this.state.value}
             showGutter={false}
             />
            </div>
            {this.state.showJS &&<div id='transformed'>
             <h1>JavaScript Dönüşümü</h1>
             <Output content={this.state.transformed}/>
             </div>}

            <div id='output'>
            <h1>Çıktı</h1>

            <pre><code>
            {/*JSON.stringify(this.state.log) */}
        {this.state.log.map(function (log, i) {
            return <div key={i}>{`Çıktı ${i}: ${log}`}</div>;
        })}
        </code></pre>
            <div>

        </div>

            </div>

             </div>;

             }

            });

    // Render editor
    render(<Main/>, document.getElementById('app'));
