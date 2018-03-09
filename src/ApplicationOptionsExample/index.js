import React, {Component} from "react";
import {Sprite, Stage, Text, Container} from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import * as PIXI from "pixi.js"
import Dropzone from 'react-dropzone'
import Background from "../Background";
import {TwitterPicker} from "react-color";
import download from "downloadjs";
import Amplitude from "amplitude";

const colors = [
    '#FF0000',
    '#FF6900',
    '#FCB900',
    '#00D084',
    '#9900EF',
    '#0693E3',
    '#FFFFFF',
    '#ACACAC',
    '#242931',
    '#000000'
]



class ApplicationOptionsExample extends Component {


    constructor() {
        super();


        this.state = {
            collectionName: 'collection name',
            accept: null,
            files: [],
            dropzoneActive: false,
            cover: 'cover',
            imageBackgroundColor: 'ffffff',
            backgroundColor: '242931',
            highlightBarsColor: 'acacac',
            collectionFontColor: 'ff0000',
            secondaryFontColor: 'ffffff',
            theTextLocation: 268,
            showTheText: true,
            showCollectionText: true,
            breakWords: true,
            fontSize: 280
        }

        this.amp = new Amplitude('2433446a53914400e3ef2b05135ed543', { device_id: this.getID() });

        this.amp.track({event_type: 'pageLoad', event_properties: {
                pageName: "HOME"
            } });

        this.handleChange = this.handleChange.bind(this);
        this.coverChange = this.coverChange.bind(this);
        this.download = this.download.bind(this);
        this.checkboxUpdate = this.checkboxUpdate.bind(this);
        this.fontSizeChange = this.fontSizeChange.bind(this);
    }


    getID()
    {
        var nav = window.navigator;
        var screen = window.screen;
        var guid = nav.mimeTypes.length;
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || '';
        guid += screen.width || '';
        guid += screen.pixelDepth || '';

        return guid;
    }



    checkboxUpdate(event){
        const target = event.target;

        this.setState({
            [target.name]: target.checked
        });
    }

    fontSizeChange(event){
        this.setState({
            fontSize: event.target.valueAsNumber
        });
    }

