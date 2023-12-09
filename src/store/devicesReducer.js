const initial = {
  id: null,
};

const devicesReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEDEVICE_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEDEVICE_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEDEVICE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEDEVICE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEDEVICE_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEDEVICE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEDATA_SUCCESS':
      console.log(action.key);
      return state;
    case 'REMOVEDATA_ERROR':
      console.log(action.err);
      return state;
    case 'RESETDATA_SUCCESS':
      console.log(action.key);
      return state;
    case 'RESETDATA_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default devicesReducer;
