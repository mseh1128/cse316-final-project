import * as actionCreators from '../actions/actionCreators.js';
import { sortTasksHeader } from '../../utils/index';

export const createWireframeHandler = (cb, uid, newWireframeArr) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  const fireStore = getFirestore();
  console.log('USER ID IS ');
  console.log(uid);
  fireStore
    .collection('users')
    .doc(uid) // change to the current user id
    // .collection('wireframes')
    .update({
      wireframes: newWireframeArr
    })
    .then(function() {
      console.log('Document Added ');
    })
    .catch(err => {
      console.error('Error adding document: ', err);
      // dispatch(actionCreators.createTodoListError(err));
    });
};

// export const removeTodoListHandler = (todoList, cb) => (
//   dispatch,
//   getState,
//   { getFirestore }
// ) => {
//   const { id } = todoList;
//   const fireStore = getFirestore();
//   fireStore
//     .collection('todoLists')
//     .doc(id)
//     .delete()
//     .then(() => cb())
//     .catch(err => console.log(err));
// };

export const updateWireframeHandler = (wireframes, uid) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  const fireStore = getFirestore();

  console.log('UPDATING WIREFRAME');
  console.log(wireframes);
  console.log('uid IS');
  console.log(uid);

  fireStore
    .collection('users')
    .doc(uid)
    .update({
      wireframes
    })
    .then(() => {
      console.log('Successfully updated!');
    })
    .catch(err => {
      console.log('Update failed!');
      console.error(err);
    });
};

// export const updateTodoItemHandler = (newTodoList, cb, newItemID) => (
//   dispatch,
//   getState,
//   { getFirestore }
// ) => {
//   console.log(newItemID);
//   const fireStore = getFirestore();
//   const docID = newTodoList.id;
//   fireStore
//     .collection('todoLists')
//     .doc(docID)
//     .update(newTodoList)
//     .then(() => (cb ? (newItemID !== null ? cb(newItemID) : cb()) : null))
//     .catch(err => console.log(err));
// };

export const loginHandler = ({ credentials, firebase }) => (
  dispatch,
  getState
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      console.log('LOGIN_SUCCESS');
      dispatch({ type: 'LOGIN_SUCCESS' });
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const logoutHandler = firebase => (dispatch, getState) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log('In register handler!');
  const firestore = getFirestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp =>
      firestore
        .collection('users')
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: `${newUser.firstName[0]}${newUser.lastName[0]}`
        })
    )
    .then(() => {
      dispatch(actionCreators.registerSuccess);
    })
    .catch(err => {
      dispatch(actionCreators.registerError);
    });
};
