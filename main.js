import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

require('./app.less');


var transform = require('./index');

var originalConsoleLog = console.log.bind(console);

window.LOG = [];

console.log = function (...args) {
    window.LOG.push(args.join(','));

    originalConsoleLog.apply(console, args);
};

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




var INITIAL_VALUE = `

değişken x = 2;

x = x + 1;

eğer (x === 3) {
   yazdır("x üçtür");
} değilse {
   yazdır("x üç değildir");

}

tekrarla (değişken t = 0; t < 10; t++) {
   yazdır(t + "nin karesi " + t * t + "dir");
}


[1, 2, 3].herbiriİçin(fonksiyon (x) {
    yazdır(x * x * x);

});

değişken küpler = [1, 2, 3].dönüştür(fonksiyon (x) {
    döndür x * x * x;

});

yazdır("küpler", küpler);


fonksiyon tek(x) {
    döndür x % 2 == 1;
}
değişken tekler = [1, 2, 3, 4, 5].filtrele(tek);

yazdır("tekler", tekler);

değişken isim = 'ahmet';
yazdır(isim, isim.büyükHarfeDönüştür());

değişken isim2 = 'MEHMET';
yazdır(isim2, isim2.küçükHarfeDönüştür());

`;

window.ERRORS = [];

window.onerror = function (e) {
    //debugger;
    window.ERRORS.push(e);
};

var convertErrorToTurkish = function (x) {
    return x.replace("SyntaxError", "Sözdizimi hatası").replace("Unexpected end of input", "Beklenmeyen giriş sonucu. Kapatma parantezini mi unuttunuz?").replace("Unexpected identifier", "Beklenmeyen ifade");
};

var Main = React.createClass({
    getInitialState() {
        return { transformed: transform(INITIAL_VALUE), value: INITIAL_VALUE, log: [], showJS: false, autorun: true, hatalar: [] };
    },

    onChange(newValue) {
        this.setState({
            value: newValue,
            transformed: transform(newValue)
        }, function () {
            if (this.state.autorun) {
                window.ERRORS = [];
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
        this.setState({ log: [] })
        try {
            eval(this.state.transformed);
            this.setState({ log: window.LOG, hatalar: [] });
        } catch (e) {
            debugger;
            this.setState({ hatalar: [convertErrorToTurkish(String(e))] });
        }
    },

    toggleJS() {
        this.setState({ showJS: !this.state.showJS });
    },

    toggleAutorun() {
        this.setState({ autorun: !this.state.autorun });
    },

    render() {
        return <div className="container" >
            <div id='editor'>
                <h1>TürkçeScript<div id='github'><a href='https://github.com/ustun/turkcescript'>Github deposu</a></div></h1>

                <label>JavaScript dönüşümünü göster<input type="checkbox" checked={this.state.showJS} onClick={this.toggleJS}/></label>
                <label>Otomatik çalıştır<input type="checkbox" checked={this.state.autorun} onClick={this.toggleAutorun}/></label>
                <button onClick={this.run} className='calistir'>Çalıştır</button>
                <AceEditor
                    mode="javascript"
                    theme="github"
                    onChange={this.onChange}
                    name="ace-editor"
                    height={'800'}
                    editorProps={{ $blockScrolling: true }}
                    value={this.state.value}
                    showGutter={false}
                    />
            </div>

            {
                this.state.showJS && <div id='transformed'>
                    <h1>JavaScript Dönüşümü</h1>
                    <Output content={this.state.transformed}/>
                </div>
            }

            <div id='output'>
                <h1>Çıktı</h1>
                <pre>
                    <code>
                        {
                            this.state.log.map(function (log, i) {
                                return <div key={i}>{`Çıktı ${i}: ${log}`}</div>;
                            })
                        }
                    </code>
                </pre>

                {
                    this.state.hatalar.length > 0 && <div id='hatalar'><h1>Hatalar</h1>
                        <pre>
                            <code>
                                {
                                    this.state.hatalar.map(function (log, i) {
                                        return <div key={i}>{`Hata ${i}: ${log}`}</div>;
                                    })
                                }
                            </code>
                        </pre>
                    </div>
                }
                <div>
                </div>
            </div>
        </div>;
    }
});

render(<Main/>, document.getElementById('app'));
