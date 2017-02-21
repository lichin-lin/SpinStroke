import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import {Creatable} from 'react-select'
import 'react-select/dist/react-select.css'

// http://davidwalsh.name/javascript-debounce-function
function debounce (func, wait, immediate) {
    var timeout
    return function () {
        var context = this
        var args = arguments
        var later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
export default CSSModules(class ModeSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.handleChangeHeight = this.handleChangeHeight.bind(this)
        this.handleChangeWidth = this.handleChangeWidth.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleChangeFontSize = this.handleChangeFontSize.bind(this)
        this.handleChangeFontSizeToProps = debounce(this.handleChangeFontSizeToProps.bind(this), 1000)
        this.handleChangeLineWidth = this.handleChangeLineWidth.bind(this)
        this.handleChangeLineWidthToProps = debounce(this.handleChangeLineWidthToProps.bind(this), 1000)
        this.handleChangeSpeed = this.handleChangeSpeed.bind(this)
        this.handleChangeSpeedToProps = debounce(this.handleChangeSpeedToProps.bind(this), 1000)
        this.handleChangeRate = this.handleChangeRate.bind(this)
        this.handleChangeRateToProps = debounce(this.handleChangeRateToProps.bind(this), 1000)
        this.updatePropsToState = this.updatePropsToState.bind(this)
        this.state = {
            text: '',
            textArray: [
                { value: 'select', label: 'select' },
                { value: 'or', label: 'or' },
                { value: 'type', label: 'type' }
            ],
            multiValue: [],
            FontSize: 100,
            AnimationSpeed: 3,
            ChangeRate: 1.5,
            lineWidth: 2,
            width: 500,
            height: 200,
            ...props.Stroke
        }
    }
    handleChangeWidth (event) {
        this.setState({width: event.target.value})
        this.props.setStrokeProps({width: event.target.value})
    }
    handleChangeHeight (event) {
        this.setState({height: event.target.value})
        this.props.setStrokeProps({height: event.target.value})
    }
    handleChangeInput (val) {
        this.setState({multiValue: val})
        this.props.setStrokeProps({texts: val.map((text) => (text.label))})
    }

    handleChangeFontSize (val) {
        this.setState({FontSize: val})
        this.handleChangeFontSizeToProps(val)
    }
    handleChangeFontSizeToProps (val) {
        this.props.setStrokeProps({fontSize: val})
    }

    handleChangeSpeed (val) {
        this.setState({AnimationSpeed: val})
        this.handleChangeSpeedToProps(val)
    }
    handleChangeSpeedToProps (val) {
        this.props.setStrokeProps({speed: val})
    }

    handleChangeRate (val) {
        this.setState({ChangeRate: val})
        this.handleChangeRateToProps(val)
    }
    handleChangeRateToProps (val) {
        this.props.setStrokeProps({during: val})
    }

    handleChangeLineWidth (val) {
        this.setState({lineWidth: val})
        this.handleChangeLineWidthToProps(val)
    }
    handleChangeLineWidthToProps (val) {
        this.props.setStrokeProps({lineWidth: val})
    }

    handleSubmit () {
        this.props.setStrokeProps({
            fontSize: this.state.FontSize,
            lineWidth: this.state.lineWidth,
            width: this.state.width,
            height: this.state.height,
            speed: this.state.AnimationSpeed,
            during: this.state.ChangeRate,
            texts: this.state.multiValue.map((text) => (text.label))
        })
    }
    updatePropsToState (Stroke) {
        console.log('upload')
        this.setState({
            ...Stroke,
            FontSize: Stroke.fontSize,
            AnimationSpeed: Stroke.speed,
            ChangeRate: Stroke.during,
            lineWidth: this.state.lineWidth,
            width: Stroke.width,
            height: Stroke.height,
            multiValue: Stroke.texts.map((text) => ({
                'value': text,
                'label': text
            }))
        })
    }
    componentDidMount () {
        this.updatePropsToState(this.state)
        var iframeURL = 'https://lichin.me/spinStroke/iframe?data=' + (new Buffer(JSON.stringify(this.props.Stroke)).toString('base64'))
        this.setState({
            iframeURL: iframeURL
        })
    }

    componentWillReceiveProps (nextProps) {
        var iframeURL = 'https://lichin.me/spinStroke/iframe?data=' + (new Buffer(JSON.stringify(nextProps.Stroke)).toString('base64'))
        this.setState({
            iframeURL: iframeURL
        })
    }
    render () {
        return (
            <section id="Mode" className="main special">
                <ul className="actions slideControll">
                    <li>
                        <p>Animation url:</p>
                        <input type="text" value={this.state.iframeURL} />
                        <p style={{
                            fontSize: '0.85em',
                            fontStyle: 'italic',
                            color: '#AAA'
                        }}>* copy & use wherever you like</p>
                    </li>
                </ul>
                <ul className="actions slideControll">
                    <li>
                        <p>width:</p>
                        <input type="text" value={this.state.width} onChange={this.handleChangeWidth}/>
                        <p>height:</p>
                        <input type="text" value={this.state.height} onChange={this.handleChangeHeight}/>
                        <p>Input:</p>
                        <Creatable
                            multi={true}
                            options={this.state.textArray}
                            onChange={this.handleChangeInput}
                            value={this.state.multiValue}
                        />
                    </li>
                    <li>
                        <p>FontSize:</p>
                        <InputRange
                          maxValue={1000}
                          minValue={10}
                          step={10}
                          value={this.state.FontSize}
                          onChange={this.handleChangeFontSize} />
                    </li>
                    <li>
                        <p>LineWidth:</p>
                        {/* <Debounce period={200} value={this.state.lineWidth}></Debounce> */}
                        <InputRange
                          maxValue={10}
                          minValue={1}
                          step={1}
                          value={this.state.lineWidth}
                          onChange={this.handleChangeLineWidth} />
                    </li>
                    <li>
                        <p>Change Period:</p>
                        <InputRange
                          maxValue={10}
                          minValue={1}
                          step={0.5}
                          value={this.state.ChangeRate}
                          onChange={this.handleChangeRate} />
                    </li>
                    <li>
                        <p>Animation Speed:</p>
                        <InputRange
                          maxValue={10}
                          minValue={1}
                          step={0.5}
                          value={this.state.AnimationSpeed}
                          onChange={this.handleChangeSpeed} />
                    </li>
                </ul>

            </section>
        )
    }
}, require('./ModeSection.styl'))
