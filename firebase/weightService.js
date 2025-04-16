import { db } from './config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

// Add a new weight entry
export const addWeightEntry = async (userId, weightData) => {
  try {
    const entry = {
      weight: parseFloat(weightData.weight),
      date: weightData.date || serverTimestamp(),
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'users', userId, 'weightEntries'), entry);
    return { id: docRef.id, ...entry };
  } catch (error) {
    console.error("Error adding weight entry:", error);
    throw error;
  }
};

// Get all weight entries for a user
export const getWeightEntries = async (userId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'weightEntries'),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const entries = [];
    
    querySnapshot.forEach((doc) => {
      entries.push({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      });
    });
    
    return entries;
  } catch (error) {
    console.error("Error getting weight entries:", error);
    throw error;
  }
};

// Update a weight entry
export const updateWeightEntry = async (userId, entryId, weightData) => {
  try {
    const entryRef = doc(db, 'users', userId, 'weightEntries', entryId);
    await updateDoc(entryRef, {
      weight: parseFloat(weightData.weight),
      date: weightData.date || serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating weight entry:", error);
    throw error;
  }
};

// Delete a weight entry
export const deleteWeightEntry = async (userId, entryId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'weightEntries', entryId));
    return true;
  } catch (error) {
    console.error("Error deleting weight entry:", error);
    throw error;
  }
};

// Calculate streak (consecutive days with entries)
export const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0;
  
  // Sort entries by date in descending order (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Start with the most recent entry
  let streak = 1;
  let currentDate = new Date(sortedEntries[0].date);
  
  // Go through the rest of the entries
  for (let i = 1; i < sortedEntries.length; i++) {
    const entryDate = new Date(sortedEntries[i].date);
    
    // Check if this entry is from the previous day
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    
    if (
      entryDate.getDate() === prevDay.getDate() &&
      entryDate.getMonth() === prevDay.getMonth() &&
      entryDate.getFullYear() === prevDay.getFullYear()
    ) {
      streak++;
      currentDate = entryDate;
    } else {
      // Check if it's from the same day (duplicate entry for current day)
      const isSameDay = 
        entryDate.getDate() === currentDate.getDate() &&
        entryDate.getMonth() === currentDate.getMonth() &&
        entryDate.getFullYear() === currentDate.getFullYear();
        
      // If not the previous day and not the same day, the streak is broken
      if (!isSameDay) break;
    }
  }
  
  return streak;
}; 