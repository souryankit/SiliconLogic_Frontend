import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX-F3sh394sVrqIJc1g3S6y_EM7a7wFzE",
  authDomain: "silicon-6c6b2.firebaseapp.com",
  projectId: "silicon-6c6b2",
  storageBucket: "silicon-6c6b2.appspot.com",
  messagingSenderId: "217627745853",
  appId: "1:217627745853:web:fdadf98dc10a54e0e59454"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

const updateUserDatabase = async (user, uid) => {
  if (typeof user !== "object") return;

  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user, uid });
};

const getUserFromDatabase = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if (!result.exists()) return null;
  return result.data();
};

const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if (!file) {
    errorCallback("File not found");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if (!fileType.includes("image")) {
    errorCallback("File must an image");
    return;
  }
  if (fileSize > 2) {
    errorCallback("File must smaller than 2MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);

  const task = uploadBytesResumable(storageRef, file);

  task.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressCallback(progress);
    },
    (error) => {
      errorCallback(error.message);
    },
    () => {
      getDownloadURL(storageRef).then((url) => {
        urlCallback(url);
      });
    }
  );
};

const addProjectInDatabase = async (project) => {
  if (typeof project !== "object") return;

  const collectionRef = collection(db, "projects");
  await addDoc(collectionRef, { ...project });
};

const updateProjectInDatabase = async (project, pid) => {
  if (typeof project !== "object") return;

  const docRef = doc(db, "projects", pid);
  await setDoc(docRef, { ...project });
};

const getAllProjects = async () => {
  return await getDocs(collection(db, "projects"));
};

const getAllProjectsForUser = async (uid) => {
  if (!uid) return;

  const collectionRef = collection(db, "projects");
  const condition = where("refUser", "==", uid);
  const dbQuery = query(collectionRef, condition);

  return await getDocs(dbQuery);
};

const deleteProject = async (pid) => {
  const docRef = doc(db, "projects", pid);
  await deleteDoc(docRef);
};

// Test Results Database Functions
const addTestResultInDatabase = async (testResult) => {
  if (typeof testResult !== "object") return;

  const collectionRef = collection(db, "testResults");
  await addDoc(collectionRef, { ...testResult });
};

const getAllTestResultsForUser = async (uid) => {
  if (!uid) return;

  const collectionRef = collection(db, "testResults");
  const condition = where("userId", "==", uid);
  const dbQuery = query(collectionRef, condition);

  return await getDocs(dbQuery);
};

// Questions Database Functions
const addQuestionsInDatabase = async (questions, category, difficulty) => {
  if (!Array.isArray(questions)) return;

  const collectionRef = collection(db, "questions");
  const batch = [];
  
  questions.forEach(question => {
    const questionData = {
      ...question,
      category: category,
      difficulty: difficulty,
      createdAt: new Date()
    };
    batch.push(addDoc(collectionRef, questionData));
  });

  return Promise.all(batch);
};

const getQuestionsByCategory = async (category, difficulty) => {
  const collectionRef = collection(db, "questions");
  const conditions = [
    where("category", "==", category),
    where("difficulty", "==", difficulty)
  ];
  const dbQuery = query(collectionRef, ...conditions);

  return await getDocs(dbQuery);
};

export {
  app as default,
  auth,
  db,
  updateUserDatabase,
  getUserFromDatabase,
  uploadImage,
  addProjectInDatabase,
  updateProjectInDatabase,
  getAllProjects,
  getAllProjectsForUser,
  deleteProject,
  addTestResultInDatabase,
  getAllTestResultsForUser,
  addQuestionsInDatabase,
  getQuestionsByCategory,
};
