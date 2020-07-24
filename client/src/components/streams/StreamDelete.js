import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		return (
			<React.Fragment>
				<button
					onClick={() => this.props.deleteStream(this.props.match.params.id)}
					className='ui negative button'
				>
					Delete
				</button>
				<Link className='ui button' to='/'>
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return;
		}
		return (
			<div>
				<strong>{this.props.stream.title}</strong> will be deleted. Are your
				sure?
			</div>
		);
	}

	render() {
		return (
			<Modal
				title='Delete Stream'
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
