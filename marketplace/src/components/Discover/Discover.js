import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import CreatorCard from "../CreatorCard/CreatorCard";
import "../CreatorCard/CreatorCard.css"
import './Discover.css';

function Discover({ db }) {
  console.log("Discover component rendered"); // Check if the component is rendered
  console.log("db:", db); // Check if the db object is defined
  const [data, setData] = useState([]);

  useEffect(() => {
    if (db) {
      const myCollection = collection(db, "users");
      const q = query(myCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      });

      return () => unsubscribe();
    }
  }, [db]);
  console.log("Data:", data); // Check the data being passed to CreatorCard
  return (
    <div className="discover-container">
      {data.map((item) => (
  <CreatorCard key={item.id} creator={item} docId={item.id} />      ))}
    </div>
  );
}

export default Discover;
