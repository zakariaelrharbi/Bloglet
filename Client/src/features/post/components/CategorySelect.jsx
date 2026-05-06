import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getCategories } from "../api/categoryApi.js";

export function CategorySelect({ value, onChange, className = "" }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Transform API data to match component format
        const categoryOptions = data.map((cat) => ({
          value: cat.slug,
          label: cat.name,
        }));
        // Add default option
        setCategories([
          { value: "uncategorized", label: "Select category" },
          ...categoryOptions,
        ]);
      } catch (err) {
        setError("Error loading categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-left">
          <span className="block truncate">Loading categories...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative w-full px-4 py-2 rounded border border-red-300 dark:border-red-600 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 text-left">
          <span className="block truncate">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="relative w-full px-4 py-2 pr-10 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer appearance-none"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </span>
    </div>
  );
}
