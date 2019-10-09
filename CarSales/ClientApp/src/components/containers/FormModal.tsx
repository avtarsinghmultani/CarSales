import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


interface parentProps {
    isOpen?: boolean;
    toggle: () => void
}


class FormModal extends React.Component<parentProps> {

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}> Confirmation </ModalHeader>
                <ModalBody>
                    Car Added Successfully. Please click OK to go to Cars Page.
                        </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>OK</Button>
                </ModalFooter>
            </Modal>
            );
    }
}

export default connect()(FormModal);