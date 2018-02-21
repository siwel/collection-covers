import React, {Component} from "react";
import {Sprite, Stage, Text} from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import * as PIXI from "pixi.js"
import Dropzone from 'react-dropzone'
import Background from "../Background";
import {TwitterPicker} from "react-color";
import download from "downloadjs";





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
        }

        this.handleChange = this.handleChange.bind(this);
        this.coverChange = this.coverChange.bind(this);
        this.download = this.download.bind(this);
    }

    imageBackgroundColorChange = (color) => {
        this.setState({imageBackgroundColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
    };
    highlightBarsColorChange = (color) => {
        this.setState({highlightBarsColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
    };
    backgroundColorChange = (color) => {
        this.setState({backgroundColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
        let stage = this.stage;
        console.log(stage)
    };
    collectionFontColorChange = (color) => {
        this.setState({collectionFontColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
    };
    secondaryFontColorChange = (color) => {
        this.setState({secondaryFontColor: color.hex.substr(1)});
        setTimeout(() => this.forceUpdate(), 0);
    };


    coverChange(event) {
        this.setState({cover: event.target.value});
        setTimeout(() => this.forceUpdate(), 0);
    }

    componentDidUpdate() {
        this.stage._app.render();
    }

    componentDidMount() {
        this.stage._app.render();
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

        setTimeout(() => this.forceUpdate(), 50);
        setTimeout(() => this.forceUpdate(), 500);
    }

    download() {
        let image = this.stage._app.renderer.extract.base64(this.stage._app.stage);
        download(image, this.state.collectionName + '.png', 'image/png');
    }

    render() {

        console.log("rendering");
        const {accept, files, dropzoneActive, secondaryFontColor, collectionFontColor, backgroundColor, highlightBarsColor} = this.state;
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
            fontSize: 280,
            fontFamily: 'Bebas Neue'
        });

        const OPTIONS = {
            backgroundColor: '0x'+backgroundColor,
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


                            <Text text="THE" x={2490} y={3282} style={baseFontStyle} anchor={new PIXI.Point(1, 1)}/>
                            <Text text={this.state.collectionName} x={2490} y={3556} style={collectionFontStyle}
                                  anchor={new PIXI.Point(1, 1)}/>
                            <Text text="COLLECTION" x={2490} y={3708} style={baseFontStyle}
                                  anchor={new PIXI.Point(1, 1)}/>


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
                                <div className="uk-width-expand">
                                    <h3 className="uk-card-title uk-margin-remove-bottom">Colors</h3>
                                </div>
                            </div>
                        </div>
                        <div className="uk-card-body">


                            <div className="uk-margin">
                                <span className="uk-text-background">Background</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.backgroundColor}
                                               onChangeComplete={this.backgroundColorChange}
                                />
                            </div>

                            {this.state.cover === "contain" &&
                            <div className="uk-margin">
                                <span className="uk-text-background">Image Background</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.imageBackgroundColor}
                                               onChangeComplete={this.imageBackgroundColorChange}
                                />
                            </div>}

                            <div className="uk-margin">
                                <span className="uk-text-background">Highlight Bars</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.highlightBarsColor}
                                               onChangeComplete={this.highlightBarsColorChange}
                                />
                            </div>

                            <div className="uk-margin">
                                <span className="uk-text-background">Collection Font</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.collectionFontColor}
                                               onChangeComplete={this.collectionFontColorChange}
                                />
                            </div>
                            <div className="uk-margin">
                                <span className="uk-text-background">Secondary Font</span>
                                <TwitterPicker triangle='hide'
                                               color={this.state.secondaryFontColor}
                                               onChangeComplete={this.secondaryFontColorChange}
                                />
                            </div>


                        </div>
                    </div>



                    <div className="uk-card uk-card-default ">
                        <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle">
                                <div className="uk-width-expand">
                                    <h3 className="uk-card-title uk-margin-remove-bottom">About</h3>
                                </div>
                            </div>
                        </div>
                        <div className="uk-card-body">


                            <p>Made by <a href='https://github.com/siwel'>Lewis Qauife</a>.</p><p> Many thanks to <a href='https://www.reddit.com/r/PleX'>/r/plex</a>.</p><p> Plex collection <a href='https://support.plex.tv/articles/201273953-collections/'>support</a></p>




                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

export default ApplicationOptionsExample;
