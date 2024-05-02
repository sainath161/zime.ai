import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
import axios from "axios";
import "./TableComponent.css"; // Import the CSS file

const { Search } = Input;
const { Option } = Select;

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?skip=${
          (page - 1) * pageSize
        }&limit=${pageSize}`
      );
      if (Array.isArray(response.data.posts)) {
        setData(response.data.posts);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: response.data.total,
        }));
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const handleBodySearch = (value) => {
    setSearchText(value);
  };

  const handleTagSearch = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  const filteredData = data.filter((item) => {
    const bodyMatch = item.body
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.tags.includes(tag));
    return bodyMatch && tagMatch;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => tags.join(", "),
    },
  ];

  return (
    <div className="table-container">
      <h2 className="section-title">Search Posts</h2>
      <Search
        placeholder="Search by body"
        onSearch={handleBodySearch}
        className="search-input"
        size="large"
      />
      <h2 className="section-title">Filter by Tags</h2>
      <div class="select-dropdown">
        <Select
          mode="multiple"
          placeholder="Select tags"
          onChange={handleTagSearch}
          className="tag-filter-select"
          size="large"
        >
          <Option value="history">History</Option>
          <Option value="american">American</Option>
          <Option value="crime">Crime</Option>
          <Option value="french">French</Option>
          <Option value="fiction">Fiction</Option>
          <Option value="english">English</Option>
          <Option value="magical">Magical</Option>
          <Option value="mystery">Mystery</Option>
          <Option value="love">Love</Option>
          <Option value="classic">Classic</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        className="custom-table"
      />
    </div>
  );
};

export default TableComponent;
