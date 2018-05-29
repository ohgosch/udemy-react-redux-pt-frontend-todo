import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
import { log } from 'util'
import { runInThisContext } from 'vm'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''

        Axios.get(`${URL}?sort=-createdAt${search}`)
            .then(res => this.setState(
                {
                    ...this.state,
                    description,
                    list: res.data
                }
            ))
    }

    handleClear(){
        this.setState({description: ''})
        this.refresh()
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleMarkAsDone(todo){
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(() => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(() => this.refresh(this.state.description))
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`)
            .then(() => this.refresh(this.state.description))
    }

    handleChange(evt){
        this.setState({ ...this.state, description: evt.target.value })
    }

    handleAdd(){
        const description = this.state.description
        Axios.post(URL, { description })
            .then(data => this.refresh())
    }

    render(){
        return (
            <div>
                <PageHeader
                    name='Tarefas'
                    small="Cadastro"
                />
                <TodoForm
                    handleAdd={ this.handleAdd }
                    handleChange={ this.handleChange }
                    description={ this.state.description }
                    handleSearch={ this.handleSearch }
                    handleClear={ this.handleClear }
                />
                <TodoList
                    list={ this.state.list }
                    handleMarkAsDone={ this.handleMarkAsDone }
                    handleMarkAsPending={ this.handleMarkAsPending }
                    handleRemove={ this.handleRemove }
                />
            </div>
        )
    }
}
