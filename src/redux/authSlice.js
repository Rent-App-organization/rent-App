
import { createSlice } from '@reduxjs/toolkit';
import { auth, googleProvider, database } from '../fireBaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import toast from 'react-hot-toast';

export const fetchUserData = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) throw new Error('User not found');

      dispatch(setUser({ uid: user.uid, ...snapshot.val() }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload; 
      }
    }
  }
});

export const { setUser, setLoading, setError, logout, updateUserRole } = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { email, password, fullName, phone, profileImage } = formData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await set(ref(database, `users/${user.uid}`), {
      fullName,
      email,
      phone,
      profileImage: profileImage || '',
      role: "user"
    });

    toast.success('Account created successfully!');
    dispatch(setUser({ uid: user.uid, fullName, email, phone, profileImage: profileImage || '', role: "user" }));
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { email, password } = formData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(fetchUserData());
    toast.success('Welcome back!');
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Login Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserData = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userRef = ref(database, `users/${auth.currentUser.uid}`);
    await update(userRef, formData);
    dispatch(setUser({ uid: auth.currentUser.uid, ...formData }));
    toast.success("Profile updated successfully!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Error updating profile: " + error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const googleSignIn = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = ref(database, `users/${user.uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      await set(userRef, {
        fullName: user.displayName,
        email: user.email,
        profileImage: user.photoURL || '',
        role: "user"
      });
    }

    dispatch(fetchUserData());
    toast.success(`Welcome, ${user.displayName}!`);
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Google Sign-in Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
    toast.success("Logged out successfully!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Logout failed: " + error.message);
  }
};

export const becomeOwner = (ownerData) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const user = getState().auth.user;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userRef = ref(database, `users/${user.uid}`);

    await update(userRef, {
      role: "owner",
      ownerDetails: ownerData 
    });

    dispatch(updateUserRole("owner"));

    toast.success("You are now a Property Owner!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Failed to become an owner: " + error.message);
  } finally {
    dispatch(setLoading(false));
  }
};