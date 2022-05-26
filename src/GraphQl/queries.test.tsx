import Queries from './Queries.tsx'
import * as ReactDOM from 'react-dom'
import React from 'react'




describe('Queries component tests', ()=>{
    let container: HTMLDivElement

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Queries/>, container);
    })

    afterEach(()=>{
        document.body.removeChild(container)
        container.remove()
    })

    test('Renders component correctly', ()=>{
        const queryElements = container.querySelectorAll('.country__container')
        expect(queryElements).toHaveLength(250);
    })
})
