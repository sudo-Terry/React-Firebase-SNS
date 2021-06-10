/* 액션 타입 선언 */
const TOGGLE_DISPLAYNAME = 'userobj/TOGGLE_DISPLAYNAME';
const TOGGLE_UID = 'userobj/TOGGLE_UID';
const TOGGLE_PHOTOURL = 'userobj/TOGGLE_PHOTOURL';

/* 액션 생성함수 */
export const setDisplayName = displayName => ({ type: TOGGLE_DISPLAYNAME, displayName });
export const setUid = uid => ({ type: TOGGLE_UID, uid });
export const setPhotoURL = photoURL => ({ type: TOGGLE_PHOTOURL, photoURL });

/* 초기 상태 선언 */
const initialState = {
  displayName: "undefined",
  uid: "undefined",
  photoURL: "undefined",
};

/* 리듀서 선언 */
export default function counter(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DISPLAYNAME:
      return {
        ...state,
        displayName: action.displayName
      };
    case TOGGLE_UID:
      return {
        ...state,
        uid: action.uid
      };
    case TOGGLE_PHOTOURL:
      return {
        ...state,
        photoURL: action.photoURL
      };
    default:
      return state;
  }
}