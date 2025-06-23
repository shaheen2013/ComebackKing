import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Profile, ProfileState} from '../../types/profileType';

const initialState: ProfileState = {
  profile: null,
};

const ProfileStateSlice = createSlice({
  name: 'profileState',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
  },
});

export const {setProfile} = ProfileStateSlice.actions;
export default ProfileStateSlice.reducer;
