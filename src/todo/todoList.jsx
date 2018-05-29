import React from 'react'

import IconButton from '../template/iconButton'

export default props => {
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
                        onClick={ () => props.handleMarkAsDone(row) }
                        hide={ row.done }
                    />
                    <IconButton
                        style="warning"
                        icon="undo"
                        title="Marcar como não concluído"
                        onClick={ () => props.handleMarkAsPending(row) }
                        hide={ !row.done }
                    />
                    <IconButton
                        style="danger"
                        icon="trash-o"
                        title="Remover"
                        onClick={ () => props.handleRemove(row) }
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