    imageBackgroundColorChange = (color) => {
        this.setState({imageBackgroundColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        if(window.ga)
        {
            window.ga('send', 'event', 'Color', 'choose', color.hex);
        }
    };
    highlightBarsColorChange = (color) => {
        this.setState({highlightBarsColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        if(window.ga)
        {
            window.ga('send', 'event', 'Color', 'choose', color.hex);
        }
    };
    backgroundColorChange = (color) => {
        this.setState({backgroundColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        let stage = this.stage;
        if(window.ga)
        {
            window.ga('send', 'event', 'Color', 'choose', color.hex);
        }
    };
    collectionFontColorChange = (color) => {
        this.setState({collectionFontColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        if(window.ga)
        {
            window.ga('send', 'event', 'Color', 'choose', color.hex);
        }
    };
    secondaryFontColorChange = (color) => {
        this.setState({secondaryFontColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        if(window.ga)
        {
            window.ga('send', 'event', 'Color', 'choose', color.hex);
        }
    };


    coverChange(event) {
        this.setState({cover: event.target.value});
        setTimeout(() => this.forceUpdate(), 0);
        if(window.ga)
        {
            window.ga('send', 'event', 'Cover', 'select', event.target.value);
        }
    }

    componentDidUpdate() {

        if(this.collection && this.state.theTextLocation !== this.collection.height)
        {
            this.setState({theTextLocation: this.collection.height})
        }
        requestAnimationFrame(() => this.stage._app.render());
    }

    componentDidMount() {
        requestAnimationFrame(() => this.stage._app.render());
    }

    handleChange(event) {
        this.setState({collectionName: event.target.value});
    }

    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.setState({
            files,
            dropzoneActive: false
        });

        if(window.ga)
        {
            window.ga('send', 'event', 'Cover', 'Upload', null);
        }

        setTimeout(() => this.forceUpdate(), 50);
        setTimeout(() => this.forceUpdate(), 500);
    }

    download() {
        let image = this.stage._app.renderer.extract.base64(this.stage._app.stage);
        download(image, this.state.collectionName + '.png', 'image/png');

        if(window.ga)
        {
            window.ga('send', 'event', 'Cover', 'Download', this.state.collectionName);
            console.log('Download:', this.state.collectionName);
        }

        this.amp.track({event_type: 'download', event_properties: {
                    collectionName: this.state.collectionName.toUpperCase(),
                    cover: this.state.cover.toUpperCase(),
                    imageBackgroundColor: '#' + this.state.imageBackgroundColor.toUpperCase(),
                    backgroundColor: '#' + this.state.backgroundColor.toUpperCase(),
                    highlightBarsColor: '#' + this.state.highlightBarsColor.toUpperCase(),
                    collectionFontColor: '#' + this.state.collectionFontColor.toUpperCase(),
                    secondaryFontColor: '#' + this.state.secondaryFontColor.toUpperCase()
            } })

    }

    render() {

        const {breakWords, theTextLocation, accept, files, dropzoneActive, secondaryFontColor, collectionFontColor, backgroundColor, highlightBarsColor} = this.state;
        const overlayStyle = {
            background: 'rgba(0,0,0,0.8)',
            textAlign: 'center',
            color: '#fff',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        const baseFontStyle = new PIXI.TextStyle({
            fill: '0x'+secondaryFontColor,
            fontSize: 150.,
            fontFamily: 'Bebas Neue'
        });


        const collectionFontStyle = new PIXI.TextStyle({
            fill: '0x'+collectionFontColor,
            fontSize: this.state.fontSize,
            fontFamily: 'Bebas Neue',
            wordWrap: true,
            wordWrapWidth: 2450,
            miterLimit: 10,
            align: 'right',
            breakWords: breakWords,
        });

        const OPTIONS = {
            sharedtickerTicker: false,
            autoStart: false
        };

        const cover = files.length === 1 ? files[0].preview : null;

        return (
            <div className='appIntro'>


                <div className='stage'>
                    <Dropzone
                        style={{
                            width: 'auto',
                            height: 'auto',
                            border: 'none',
                            position: 'relative'
                        }}
                        accept={accept}
                        onDrop={this.onDrop.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}
                    >
                        {dropzoneActive && <div style={overlayStyle}>Drop Image</div>}

                        <Stage width={2550} height={3825} options={OPTIONS}
                               ref={(stage) => {
                                   this.stage = stage;
                               }}
                        >


                            <Rectangle
                                x={0}
                                y={0}
                                width={2550}
                                height={3825}
                                fill={'0x'+backgroundColor}
                                id='canvas'
                            />


                            <Rectangle
                                x={0}
                                y={527}
                                width={2550}
                                height={1860}
                                fill={'0x' + this.state.imageBackgroundColor}
                            />


                            {cover && <Background x={0}
                                                  y={527}
                                                  width={2550}
                                                  height={1860}
                                                  texture={PIXI.Texture.from(cover)}
                                                  type={this.state.cover}
                                                  color={'0x' + this.state.imageBackgroundColor}
                            />}


                            <Rectangle
                                x={0}
                                y={527}
                                width={2550}
                                height={73}
                                fill={'0x'+highlightBarsColor}
                            />

                            <Rectangle
                                x={0}
                                y={2387}
                                width={2550}
                                height={73}
                                fill={'0x'+highlightBarsColor}
                            />


                            <Container x={2490} y={3708} anchor={new PIXI.Point(1, 1)}>

                                <Text
                                    y={-152}
                                    text={this.state.collectionName}
                                    style={collectionFontStyle}
                                    anchor={new PIXI.Point(1, 1)}
                                    ref={(collection) => { this.collection = collection; }}
                                />

                                <Text text="THE"
                                      y={-theTextLocation - 158}
                                      style={baseFontStyle}
                                      anchor={new PIXI.Point(1, 1)}
                                      alpha={this.state.showTheText ? 1 : 0}
                                />

                                <Text text="COLLECTION"
                                      style={baseFontStyle}
                                      anchor={new PIXI.Point(1, 1)}
                                      alpha={this.state.showCollectionText ? 1 : 0}
                                />
                            </Container>



                        </Stage>
                    </Dropzone>


                </div>

                <div className='options'>
                    <div className="uk-card uk-card-default ">

                        <div className="uk-card-body">

                            <div className="uk-margin">
                                <input className="titleInput uk-input" type="text" value={this.state.collectionName}
                                       onChange={this.handleChange}/>
                            </div>

                            <div className="uk-margin">
                                <select className="uk-select" onChange={this.coverChange} value={this.state.cover}>
                                    <option value="cover">Cover Image</option>
                                    <option value="contain">Contain Image</option>
                                </select>
                            </div>
                            <p>HINT: drag artwork onto cover</p>
                        </div>
                        <div className="uk-card-footer">
                            <button className="uk-button uk-button-primary" onClick={this.download}>Download Cover</button>
                        </div>
                    </div>


                    <div className="uk-card uk-card-default ">
                        <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle">
                                    <h3 className="uk-card-title uk-margin-remove-bottom">Colors</h3>
                            </div>
                        </div>
                        <div className="uk-card-body">


                            <div className="uk-margin">
                                <span className="uk-text-background">Background</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.backgroundColor}
                                               onChangeComplete={this.backgroundColorChange}
                                               colors={colors}
                                />
                            </div>

                            {this.state.cover === "contain" &&
                            <div className="uk-margin">
                                <span className="uk-text-background">Image Background</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.imageBackgroundColor}
                                               onChangeComplete={this.imageBackgroundColorChange}
                                               colors={colors}
                                />
                            </div>}

                            <div className="uk-margin">
                                <span className="uk-text-background">Highlight Bars</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.highlightBarsColor}
                                               onChangeComplete={this.highlightBarsColorChange}
                                               colors={colors}
                                />
                            </div>

                            <div className="uk-margin">
                                <span className="uk-text-background">Collection Font</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.collectionFontColor}
                                               onChangeComplete={this.collectionFontColorChange}
                                               colors={colors}
                                />
                            </div>
                            <div className="uk-margin">
                                <span className="uk-text-background">Secondary Font</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.secondaryFontColor}
                                               onChangeComplete={this.secondaryFontColorChange}
                                               colors={colors}
                                />
                            </div>


                        </div>
                    </div>


                    <div className="uk-card uk-card-default ">

                        <div className="uk-card-header">

                            <h3 className="uk-card-title uk-margin-remove-bottom">Get Updates</h3>
                        </div>

                        <form name="email" method="POST" netlify>

                            <div className="uk-card-body">

                                <div className="uk-margin">
                                    <input className="titleInput uk-input" type="text" name="name" placeholder='Name'/>
                                </div>

                                <div className="uk-margin">
                                    <input className="titleInput uk-input" type="email" name="email" placeholder='e-mail'/>
                                </div>

                            </div>

                            <div className="uk-card-footer">
                                <button className="uk-button uk-button-primary" type="submit">Send</button>
                            </div>

                        </form>
                    </div>



                    <div className="uk-card uk-card-default ">
                        <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle">
                                    <h3 className="uk-card-title uk-margin-remove-bottom">Advance</h3>
                            </div>
                        </div>
                        <div className="uk-card-body" style={{textAlign: 'left'}}>

                            <div className="uk-margin">
                                <label>
                                    <input
                                        className="uk-checkbox"
                                        type="checkbox"
                                        name='showTheText'
                                        checked={this.state.showTheText}
                                        onChange={this.checkboxUpdate}
                                    /> 'THE' TEXT
                                </label>
                            </div>

                            <div className="uk-margin">
                                <label>
                                    <input
                                        className="uk-checkbox"
                                        type="checkbox"
                                        name='showCollectionText'
                                        checked={this.state.showCollectionText}
                                        onChange={this.checkboxUpdate}
                                    /> 'COLLECTION' TEXT
                                </label>
                            </div>

                            <div className="uk-margin">
                                <label>
                                    <input
                                        className="uk-checkbox"
                                        type="checkbox"
                                        name='breakWords'
                                        checked={this.state.breakWords}
                                        onChange={this.checkboxUpdate}
                                    /> WORD WRAP BREAK WORDS
                                </label>
                            </div>

                            <div className="uk-margin">
                                <span className="uk-text-background">Collection Font Size</span>
                                <input
                                    className="uk-range"
                                    type="range"
                                    value={this.state.fontSize}
                                    min="200"
                                    max="400"
                                    step="25"
                                    onChange={this.fontSizeChange}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="uk-card uk-card-default ">
                        <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle">
                                    <h3 className="uk-card-title uk-margin-remove-bottom">About</h3>
                            </div>
                        </div>
                        <div className="uk-card-body">


                            <p> Made by <a href='https://github.com/siwel'>Lewis Qauife</a>.</p>
                            <p> Many thanks to <a href='https://www.reddit.com/r/PleX'>/r/plex</a></p>
                            <p> Layout by <a href='https://www.reddit.com/u/theoriginalsuperman'>theoriginalsuperman</a></p>
                            <p> Plex collection <a href='https://support.plex.tv/articles/201273953-collections/'>support</a></p>


                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

export default ApplicationOptionsExample;
