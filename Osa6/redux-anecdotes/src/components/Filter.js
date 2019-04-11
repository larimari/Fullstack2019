import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        props.setFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            <p> </p>
            Filter <input onChange={handleChange} />
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setFilter: value => {
            dispatch(setFilter(value))
        },
    }
}
export default connect(
    null,
    mapDispatchToProps
)(Filter)



/* import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
*/