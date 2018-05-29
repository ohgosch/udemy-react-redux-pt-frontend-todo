import React, { Component } from 'react'

export default class Grid extends Component {

    toCssClasses(numbers){
        const dictionary = ['xs', 'sm', 'md', 'lg']
        const cols = numbers ? numbers.split(' ') : []
        let classes = ''

        cols.forEach((item, index) => {
            if(index == dictionary.length) return
            if(item) classes += `col-${ dictionary[index] }-${ item } `
        })

        return classes
    }

    render() {
        const gridClasses = this.toCssClasses(this.props.cols || '12')

        return (
            <div className={ gridClasses }>
                { this.props.children }
            </div>
        )
    }
}
