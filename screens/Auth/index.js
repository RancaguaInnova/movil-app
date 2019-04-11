import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { Button } from 'react-native-elements'

import SectionDivider from 'components/SectionDivider'
import styles from './styles'
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'

export default class Auth extends React.Component {
  static propTypes = {
    show: PropTypes.string,
  }

  static defaultProps = {
    show: 'login',
  }

  state = {
    current: 'login',
  }

  sections = [
    {
      id: 'login',
      title: 'Iniciar sesión',
      component: <Login />,
    },
    {
      id: 'register',
      title: 'Registrarse',
      component: <Register />,
    },
    {
      id: 'forgot',
      title: 'Recuperar contraseña',
      component: <Forgot />,
    },
  ]

  @autobind
  show(id) {
    this.setState({
      current: id,
    })
  }

  componentDidMount() {
    this.show(this.props.show)
  }

  render() {
    const current = this.sections.find(s => s.id == this.state.current)
    return (
      <View style={styles.container}>
        <SectionDivider title={current.title} modal={true} />
        <ScrollView>
          {current.component}

          <View style={styles.fieldsContainer}>
            {this.sections
              .filter(s => s.id !== this.state.current)
              .map(section => (
                <Button
                  key={section.id}
                  onPress={() => this.show(section.id)}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.outlineButton}
                  type='outline'
                  title={section.title}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}
