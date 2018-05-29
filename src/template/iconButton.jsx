import React from 'react'

import If from './if'

export default props => (
    <If test={ !props.hide }>
        <button
            className={`btn btn-${props.style}`}
            onClick={ props.onClick }
            title={ props.title }
        >
            <i
                aria-hidden="true"
                className={`fa fa-${props.icon}`}
            />
        </button>
    </If>
)
