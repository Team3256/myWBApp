import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { RadioButtons } from 'react-native-radio-buttons';

import Modal from 'react-native-modal';

export default class ScoutingModal extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      teamNumber: '',
      eventKey: '2018casd',
      matchKey: '',
      isRed: false
    };
  }

  render() {
    const { isModalVisible, toggleModal } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.background}
        >
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.done()}>
              <Text style={styles.doneText}>START</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Team Number"
              onChangeText={text => this.setState({ teamNumber: text })}
              value={this.state.teamNumber}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Match Number"
              onChangeText={text =>
                this.setState({ matchKey: text.replace(' ', '') })
              }
              value={this.state.matchKey}
            />
            <RadioButtons
              options={['Red', 'Blue']}
              onSelection={selected =>
                this.setState({ isRed: selected == 'Red' })
              }
              selectedOption={this.state.isRed ? 'Red' : 'Blue'}
              renderOption={(option, selected, onSelect, index) =>
                this.renderCategory(option, selected, onSelect, index)
              }
              renderContainer={node => {
                return <View style={styles.pillContainer}>{node}</View>;
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  done() {
    this.props.goToScouting(
      this.state.teamNumber,
      this.state.eventKey,
      this.state.matchKey,
      this.state.isRed
    );
  }

  renderCategory(option, selected, onSelect, index) {
    return (
      <TouchableOpacity
        style={styles.pill}
        activeOpacity={0.75}
        onPress={onSelect}
        key={index}
      >
        <View style={styles.pillCircle}>
          {selected ? <View style={styles.pillSelected} /> : null}
        </View>
        <Text>{option}</Text>
      </TouchableOpacity>
    );
  }
}

ScoutingModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  goToScouting: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#DDDFEA',
    width: 310,
    height: 310
  },
  buttonsContainer: {
    width: '100%',
    height: '13%',
    padding: 10,
    paddingTop: 7,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cancelText: {
    fontSize: 18,
    color: '#383940'
  },
  doneText: {
    fontSize: 18,
    color: '#014F8F'
  },
  pillContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 10,
    width: '100%'
  },
  pill: {
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#DFE0E6',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 15,
    marginRight: 9,
    marginBottom: 10
  },
  pillCircle: {
    height: 20,
    width: 20,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DFE0E6',
    borderRadius: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pillSelected: {
    height: 13,
    width: 13,
    backgroundColor: '#014F8F',
    borderRadius: 50
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EFF0F2',
    height: 38,
    borderWidth: 1,
    borderColor: '#DFE0E6',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }
});
