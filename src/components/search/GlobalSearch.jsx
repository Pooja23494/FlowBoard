import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckSquare,
  FiClock,
  FiFolder,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

const RECENT_SEARCH_KEY = "flowboard-recent-searches";

const GlobalSearch = () => {
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks);
  const projects = useSelector((state) => state.projects.projects);
  const members = useSelector((state) => state.team.members);

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY) || "[]");
    } catch {
      return [];
    }
  });

  /* ---------------------------------
     Search Results
  ---------------------------------- */

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return {
        tasks: [],
        projects: [],
        members: [],
      };
    }

    const filteredTasks = tasks
      .filter((task) => {
        const text = `
          ${task.title}
          ${task.description}
          ${task.assignee}
          ${task.priority}
          ${task.status}
        `.toLowerCase();

        return text.includes(search);
      })
      .slice(0, 5);

    const filteredProjects = projects
      .filter((project) => {
        const text = `
          ${project.name}
          ${project.description}
          ${project.status}
        `.toLowerCase();

        return text.includes(search);
      })
      .slice(0, 5);

    const filteredMembers = members
      .filter((member) => {
        const text = `
          ${member.name}
          ${member.email}
          ${member.role}
          ${member.department}
        `.toLowerCase();

        return text.includes(search);
      })
      .slice(0, 5);

    return {
      tasks: filteredTasks,
      projects: filteredProjects,
      members: filteredMembers,
    };
  }, [query, tasks, projects, members]);

  const flatResults = useMemo(
    () => [
      ...results.tasks.map((item) => ({
        type: "task",
        id: item.id,
        title: item.title,
        subtitle: item.project || item.description,
        icon: FiCheckSquare,
        path: `/tasks/${item.id}`,
      })),

      ...results.projects.map((item) => ({
        type: "project",
        id: item.id,
        title: item.name,
        subtitle: item.description,
        icon: FiFolder,
        path: `/projects/${item.id}/board`,
      })),

      ...results.members.map((item) => ({
        type: "member",
        id: item.id,
        title: item.name,
        subtitle: `${item.role} • ${item.department}`,
        icon: FiUsers,
        path: "/team",
      })),
    ],
    [results],
  );

  /* ---------------------------------
     Save Recent Search
  ---------------------------------- */

  const saveRecentSearch = (value) => {
    const search = value.trim();

    if (!search) return;

    const updated = [
      search,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== search.toLowerCase(),
      ),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
  };

  /* ---------------------------------
     Navigate
  ---------------------------------- */

  const handleSelect = (result) => {
    saveRecentSearch(query);

    setQuery("");
    setIsOpen(false);
    setActiveIndex(0);

    navigate(result.path);
  };

  /* ---------------------------------
     Recent Search Click
  ---------------------------------- */

  const handleRecentSearch = (search) => {
    setQuery(search);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  /* ---------------------------------
     Keyboard Navigation
  ---------------------------------- */

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!flatResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) =>
        current < flatResults.length - 1 ? current + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) =>
        current > 0 ? current - 1 : flatResults.length - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selected = flatResults[activeIndex];

      if (selected) {
        handleSelect(selected);
      }
    }
  };

  /* ---------------------------------
     Ctrl + K / Cmd + K
  ---------------------------------- */

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  /* ---------------------------------
     Outside Click
  ---------------------------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ---------------------------------
     Reset active result
  ---------------------------------- */

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const hasResults = flatResults.length > 0;

  return (
    <div
      ref={searchRef}
      className="relative w-full min-w-0 max-w-full sm:max-w-xl"
    >
      {/* Search Input */}

      <div
        className="
          flex
          h-11
          items-center
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          shadow-sm
          transition
          focus-within:border-violet-400
          focus-within:ring-4
          focus-within:ring-violet-500/10
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <FiSearch
          className="
            mr-2
            shrink-0
            text-slate-400
          "
          size={18}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tasks, projects..."
          className="
            w-full
            min-w-0
            flex-1
            bg-transparent
            text-sm
            text-slate-900
            outline-none
            placeholder:text-slate-400
            dark:text-white
          "
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="
              rounded-lg
              p-1
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-600
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <FiX size={16} />
          </button>
        )}

        {!query && (
          <kbd
            className="
              hidden shrink-0 items-center gap-1
              rounded-md border border-slate-200
            bg-slate-50 px-2 py-1
              text-[10px] font-medium text-slate-400
              sm:inline-flex
            dark:border-slate-700 dark:bg-slate-800
            "
          >
            <span>Ctrl</span>
            <span>K</span>
          </kbd>
        )}
      </div>

      {/* Search Dropdown */}

      {isOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-14
            z-50
            max-h-[min(70vh,32rem)]
            overflow-y-auto
            overscroll-contain
            rounded-xl
            border
          border-slate-200
        bg-white
            shadow-2xl
            sm:rounded-2xl
          dark:border-slate-800
          dark:bg-slate-900
          "
        >
          {/* Recent Searches */}

          {!query && recentSearches.length > 0 && (
            <div className="p-3">
              <div className="mb-2 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <FiClock size={14} className="text-slate-400" />

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-400
                    "
                  >
                    Recent Searches
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem(RECENT_SEARCH_KEY);
                  }}
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-slate-400
                    hover:text-red-500
                  "
                >
                  <FiTrash2 size={12} />
                  Clear
                </button>
              </div>

              <div className="space-y-1">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => handleRecentSearch(search)}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                    "
                  >
                    <FiClock size={15} className="text-slate-400" />

                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search */}

          {!query && recentSearches.length === 0 && (
            <div className="p-8 text-center">
              <div
                className="
                  mx-auto
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-50
                  text-violet-500
                  dark:bg-violet-500/10
                "
              >
                <FiSearch size={20} />
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Search FlowBoard
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Find tasks, projects, and team members
              </p>
            </div>
          )}

          {/* Results */}

          {query && hasResults && (
            <div className="p-1.5 sm:p-2">
              {results.tasks.length > 0 && (
                <ResultSection
                  title="Tasks"
                  icon={FiCheckSquare}
                  results={results.tasks.map((task) => ({
                    type: "task",
                    id: task.id,
                    title: task.title,
                    subtitle: task.description || "Task",
                    path: `/tasks/${task.id}`,
                  }))}
                  flatResults={flatResults}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              )}

              {results.projects.length > 0 && (
                <ResultSection
                  title="Projects"
                  icon={FiFolder}
                  results={results.projects.map((project) => ({
                    type: "project",
                    id: project.id,
                    title: project.name,
                    subtitle: project.description || "Project",
                    path: `/projects/${project.id}/board`,
                  }))}
                  flatResults={flatResults}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              )}

              {results.members.length > 0 && (
                <ResultSection
                  title="Team"
                  icon={FiUsers}
                  results={results.members.map((member) => ({
                    type: "member",
                    id: member.id,
                    title: member.name,
                    subtitle: `${member.role} • ${member.department}`,
                    path: "/team",
                  }))}
                  flatResults={flatResults}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              )}

              <div
                className="
                  mt-2 flex flex-wrap items-center
                  justify-center gap-x-2 gap-y-1
                  border-t border-slate-100
                  px-2 pt-3 pb-2
                  text-[10px] text-slate-400
                  sm:text-xs
                dark:border-slate-800
                "
              >
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>Enter Select</span>
                <span>•</span>
                <span>Esc Close</span>
              </div>
            </div>
          )}

          {/* No Results */}

          {query && !hasResults && (
            <div className="p-8 text-center">
              <div
                className="
                  mx-auto
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-400
                  dark:bg-slate-800
                "
              >
                <FiSearch size={20} />
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                No results found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try searching for a different task, project, or team member.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------
   Result Section
---------------------------------- */

const ResultSection = ({
  title,
  icon: SectionIcon,
  results,
  flatResults,
  activeIndex,
  onSelect,
}) => {
  const getResultIcon = (type) => {
    switch (type) {
      case "task":
        return FiCheckSquare;

      case "project":
        return FiFolder;

      case "member":
        return FiUsers;

      default:
        return FiSearch;
    }
  };

  return (
    <div className="mb-2">
      {/* Section Header */}

      <div
        className="
          flex
          items-center
          gap-2
          px-3
          py-2
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        <SectionIcon size={14} />
        {title}
      </div>

      {/* Results */}

      {results.map((result) => {
        const resultIndex = flatResults.findIndex(
          (item) => item.type === result.type && item.id === result.id,
        );

        const isActive = resultIndex === activeIndex;

        const ResultIcon = getResultIcon(result.type);

        return (
          <button
            key={`${result.type}-${result.id}`}
            type="button"
            onClick={() => onSelect(result)}
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-left
              transition
              ${
                isActive
                  ? "bg-violet-50 dark:bg-violet-500/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
              }
            `}
          >
            {/* Icon */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              <ResultIcon size={17} />
            </div>

            {/* Content */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                  text-slate-800
                  dark:text-slate-100
                "
              >
                {result.title}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  text-slate-400
                "
              >
                {result.subtitle}
              </p>
            </div>

            {/* Arrow */}

            <FiArrowRight
              size={15}
              className="
                shrink-0
                text-slate-300
                dark:text-slate-600
              "
            />
          </button>
        );
      })}
    </div>
  );
};

export default GlobalSearch;
