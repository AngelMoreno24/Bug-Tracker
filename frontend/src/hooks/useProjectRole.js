import { useEffect, useState } from "react";
import { getProjectMembership } from "../api/ProjectMemberAPI";

export function useProjectRole(projectId, token) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId || !token) return;

    const fetchRole = async () => {
      setLoading(true);
      const membership = await getProjectMembership(projectId, token);
      if (membership) {
        setRole(membership.role);
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    fetchRole();
  }, [projectId, token]);

  return { role, loading };
}