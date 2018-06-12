import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { markAsDone, markAsPending, remove } from './todoActions'

const TodoList = props => {
    const renderRows = () => {
        const list = props.list || []

        return list.map(row => (
            <tr key={ row._id }>
                <td className={ row.done ? 'done' : '' }>
                    { row.description }
                </td>
                <td>
                    <IconButton
                        style="success"
                        icon="check"
                        title="Marcar como concluído"
                        onClick={ () => props.markAsDone(row) }
                        hide={ row.done }
                    />
                    <IconButton
                        style="warning"
                        icon="undo"
                        title="Marcar como não concluído"
                        onClick={ () => props.markAsPending(row) }
                        hide={ !row.done }
                    />
                    <IconButton
                        style="danger"
                        icon="trash-o"
                        title="Remover"
                        onClick={ () => props.remove(row) }
                        hide={ !row.done }
                    />
                </td>
            </tr>
        ))
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                { renderRows() }
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
