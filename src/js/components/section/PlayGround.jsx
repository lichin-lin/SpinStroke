import React, { Component } from 'react'
import Radium from 'radium'
import Containers from 'js/containers'
import CSSModules from 'react-css-modules'

@Radium
export default CSSModules(class PlayGround extends Component {
    render () {
        return (
            <section id="Playground" className="main special">
                <header className="major">
                    <h2>Playground</h2>
                    {/* <p>that's cool right?</p> */}
                </header>
                <footer className="major">
                    <ul
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            overflow: 'scroll'
                        }}
                    className="actions board"
                    >
                        <Containers.stroke />
                    </ul>
                    <ul className="actions controller">
                        <Containers.section.ControllSection />
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./PlayGround.styl'))
