import { connect } from 'react-redux';
import { notificationRemove } from '../../../redux/action-creators';
import NotificationsDisplayHandler from './NotificationsDisplayHandler';

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  removeSnackbar: (id) => dispatch(notificationRemove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDisplayHandler);
