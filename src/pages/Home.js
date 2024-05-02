import React, { useState, useEffect } from "react";
import TableComponent from "../components/TableComponent";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterPosts(searchText, selectedTags);
  }, [searchText, selectedTags]);

  const filterPosts = (query, tags) => {
    let filtered = [...posts];

    // Filter by search text
    if (query) {
      filtered = filtered.filter((post) =>
        post.body.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected tags
    if (tags.length > 0) {
      filtered = filtered.filter((post) =>
        tags.some((tag) => post.tags.includes(tag))
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Zime.ai</h1>
      <TableComponent
        data={filteredPosts} // Pass filtered posts to TableComponent
        loading={false} // Add loading state if necessary
        pagination={false} // Add pagination configuration if needed
        handleTableChange={() => {}} // Add handleTableChange function if needed
      />
    </div>
  );
};

export default Home;
