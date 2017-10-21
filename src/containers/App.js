import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TestActions from '../actions'
import Input from '../components/Input'

const App = ({text, actions}) => (
  <div>
    <Input addText={actions.addText} />
    {text.map((item, key) => { return <p key={key}> {item.text} </p> })}
  </div>
)

App.propTypes = {
  text: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  text: state.testActions
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TestActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
