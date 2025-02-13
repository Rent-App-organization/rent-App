// // redux/authSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { auth, googleProvider, database } from '../fireBaseConfig'
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup
// } from 'firebase/auth'
// import { ref, set, get } from 'firebase/database'
// import toast from 'react-hot-toast'

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const { email, password, fullName, phone, profileImage } = formData
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//       const user = userCredential.user

//       await set(ref(database, `users/${user.uid}`), {
//         fullName,
//         email,
//         phone,
//         profileImage: profileImage || '',
//         role: "user"
//       })

//       toast.success('Account created successfully!')
//       return {
//         uid: user.uid,
//         fullName,
//         email,
//         phone,
//         profileImage
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message}`)
//       return rejectWithValue(error.message)
//     }
//   }
// )

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const { email, password } = formData
//       const userCredential = await signInWithEmailAndPassword(auth, email, password)
//       const user = userCredential.user

//       const userRef = ref(database, `users/${user.uid}`)
//       const userSnapshot = await get(userRef)

//       if (userSnapshot.exists()) {
//         toast.success(`Welcome back, ${userSnapshot.val().fullName}!`)
//         return {
//           uid: user.uid,
//           ...userSnapshot.val()
//         }
//       } else {
//         toast.error('User not found!')
//         return rejectWithValue('User not found')
//       }
//     } catch (error) {
//       toast.error(`Login Error: ${error.message}`)
//       return rejectWithValue(error.message)
//     }
//   }
// )

// export const googleSignIn = createAsyncThunk(
//   'auth/googleSignIn',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider)
//       const user = result.user

//       const userRef = ref(database, `users/${user.uid}`)
//       const userSnapshot = await get(userRef)

//       if (!userSnapshot.exists()) {
//         await set(userRef, {
//           fullName: user.displayName,
//           email: user.email,
//           profileImage: user.photoURL || ''
//         })
//       }

//       toast.success(`Welcome, ${user.displayName}!`)
//       return {
//         uid: user.uid,
//         fullName: user.displayName,
//         email: user.email,
//         profileImage: user.photoURL
//       }
//     } catch (error) {
//       toast.error(`Google Sign-in Error: ${error.message}`)
//       return rejectWithValue(error.message)
//     }
//   }
// )

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,    
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // registerUser
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false
//         state.user = action.payload
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // loginUser
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false
//         state.user = action.payload
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // googleSignIn
//       .addCase(googleSignIn.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(googleSignIn.fulfilled, (state, action) => {
//         state.loading = false
//         state.user = action.payload
//       })
//       .addCase(googleSignIn.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//   }
// })

// export const { logout } = authSlice.actions
// export default authSlice.reducer


// redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { auth, googleProvider, database } from '../fireBaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import toast from 'react-hot-toast'

// Initial state for the auth slice
const initialState = {
  user: null,
  loading: false,
  error: null
}

// Create the slice with standard reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    }
  }
})

// Export synchronous actions
export const { setLoading, setError, setUser, logout } = authSlice.actions

// Export the reducer
export default authSlice.reducer

// Async action creator for registering a user
export const registerUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const { email, password, fullName, phone, profileImage } = formData

      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Save user data in the Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        fullName,
        email,
        phone,
        profileImage: profileImage || '',
        role: "user"
      })

      toast.success('Account created successfully!')
      dispatch(setUser({
        uid: user.uid,
        fullName,
        email,
        phone,
        profileImage: profileImage || ''
      }))
    } catch (error) {
      toast.error(`Error: ${error.message}`)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// Async action creator for logging in a user
export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const { email, password } = formData

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Retrieve user data from the database
      const userRef = ref(database, `users/${user.uid}`)
      const userSnapshot = await get(userRef)

      if (userSnapshot.exists()) {
        toast.success(`Welcome back, ${userSnapshot.val().fullName}!`)
        dispatch(setUser({
          uid: user.uid,
          ...userSnapshot.val()
        }))
      } else {
        toast.error('User not found!')
        dispatch(setError('User not found'))
      }
    } catch (error) {
      toast.error(`Login Error: ${error.message}`)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// Async action creator for Google Sign-In
export const googleSignIn = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Retrieve user data from the database; if not exists, create it
      const userRef = ref(database, `users/${user.uid}`)
      const userSnapshot = await get(userRef)

      if (!userSnapshot.exists()) {
        await set(userRef, {
          fullName: user.displayName,
          email: user.email,
          profileImage: user.photoURL || '',
          role: "user"
        })
      }

      toast.success(`Welcome, ${user.displayName}!`)
      dispatch(setUser({
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        profileImage: user.photoURL || ''
      }))
    } catch (error) {
      toast.error(`Google Sign-in Error: ${error.message}`)
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }
}
