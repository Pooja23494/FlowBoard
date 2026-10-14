import { useMemo, useState } from "react";
import {
  FiPlus,
  FiUsers,
  FiUserCheck,
  FiSearch,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import TeamCard from "../components/team/TeamCard";
import TeamFilters from "../components/team/TeamFilters";
import TeamForm from "../components/team/TeamForm";
import EmptyState from "../components/common/EmptyState";

import {
  addMember,
  deleteMember,
} from "../redux/slices/teamSlice";

const Team = () => {
  const dispatch = useDispatch();

  const members = useSelector(
    (state) => state.team.members ?? [],
  );

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filteredMembers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return members.filter((member) => {
      const name = (member.name ?? "").toLowerCase();
      const email = (member.email ?? "").toLowerCase();
      const memberRole = (member.role ?? "").toLowerCase();

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText);

      const matchesRole =
        role === "all" ||
        memberRole === role.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [members, search, role]);

  const handleAddMember = (memberData) => {
    dispatch(addMember(memberData));
    setShowForm(false);
  };

  const handleDeleteMember = (memberId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this team member?",
    );

    if (confirmed) {
      dispatch(deleteMember(memberId));
    }
  };

  const handleReset = () => {
    setSearch("");
    setRole("all");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Page Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
            <FiUsers size={14} />
            Team Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Team Members
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your team, organize roles, and keep everyone
            connected in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20 active:scale-[0.98] sm:w-auto"
        >
          <FiPlus size={18} />
          Add Member
        </button>
      </section>

      {/* Team Summary */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
            <FiUsers size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Members
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {members.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
            <FiUserCheck size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Matching Members
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {filteredMembers.length}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section>
        <TeamFilters
          search={search}
          role={role}
          onSearchChange={setSearch}
          onRoleChange={setRole}
          onReset={handleReset}
        />
      </section>

      {/* Results Header */}
      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              All Members
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredMembers.length}{" "}
              {filteredMembers.length === 1 ? "member" : "members"}
              {" "}shown
            </p>
          </div>

          {(search.trim() || role !== "all") && (
            <button
              type="button"
              onClick={handleReset}
              className="self-start text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onDelete={handleDeleteMember}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-10 dark:border-slate-700 dark:bg-slate-900/50 sm:py-14">
            <EmptyState
              icon={search.trim() || role !== "all" ? FiSearch : FiUsers}
              title={
                members.length === 0
                  ? "No team members yet"
                  : "No team members found"
              }
              description={
                members.length === 0
                  ? "Add your first team member to start building your team."
                  : "Try another search term or change your role filter."
              }
              actionLabel={
                members.length === 0
                  ? "Add Member"
                  : "Clear Filters"
              }
              onAction={
                members.length === 0
                  ? () => setShowForm(true)
                  : handleReset
              }
            />
          </div>
        )}
      </section>

      {/* Add Member Modal */}
      {showForm && (
        <TeamForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  );
};

export default Team;