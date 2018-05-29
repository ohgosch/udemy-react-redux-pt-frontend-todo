import React from 'react'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {

    const keyHandler = evt => {
        if(evt.key === 'Enter' )
            evt.shiftKey ? props.handleSearch() : props.handleAdd()

        else if(evt.key === 'Escape')
            props.handleClear()
    }

    return (
        <div role="form" className="todoForm">
            <Grid cols="12 9 10">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Adicione uma tarefa"
                    onKeyUp={ keyHandler }
                    onChange={ props.handleChange }
                    value={ props.description }
                />
            </Grid>

            <Grid cols="12 3 2">
                <IconButton
                    style="primary"
                    icon="plus"
                    title="Adicionar (Enter)"
                    onClick={ props.handleAdd }
                />
                <IconButton
                    style="info"
                    icon="search"
                    title="Pesquisar (Shift + Enter)"
                    onClick={ props.handleSearch }
                />
                <IconButton
                    style="default"
                    icon="close"
                    title="Limpar (Esc)"
                    onClick={ props.handleClear }
                />
            </Grid>
        </div>
    )
}
