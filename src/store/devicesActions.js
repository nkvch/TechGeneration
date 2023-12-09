export const createDevice =
  (data) =>
  (dispatch, gs, { getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("devices");
    ref
      .add({
        ...data,
      })
      .then(() => {
        dispatch({ type: "CREATEDEVICE_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "CREATEDEVICE_ERROR", err });
      });
  };

export const updateDevice =
  (data, id) =>
  (dispatch, gs, { getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("devices");
    ref
      .doc(id)
      .update({
        ...data,
      })
      .then(() => {
        dispatch({ type: "UPDATEDEVICE_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "UPDATEDEVICE_ERROR", err });
      });
  };

export const removeDevice =
  (id) =>
  (dispatch, gs, { getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("devices");
    ref
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "REMOVEDEVICE_SUCCESS", id });
      })
      .catch((err) => {
        dispatch({ type: "REMOVEDEVICE_SUCCESS", err });
      });
  };

export const removeData =
  (key) =>
  (dispatch, gs, { getFirebase }) => {
    const firebase = getFirebase();
    const ref = firebase.ref(key);
    ref
      .remove()
      .then(() => {
        dispatch({ type: "REMOVEDATA_SUCCESS", key });
      })
      .catch((err) => {
        dispatch({ type: "REMOVEDATA_SUCCESS", err });
      });
  };
