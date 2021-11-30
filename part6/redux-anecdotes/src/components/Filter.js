import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = event => {
    const keyword = event.target.value
    props.filterChange(keyword)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterChange })(Filter)
