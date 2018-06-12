import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search, add, clear } from './todoActions'

class TodoForm extends Component {

    constructor(props) {
        super(props)

        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(evt) {
        const { add, search, description, clear } = this.props

        if(evt.key === 'Enter' )
            evt.shiftKey ? search() : add(description)

        else if(evt.key === 'Escape')
            clear()
    }

    render() {
        const { add, search, description, clear, changeDescription } = this.props

        return (
            <div role="form" className="todoForm">
                <Grid cols="12 9 10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Adicione uma tarefa"
                        onKeyUp={ this.keyHandler }
                        onChange={ changeDescription }
                        value={ description }
                    />
                </Grid>

                <Grid cols="12 3 2">
                    <IconButton
                        style="primary"
                        icon="plus"
                        title="Adicionar (Enter)"
                        onClick={ () => add(description) }
                    />
                    <IconButton
                        style="info"
                        icon="search"
                        title="Pesquisar (Shift + Enter)"
                        onClick={ search }
                    />
                    <IconButton
                        style="default"
                        icon="close"
                        title="Limpar (Esc)"
                        onClick={ clear }
                    />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })

const mapDispathToProps = dispatch => bindActionCreators({ changeDescription, search, add, clear }, dispatch)

export default connect(mapStateToProps, mapDispathToProps)(TodoForm)
